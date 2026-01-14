<script lang="ts" module>
  import type { AutoCompleteProps, AutoCompleteOption, AutoCompleteOptionGroup } from './types';

  export type { AutoCompleteProps, AutoCompleteOption, AutoCompleteOptionGroup };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import VirtualList from '../virtual-list/VirtualList.svelte';
  import type { AutoCompleteProps as Props, AutoCompleteOption as Option, AutoCompleteOptions } from './types';

  let {
    value = $bindable(''),
    options = [],
    placeholder = '',
    disabled = false,
    size = 'middle',
    status,
    allowClear = false,
    open = $bindable(false),
    emptyOpen = true,
    filterOption = true,
    caseSensitive = false,
    defaultActiveFirstOption = true,
    prefixCls: customPrefixCls,
    class: className = '',
    style = '',
    classNames = {},
    styles = {},
    popupMatchSelectWidth = true,
    onchange,
    onselect,
    onsearch,
    onopenchange,
    onfocus,
    onblur,
    onclear,
    optionRender,
    notFoundContent = 'No matches found',
    suffix,
    prefix,
    autofocus = false,
    listHeight = 256,
    virtual = true,
    tabindex = 0,
    ...restProps
  }: Props = $props();

  // Compute virtual scrolling settings
  const useVirtual = $derived(virtual !== false);
  const itemHeight = $derived(typeof virtual === 'number' ? virtual : 32);

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('select'));

  // Internal state
  let activeIndex = $state(-1);
  let inputRef: HTMLInputElement | undefined = $state();
  let popupRef: HTMLDivElement | undefined = $state();
  let virtualListRef: { scrollToIndex: (index: number, align?: 'start' | 'center' | 'end') => void } | undefined = $state();
  let isFocused = $state(false);

  // Normalize options to standard format
  const normalizedOptions = $derived.by(() => {
    const result: { option: Option; group?: string }[] = [];
    
    for (const item of options) {
      if (typeof item === 'string') {
        result.push({ option: { value: item, label: item } });
      } else if ('options' in item) {
        // It's a group
        const group = item as AutoCompleteOptionGroup;
        for (const opt of group.options) {
          result.push({ option: opt, group: group.label });
        }
      } else {
        // It's a regular option
        const opt = item as Option;
        result.push({ option: { ...opt, label: opt.label ?? opt.value } });
      }
    }
    
    return result;
  });

  // Filter options based on input
  const filteredOptions = $derived.by(() => {
    if (!filterOption) {
      return normalizedOptions;
    }

    const inputValue = value ?? '';
    
    if (!inputValue) {
      return normalizedOptions;
    }

    return normalizedOptions.filter(({ option }) => {
      if (typeof filterOption === 'function') {
        return filterOption(inputValue, option);
      }
      // Default filter: case-sensitive or case-insensitive includes
      const optionText = option.label ?? option.value;
      if (caseSensitive) {
        return optionText.includes(inputValue);
      }
      return optionText.toLowerCase().includes(inputValue.toLowerCase());
    });
  });

  // Group filtered options by group label
  const groupedOptions = $derived.by(() => {
    const groups: Map<string | undefined, { option: Option; index: number }[]> = new Map();
    
    filteredOptions.forEach((item, index) => {
      const groupKey = item.group;
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push({ option: item.option, index });
    });
    
    return groups;
  });

  // Flat list items for virtual scrolling (includes group headers)
  type VirtualItem = 
    | { type: 'group'; label: string }
    | { type: 'option'; option: Option; index: number; grouped: boolean };
  
  const virtualItems = $derived.by((): VirtualItem[] => {
    const items: VirtualItem[] = [];
    
    for (const [groupLabel, groupItems] of groupedOptions) {
      if (groupLabel) {
        items.push({ type: 'group', label: groupLabel });
      }
      for (const { option, index } of groupItems) {
        items.push({ type: 'option', option, index, grouped: !!groupLabel });
      }
    }
    
    return items;
  });

  // Handle input change
  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.value;
    onchange?.(value);
    onsearch?.(value);
    
    // Open dropdown if there's a value, or emptyOpen is true
    if (value || emptyOpen) {
      if (!open) {
        open = true;
        onopenchange?.(true);
      }
      // Reset active index - will be set to first option by effect if defaultActiveFirstOption is true
      activeIndex = defaultActiveFirstOption ? 0 : -1;
    } else {
      // Close dropdown when empty and emptyOpen is false
      open = false;
      onopenchange?.(false);
      activeIndex = -1;
    }
  }

  // Handle option select
  function handleSelect(option: Option) {
    if (option.disabled) return;
    
    value = option.value;
    onchange?.(option.value);
    onselect?.(option.value, option);
    open = false;
    onopenchange?.(false);
    activeIndex = -1;
    inputRef?.focus();
  }

  // Handle keyboard navigation
  function handleKeyDown(e: KeyboardEvent) {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) {
          open = true;
          onopenchange?.(true);
        } else {
          // Move to next non-disabled option
          let nextIndex = activeIndex + 1;
          while (nextIndex < filteredOptions.length && filteredOptions[nextIndex].option.disabled) {
            nextIndex++;
          }
          if (nextIndex < filteredOptions.length) {
            activeIndex = nextIndex;
            scrollToActive();
          }
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (open) {
          // Move to previous non-disabled option
          let prevIndex = activeIndex - 1;
          while (prevIndex >= 0 && filteredOptions[prevIndex].option.disabled) {
            prevIndex--;
          }
          if (prevIndex >= 0) {
            activeIndex = prevIndex;
            scrollToActive();
          }
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        if (open && activeIndex >= 0 && activeIndex < filteredOptions.length) {
          handleSelect(filteredOptions[activeIndex].option);
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        open = false;
        onopenchange?.(false);
        activeIndex = -1;
        break;
        
      case 'Tab':
        if (open && activeIndex >= 0 && activeIndex < filteredOptions.length) {
          handleSelect(filteredOptions[activeIndex].option);
        }
        open = false;
        onopenchange?.(false);
        break;
    }
  }

  // Scroll active option into view
  function scrollToActive() {
    if (useVirtual && virtualListRef) {
      // For virtual list, find the virtual item index for this option
      const virtualIndex = virtualItems.findIndex(
        item => item.type === 'option' && item.index === activeIndex
      );
      if (virtualIndex !== -1) {
        virtualListRef.scrollToIndex(virtualIndex, 'center');
      }
    } else {
      requestAnimationFrame(() => {
        const activeElement = popupRef?.querySelector(`[data-index="${activeIndex}"]`);
        activeElement?.scrollIntoView({ block: 'nearest' });
      });
    }
  }

  // Handle focus
  function handleFocus(e: FocusEvent) {
    if (!disabled) {
      isFocused = true;
      // Only open if there's a value, or emptyOpen is true
      if (value || emptyOpen) {
        open = true;
        onopenchange?.(true);
      }
    }
    onfocus?.(e);
  }

  // Handle blur
  function handleBlur(e: FocusEvent) {
    isFocused = false;
    // Delay to allow click on option
    setTimeout(() => {
      if (!isFocused) {
        open = false;
        onopenchange?.(false);
        activeIndex = -1;
      }
    }, 200);
    onblur?.(e);
  }

  // Handle clear
  function handleClear(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    value = '';
    onchange?.('');
    onclear?.();
    // Close dropdown if emptyOpen is false
    if (!emptyOpen) {
      open = false;
      onopenchange?.(false);
    }
    inputRef?.focus();
  }

  // Handle popup mouse down (prevent blur)
  function handlePopupMouseDown(e: MouseEvent) {
    e.preventDefault();
  }

  // Compute classes
  const rootClasses = $derived.by(() => {
    const cls = [`${prefixCls}-auto-complete`, prefixCls];
    
    if (open) cls.push(`${prefixCls}-open`);
    if (disabled) cls.push(`${prefixCls}-disabled`);
    if (size === 'small') cls.push(`${prefixCls}-sm`);
    if (size === 'large') cls.push(`${prefixCls}-lg`);
    if (status === 'error') cls.push(`${prefixCls}-status-error`);
    if (status === 'warning') cls.push(`${prefixCls}-status-warning`);
    if (value) cls.push(`${prefixCls}-has-value`);
    if (allowClear && value) cls.push(`${prefixCls}-allow-clear`);
    if (popupMatchSelectWidth === false) cls.push(`${prefixCls}-popup-auto-width`);
    
    if (className) cls.push(className);
    if (classNames.root) cls.push(classNames.root);
    
    return cls.join(' ');
  });

  // Popup width style
  const popupWidthStyle = $derived.by(() => {
    if (typeof popupMatchSelectWidth === 'number') {
      return `width: ${popupMatchSelectWidth}px; min-width: ${popupMatchSelectWidth}px`;
    }
    if (popupMatchSelectWidth === false) {
      // min-width matches input, but dropdown can grow wider
      return 'min-width: 100%';
    }
    // true = exact match with input width
    return 'width: 100%';
  });

  // Auto focus
  $effect(() => {
    if (autofocus && inputRef) {
      inputRef.focus();
    }
  });

  // Track previous open state to detect when dropdown opens
  let prevOpen = $state(false);
  
  // Set first option active when dropdown opens
  $effect(() => {
    if (open && !prevOpen && defaultActiveFirstOption && filteredOptions.length > 0) {
      // Find first non-disabled option
      const firstEnabledIndex = filteredOptions.findIndex(({ option }) => !option.disabled);
      if (firstEnabledIndex !== -1) {
        activeIndex = firstEnabledIndex;
      }
    }
    prevOpen = open;
  });
</script>

<div
  class={rootClasses}
  style={[style, styles.root].filter(Boolean).join('; ') || undefined}
>
  <!-- Selector -->
  <div class="{prefixCls}-selector">
    {#if prefix}
      <span class="{prefixCls}-prefix {classNames.suffix ?? ''}">
        {#if typeof prefix === 'string'}
          {prefix}
        {:else}
          {@render prefix()}
        {/if}
      </span>
    {/if}
    
    <span class="{prefixCls}-selection-search">
      <input
        bind:this={inputRef}
        type="text"
        class="{prefixCls}-selection-search-input {classNames.input ?? ''}"
        style={styles.input}
        {value}
        {disabled}
        tabindex={disabled ? -1 : tabindex}
        autocomplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-haspopup="listbox"
        oninput={handleInput}
        onkeydown={handleKeyDown}
        onfocus={handleFocus}
        onblur={handleBlur}
        {...restProps}
      />
    </span>
    
    {#if !value && placeholder}
      <span class="{prefixCls}-selection-placeholder">{placeholder}</span>
    {/if}
  </div>

  <!-- Clear button -->
  {#if allowClear && value && !disabled}
    <span 
      class="{prefixCls}-clear {classNames.clear ?? ''}"
      onclick={handleClear}
      onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClear(e as unknown as MouseEvent); }}
      onmousedown={handlePopupMouseDown}
      role="button"
      tabindex={-1}
      aria-label="Clear"
    >
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
      </svg>
    </span>
  {/if}

  <!-- Suffix -->
  {#if suffix}
    <span class="{prefixCls}-suffix {classNames.suffix ?? ''}">
      {#if typeof suffix === 'string'}
        {suffix}
      {:else}
        {@render suffix()}
      {/if}
    </span>
  {/if}

  <!-- Dropdown -->
  {#if open}
    <div
      bind:this={popupRef}
      class="{prefixCls}-dropdown {classNames.popup ?? ''}"
      style={[popupWidthStyle, useVirtual ? '' : `max-height: ${listHeight}px`, styles.popup].filter(Boolean).join('; ')}
      onmousedown={handlePopupMouseDown}
      role="listbox"
      tabindex="-1"
    >
      {#if filteredOptions.length === 0}
        <div class="{prefixCls}-item-empty">
          {#if typeof notFoundContent === 'string'}
            {notFoundContent}
          {:else}
            {@render notFoundContent()}
          {/if}
        </div>
      {:else if useVirtual}
        <!-- Virtual scrolling mode -->
        <VirtualList
          bind:this={virtualListRef}
          items={virtualItems}
          {itemHeight}
          height={Math.min(listHeight, virtualItems.length * itemHeight)}
          class="{prefixCls}-virtual-list"
        >
          {#snippet renderItem({ item: vItem, index: vIndex })}
            {#if vItem.type === 'group'}
              <div class="{prefixCls}-item-group {classNames.groupLabel ?? ''}" style={styles.groupLabel}>
                {vItem.label}
              </div>
            {:else}
              {@const option = vItem.option}
              {@const index = vItem.index}
              {@const isActive = index === activeIndex}
              {@const isSelected = option.value === value}
              <div
                class="{prefixCls}-item {prefixCls}-item-option {classNames.option ?? ''}
                  {vItem.grouped ? `${prefixCls}-item-option-grouped` : ''}
                  {isActive ? `${prefixCls}-item-option-active ${classNames.optionActive ?? ''}` : ''}
                  {isSelected ? `${prefixCls}-item-option-selected ${classNames.optionSelected ?? ''}` : ''}
                  {option.disabled ? `${prefixCls}-item-option-disabled ${classNames.optionDisabled ?? ''}` : ''}"
                style={styles.option}
                data-index={index}
                role="option"
                tabindex="-1"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                onclick={() => handleSelect(option)}
                onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(option); }}
                onmouseenter={() => { if (!option.disabled) activeIndex = index; }}
              >
                {#if optionRender}
                  {@render optionRender({ option, isActive, isSelected })}
                {:else}
                  <div class="{prefixCls}-item-option-content">
                    {option.label ?? option.value}
                  </div>
                {/if}
              </div>
            {/if}
          {/snippet}
        </VirtualList>
      {:else}
        <!-- Regular rendering mode -->
        {#each [...groupedOptions] as [groupLabel, items]}
          {#if groupLabel}
            <div class="{prefixCls}-item-group {classNames.groupLabel ?? ''}" style={styles.groupLabel}>
              {groupLabel}
            </div>
          {/if}
          {#each items as { option, index }}
            {@const isActive = index === activeIndex}
            {@const isSelected = option.value === value}
            <div
              class="{prefixCls}-item {prefixCls}-item-option {classNames.option ?? ''}
                {groupLabel ? `${prefixCls}-item-option-grouped` : ''}
                {isActive ? `${prefixCls}-item-option-active ${classNames.optionActive ?? ''}` : ''}
                {isSelected ? `${prefixCls}-item-option-selected ${classNames.optionSelected ?? ''}` : ''}
                {option.disabled ? `${prefixCls}-item-option-disabled ${classNames.optionDisabled ?? ''}` : ''}"
              style={styles.option}
              data-index={index}
              role="option"
              tabindex="-1"
              aria-selected={isSelected}
              aria-disabled={option.disabled}
              onclick={() => handleSelect(option)}
              onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(option); }}
              onmouseenter={() => { if (!option.disabled) activeIndex = index; }}
            >
              {#if optionRender}
                {@render optionRender({ option, isActive, isSelected })}
              {:else}
                <div class="{prefixCls}-item-option-content">
                  {option.label ?? option.value}
                </div>
              {/if}
            </div>
          {/each}
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style>
  :global(.ant-select-auto-complete) {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
  }

  :global(.ant-select-auto-complete .ant-select-selector) {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--ant-color-bg-container, #fff);
    border: 1px solid var(--ant-color-border, #d9d9d9);
    border-radius: var(--ant-border-radius, 6px);
    transition: all 0.2s;
    min-height: 32px;
    padding: 0 11px;
    cursor: text;
  }

  :global(.ant-select-auto-complete:not(.ant-select-disabled):hover .ant-select-selector) {
    border-color: var(--ant-color-primary-hover, #4096ff);
  }

  :global(.ant-select-auto-complete.ant-select-open .ant-select-selector),
  :global(.ant-select-auto-complete .ant-select-selector:focus-within) {
    border-color: var(--ant-color-primary, #1677ff);
    box-shadow: 0 0 0 2px var(--ant-color-primary-bg, rgba(22, 119, 255, 0.1));
  }

  :global(.ant-select-auto-complete.ant-select-disabled .ant-select-selector) {
    background-color: var(--ant-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
  }

  :global(.ant-select-auto-complete.ant-select-status-error .ant-select-selector) {
    border-color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-select-auto-complete.ant-select-status-error:not(.ant-select-disabled):hover .ant-select-selector) {
    border-color: var(--ant-color-error-hover, #ff7875);
  }

  :global(.ant-select-auto-complete.ant-select-status-error.ant-select-open .ant-select-selector),
  :global(.ant-select-auto-complete.ant-select-status-error .ant-select-selector:focus-within) {
    border-color: var(--ant-color-error, #ff4d4f);
    box-shadow: 0 0 0 2px var(--ant-color-error-bg, rgba(255, 77, 79, 0.1));
  }

  :global(.ant-select-auto-complete.ant-select-status-warning .ant-select-selector) {
    border-color: var(--ant-color-warning, #faad14);
  }

  :global(.ant-select-auto-complete.ant-select-status-warning:not(.ant-select-disabled):hover .ant-select-selector) {
    border-color: var(--ant-color-warning-hover, #ffc53d);
  }

  :global(.ant-select-auto-complete.ant-select-status-warning.ant-select-open .ant-select-selector),
  :global(.ant-select-auto-complete.ant-select-status-warning .ant-select-selector:focus-within) {
    border-color: var(--ant-color-warning, #faad14);
    box-shadow: 0 0 0 2px var(--ant-color-warning-bg, rgba(250, 173, 20, 0.1));
  }

  /* Sizes */
  :global(.ant-select-auto-complete.ant-select-sm .ant-select-selector) {
    min-height: 24px;
    padding: 0 7px;
    font-size: 12px;
  }

  :global(.ant-select-auto-complete.ant-select-lg .ant-select-selector) {
    min-height: 40px;
    padding: 0 11px;
    font-size: 16px;
  }

  /* Selection search */
  :global(.ant-select-auto-complete .ant-select-selection-search) {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
  }

  :global(.ant-select-auto-complete .ant-select-selection-search-input) {
    width: 100%;
    margin: 0;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    appearance: none;
    font-family: inherit;
    font-size: inherit;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    cursor: inherit;
  }

  :global(.ant-select-auto-complete .ant-select-selection-search-input::placeholder) {
    color: var(--ant-color-text-placeholder, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-select-auto-complete.ant-select-disabled .ant-select-selection-search-input) {
    cursor: not-allowed;
  }

  /* Placeholder */
  :global(.ant-select-auto-complete .ant-select-selection-placeholder) {
    position: absolute;
    left: 11px;
    right: 11px;
    color: var(--ant-color-text-placeholder, rgba(0, 0, 0, 0.25));
    pointer-events: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  :global(.ant-select-auto-complete.ant-select-sm .ant-select-selection-placeholder) {
    left: 7px;
    right: 7px;
  }

  /* Prefix & Suffix */
  :global(.ant-select-auto-complete .ant-select-prefix),
  :global(.ant-select-auto-complete .ant-select-suffix) {
    display: flex;
    align-items: center;
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
  }

  :global(.ant-select-auto-complete .ant-select-prefix) {
    margin-right: 4px;
  }

  :global(.ant-select-auto-complete .ant-select-suffix) {
    margin-left: 4px;
  }

  /* Clear button */
  :global(.ant-select-auto-complete .ant-select-clear) {
    position: absolute;
    right: 11px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: var(--ant-color-text-quaternary, rgba(0, 0, 0, 0.25));
    font-size: 12px;
    background: var(--ant-color-bg-container, #fff);
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: color 0.2s, opacity 0.2s;
    z-index: 1;
  }

  :global(.ant-select-auto-complete:hover .ant-select-clear),
  :global(.ant-select-auto-complete.ant-select-open .ant-select-clear) {
    opacity: 1;
  }

  :global(.ant-select-auto-complete .ant-select-clear:hover) {
    color: var(--ant-color-text-tertiary, rgba(0, 0, 0, 0.45));
  }

  /* Dropdown */
  :global(.ant-select-auto-complete .ant-select-dropdown) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1050;
    margin-top: 4px;
    padding: 4px;
    background-color: var(--ant-color-bg-elevated, #fff);
    border-radius: var(--ant-border-radius-lg, 8px);
    box-shadow: var(--ant-box-shadow-secondary, 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05));
    overflow: auto;
  }

  /* Auto width mode - dropdown can be wider than input */
  :global(.ant-select-auto-complete.ant-select-popup-auto-width .ant-select-dropdown) {
    right: auto;
    white-space: nowrap;
  }

  /* Options */
  :global(.ant-select-auto-complete .ant-select-item) {
    position: relative;
    display: block;
    min-height: 32px;
    padding: 5px 12px;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    cursor: pointer;
    border-radius: var(--ant-border-radius-sm, 4px);
    transition: background 0.2s;
  }

  :global(.ant-select-auto-complete .ant-select-item-option-active) {
    background-color: var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06));
  }

  :global(.ant-select-auto-complete .ant-select-item-option-selected) {
    font-weight: 600;
    background-color: var(--ant-color-primary-bg, rgba(22, 119, 255, 0.1));
  }

  :global(.ant-select-auto-complete .ant-select-item-option-disabled) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
  }

  :global(.ant-select-auto-complete .ant-select-item-option-disabled:hover) {
    background-color: transparent;
  }

  :global(.ant-select-auto-complete .ant-select-item-option-content) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* Group */
  :global(.ant-select-auto-complete .ant-select-item-group) {
    min-height: 24px;
    padding: 4px 12px;
    font-size: 12px;
    line-height: 16px;
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
    font-weight: 600;
    cursor: default;
  }

  :global(.ant-select-auto-complete .ant-select-item-group + .ant-select-item-option),
  :global(.ant-select-auto-complete .ant-select-item-option.ant-select-item-option-grouped) {
    padding-left: 24px;
  }

  /* Empty */
  :global(.ant-select-auto-complete .ant-select-item-empty) {
    padding: 8px 12px;
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    text-align: center;
  }

  /* Virtual list styles */
  :global(.ant-select-auto-complete .ant-select-virtual-list) {
    margin: 0;
    padding: 0;
  }

  :global(.ant-select-auto-complete .ant-select-virtual-list .ant-virtual-list-item) {
    padding: 0;
  }
</style>
