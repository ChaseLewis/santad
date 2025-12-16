<script lang="ts" module>
  import type { TextAreaProps, TextAreaClassNames, TextAreaStyles, TextAreaAutoSize } from './types';

  export type { TextAreaProps, TextAreaClassNames, TextAreaStyles, TextAreaAutoSize };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { TextAreaProps as Props } from './types';

  let {
    value: valueProp,
    defaultValue = '',
    size,
    disabled = false,
    status,
    variant = 'outlined',
    allowClear = false,
    autoSize = false,
    maxLength,
    showCount = false,
    prefixCls: customPrefixCls,
    class: className = '',
    classNames = {},
    styles = {},
    placeholder,
    readonly,
    rows = 4,
    onchange,
    onpressenter,
    onclear,
    oninput,
    onkeydown,
    onfocus,
    onblur,
    onresize,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('input'));

  // Merge size from props or config
  const mergedSize = $derived(size ?? config.size);

  // Internal value state (for uncontrolled mode)
  let internalValue = $state(defaultValue);

  // Actual value
  const currentValue = $derived(valueProp !== undefined ? valueProp : internalValue);

  // Focus state
  let isFocused = $state(false);

  // Computed rows for auto-size
  let computedHeight = $state<string | undefined>(undefined);

  // Reference to textarea element
  let textareaRef: HTMLTextAreaElement | undefined = $state();

  // Character count
  const charCount = $derived(currentValue?.length ?? 0);

  // Show count config
  const countConfig = $derived.by(() => {
    if (showCount === false) return null;
    if (showCount === true) return { formatter: null };
    return showCount;
  });

  // Format count display
  const countDisplay = $derived.by(() => {
    if (!countConfig) return '';
    const info = { value: currentValue ?? '', count: charCount, maxLength };
    if (countConfig.formatter) {
      return countConfig.formatter(info);
    }
    return maxLength !== undefined ? `${charCount} / ${maxLength}` : `${charCount}`;
  });

  // Whether to show clear button
  const showClearIcon = $derived(
    allowClear && currentValue && currentValue.length > 0 && !disabled && !readonly
  );

  // Auto-size configuration
  const autoSizeConfig = $derived.by(() => {
    if (autoSize === false) return null;
    if (autoSize === true) return { minRows: undefined, maxRows: undefined };
    return autoSize;
  });

  // Calculate height based on auto-size
  function calculateHeight() {
    if (!autoSizeConfig || !textareaRef) return;

    // Reset height to auto to get scrollHeight
    textareaRef.style.height = 'auto';
    
    const lineHeight = parseInt(getComputedStyle(textareaRef).lineHeight) || 22;
    const paddingTop = parseInt(getComputedStyle(textareaRef).paddingTop) || 4;
    const paddingBottom = parseInt(getComputedStyle(textareaRef).paddingBottom) || 4;
    const borderTop = parseInt(getComputedStyle(textareaRef).borderTopWidth) || 1;
    const borderBottom = parseInt(getComputedStyle(textareaRef).borderBottomWidth) || 1;
    
    const minHeight = autoSizeConfig.minRows 
      ? lineHeight * autoSizeConfig.minRows + paddingTop + paddingBottom + borderTop + borderBottom 
      : undefined;
    const maxHeight = autoSizeConfig.maxRows 
      ? lineHeight * autoSizeConfig.maxRows + paddingTop + paddingBottom + borderTop + borderBottom 
      : undefined;
    
    let newHeight = textareaRef.scrollHeight + borderTop + borderBottom;
    
    if (minHeight && newHeight < minHeight) {
      newHeight = minHeight;
    }
    if (maxHeight && newHeight > maxHeight) {
      newHeight = maxHeight;
    }
    
    computedHeight = `${newHeight}px`;
    textareaRef.style.height = computedHeight;

    // Report resize
    if (onresize) {
      onresize({ width: textareaRef.offsetWidth, height: newHeight });
    }
  }

  // Handle input change
  function handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    const newValue = target.value;

    // Update internal state if uncontrolled
    if (valueProp === undefined) {
      internalValue = newValue;
    }

    oninput?.(e as InputEvent);
    onchange?.(newValue, e);

    // Recalculate height for auto-size
    if (autoSizeConfig) {
      calculateHeight();
    }
  }

  // Handle keydown
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      onpressenter?.(e);
    }
    onkeydown?.(e);
  }

  // Handle clear
  function handleClear(e: MouseEvent) {
    e.stopPropagation();
    
    // Update internal state if uncontrolled
    if (valueProp === undefined) {
      internalValue = '';
    }

    onclear?.();
    onchange?.('', e);

    // Recalculate height for auto-size
    if (autoSizeConfig) {
      setTimeout(calculateHeight, 0);
    }
  }

  // Handle focus
  function handleFocus(e: FocusEvent) {
    isFocused = true;
    onfocus?.(e);
  }

  // Handle blur
  function handleBlur(e: FocusEvent) {
    isFocused = false;
    onblur?.(e);
  }

  // Initialize auto-size on mount
  $effect(() => {
    if (autoSizeConfig && textareaRef) {
      calculateHeight();
    }
  });

  // Whether to show wrapper (for clear icon or count)
  // Use allowClear (not showClearIcon) to keep DOM structure stable and prevent focus loss
  const hasWrapper = $derived(allowClear || !!countConfig);

  // Compute wrapper class names
  const wrapperClasses = $derived.by(() => {
    if (!hasWrapper) return null;

    const cls = [`${prefixCls}-textarea-affix-wrapper`];

    if (mergedSize === 'large') cls.push(`${prefixCls}-affix-wrapper-lg`);
    if (mergedSize === 'small') cls.push(`${prefixCls}-affix-wrapper-sm`);
    if (status) cls.push(`${prefixCls}-affix-wrapper-status-${status}`);
    if (disabled) cls.push(`${prefixCls}-affix-wrapper-disabled`);
    if (isFocused) cls.push(`${prefixCls}-affix-wrapper-focused`);
    if (variant) cls.push(`${prefixCls}-affix-wrapper-${variant}`);
    if (showCount || countConfig) cls.push(`${prefixCls}-textarea-show-count`);
    if (config.direction === 'rtl') cls.push(`${prefixCls}-affix-wrapper-rtl`);
    if (classNames.root) cls.push(classNames.root);
    if (className) cls.push(className);

    return cls.join(' ');
  });

  // Compute textarea class names
  const textareaClasses = $derived.by(() => {
    const cls = [prefixCls, `${prefixCls}-textarea`];

    if (mergedSize === 'large') cls.push(`${prefixCls}-lg`);
    if (mergedSize === 'small') cls.push(`${prefixCls}-sm`);
    if (disabled) cls.push(`${prefixCls}-disabled`);
    if (status) cls.push(`${prefixCls}-status-${status}`);
    if (variant) cls.push(`${prefixCls}-${variant}`);
    if (autoSizeConfig) cls.push(`${prefixCls}-textarea-autosize`);
    if (config.direction === 'rtl') cls.push(`${prefixCls}-rtl`);

    // Add root classes only if no wrapper
    if (!hasWrapper) {
      if (classNames.root) cls.push(classNames.root);
      if (className) cls.push(className);
    }

    if (classNames.textarea) cls.push(classNames.textarea);

    return cls.join(' ');
  });

  // Root style
  const rootStyle = $derived(styles.root ?? '');
</script>

{#if hasWrapper}
  <span class={wrapperClasses} style={rootStyle}>
    <textarea
      bind:this={textareaRef}
      class={textareaClasses}
      style="{styles.textarea ?? ''}{computedHeight ? `; height: ${computedHeight}` : ''}"
      value={currentValue}
      {disabled}
      {placeholder}
      {readonly}
      {maxLength}
      rows={autoSizeConfig ? undefined : rows}
      oninput={handleInput}
      onkeydown={handleKeyDown}
      onfocus={handleFocus}
      onblur={handleBlur}
      {...restProps}
    ></textarea>
    
    {#if showClearIcon || countConfig}
      <span class="{prefixCls}-textarea-suffix">
        {#if showClearIcon}
          <button
            type="button"
            class="{prefixCls}-clear-icon {classNames.clearIcon ?? ''}"
            style={styles.clearIcon}
            onclick={handleClear}
            tabindex="-1"
          >
            <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
            </svg>
          </button>
        {/if}
        {#if countConfig}
          <span class="{prefixCls}-textarea-data-count {classNames.count ?? ''}" style={styles.count}>
            {countDisplay}
          </span>
        {/if}
      </span>
    {/if}
  </span>
{:else}
  <textarea
    bind:this={textareaRef}
    class={textareaClasses}
    style="{rootStyle || styles.textarea}{computedHeight ? `; height: ${computedHeight}` : ''}"
    value={currentValue}
    {disabled}
    {placeholder}
    {readonly}
    {maxLength}
    rows={autoSizeConfig ? undefined : rows}
    oninput={handleInput}
    onkeydown={handleKeyDown}
    onfocus={handleFocus}
    onblur={handleBlur}
    {...restProps}
  ></textarea>
{/if}

<style>
  /* ==================== Textarea ==================== */
  :global(.ant-input-textarea) {
    resize: vertical;
    min-height: 32px;
  }

  :global(.ant-input.ant-input-textarea) {
    height: auto;
    line-height: 1.5714285714285714;
  }

  /* Hide resize handle when autoSize is enabled */
  :global(.ant-input-textarea-autosize) {
    resize: none;
  }

  :global(.ant-input-textarea-lg) {
    padding: 7px 11px;
    font-size: 16px;
  }

  :global(.ant-input-textarea-sm) {
    padding: 0px 7px;
  }

  /* ==================== Textarea Affix Wrapper ==================== */
  :global(.ant-input-textarea-affix-wrapper) {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    padding: 4px 11px;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    font-size: 14px;
    line-height: 1.5714285714285714;
    background-color: var(--ant-color-bg-container, #ffffff);
    border-width: 1px;
    border-style: solid;
    border-color: var(--ant-color-border, #d9d9d9);
    border-radius: 6px;
    transition: all 0.2s;
  }

  :global(.ant-input-textarea-affix-wrapper):hover {
    border-color: var(--ant-color-primary-hover, #4096ff);
  }

  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-focused),
  :global(.ant-input-textarea-affix-wrapper):focus-within {
    border-color: var(--ant-color-primary, #1677ff);
    box-shadow: 0 0 0 2px var(--ant-color-primary-bg, rgba(5, 145, 255, 0.1));
    outline: 0;
  }

  :global(.ant-input-textarea-affix-wrapper) > :global(.ant-input-textarea) {
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    resize: none;
  }

  :global(.ant-input-textarea-affix-wrapper) > :global(.ant-input-textarea):focus {
    box-shadow: none;
  }

  /* Textarea affix wrapper variants */
  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-filled) {
    background-color: var(--ant-color-fill-tertiary, rgba(0, 0, 0, 0.04));
    border-color: transparent;
  }

  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-filled):hover {
    background-color: var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06));
  }

  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-filled.ant-input-affix-wrapper-focused),
  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-filled):focus-within {
    background-color: var(--ant-color-bg-container, #ffffff);
    border-color: var(--ant-color-primary, #1677ff);
  }

  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-borderless) {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  /* Textarea suffix */
  :global(.ant-input-textarea-suffix) {
    position: absolute;
    top: 8px;
    inset-inline-end: 11px;
    z-index: 1;
    display: inline-flex;
    align-items: flex-start;
    gap: 4px;
    pointer-events: none;
  }

  :global(.ant-input-textarea-suffix) > * {
    pointer-events: auto;
  }

  /* Show count */
  :global(.ant-input-textarea-show-count) {
    position: relative;
  }

  :global(.ant-input-textarea-data-count) {
    position: absolute;
    bottom: 4px;
    inset-inline-end: 11px;
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
    white-space: nowrap;
    pointer-events: none;
    font-size: 14px;
  }

  :global(.ant-input-textarea-affix-wrapper .ant-input-textarea-data-count) {
    position: relative;
    bottom: auto;
    inset-inline-end: auto;
    align-self: flex-end;
    margin-top: 4px;
  }

  /* Status styles for textarea affix wrapper */
  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-status-error) {
    border-color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-status-error):hover {
    border-color: var(--ant-color-error-hover, #ff7875);
  }

  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-status-error.ant-input-affix-wrapper-focused),
  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-status-error):focus-within {
    border-color: var(--ant-color-error, #ff4d4f);
    box-shadow: 0 0 0 2px var(--ant-color-error-outline, rgba(255, 38, 5, 0.06));
  }

  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-status-warning) {
    border-color: var(--ant-color-warning, #faad14);
  }

  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-status-warning):hover {
    border-color: var(--ant-color-warning-hover, #ffc53d);
  }

  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-status-warning.ant-input-affix-wrapper-focused),
  :global(.ant-input-textarea-affix-wrapper.ant-input-affix-wrapper-status-warning):focus-within {
    border-color: var(--ant-color-warning, #faad14);
    box-shadow: 0 0 0 2px var(--ant-color-warning-outline, rgba(255, 215, 5, 0.1));
  }
</style>

