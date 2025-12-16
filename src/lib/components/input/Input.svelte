<script lang="ts" module>
  import type { InputProps, InputClassNames, InputStyles, InputStatus, InputVariant } from './types';

  export type { InputProps, InputClassNames, InputStyles, InputStatus, InputVariant };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { InputProps as Props } from './types';

  let {
    value = $bindable(''),
    defaultValue = '',
    size,
    disabled = false,
    status,
    variant = 'outlined',
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    allowClear = false,
    maxLength,
    showCount = false,
    prefixCls: customPrefixCls,
    class: className = '',
    classNames = {},
    styles = {},
    placeholder,
    readonly,
    type = 'text',
    onchange,
    onpressenter,
    onclear,
    oninput,
    onkeydown,
    onfocus,
    onblur,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('input'));

  // Merge size from props or config
  const mergedSize = $derived(size ?? config.size);

  // Current value - use value prop directly with $bindable for two-way binding
  const currentValue = $derived(value ?? defaultValue ?? '');

  // Focus state
  let isFocused = $state(false);

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

  // Whether input has prefix/suffix (affects wrapper)
  // Use allowClear (not showClearIcon) to keep DOM structure stable and prevent focus loss
  const hasAffix = $derived(!!prefix || !!suffix || allowClear || !!countConfig);

  // Whether input has addon
  const hasAddon = $derived(!!addonBefore || !!addonAfter);

  // Handle input change
  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const newValue = target.value;

    // Update value via $bindable
    value = newValue;

    oninput?.(e as InputEvent);
    onchange?.(newValue, e);
  }

  // Handle keydown
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      onpressenter?.(e);
    }
    onkeydown?.(e);
  }

  // Handle clear
  function handleClear(e: MouseEvent) {
    e.stopPropagation();
    
    // Update value via $bindable
    value = '';

    onclear?.();
    onchange?.('', e);
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

  // Compute wrapper class names
  const wrapperClasses = $derived.by(() => {
    if (!hasAffix && !hasAddon) return null;

    const cls: string[] = [];

    if (hasAddon) {
      cls.push(`${prefixCls}-group-wrapper`);
      if (mergedSize === 'large') cls.push(`${prefixCls}-group-wrapper-lg`);
      if (mergedSize === 'small') cls.push(`${prefixCls}-group-wrapper-sm`);
      if (status) cls.push(`${prefixCls}-group-wrapper-status-${status}`);
      if (disabled) cls.push(`${prefixCls}-group-wrapper-disabled`);
    }

    if (classNames.root) cls.push(classNames.root);
    if (className) cls.push(className);

    return cls.join(' ');
  });

  // Compute affix wrapper class names
  const affixWrapperClasses = $derived.by(() => {
    if (!hasAffix) return null;

    const cls = [`${prefixCls}-affix-wrapper`];

    if (mergedSize === 'large') cls.push(`${prefixCls}-affix-wrapper-lg`);
    if (mergedSize === 'small') cls.push(`${prefixCls}-affix-wrapper-sm`);
    if (status) cls.push(`${prefixCls}-affix-wrapper-status-${status}`);
    if (disabled) cls.push(`${prefixCls}-affix-wrapper-disabled`);
    if (isFocused) cls.push(`${prefixCls}-affix-wrapper-focused`);
    if (variant) cls.push(`${prefixCls}-affix-wrapper-${variant}`);
    if (config.direction === 'rtl') cls.push(`${prefixCls}-affix-wrapper-rtl`);

    // Don't add root classes to affix wrapper when there's also addon
    if (!hasAddon) {
      if (classNames.root) cls.push(classNames.root);
      if (className) cls.push(className);
    }

    return cls.join(' ');
  });

  // Compute input class names
  const inputClasses = $derived.by(() => {
    const cls = [prefixCls];

    if (mergedSize === 'large') cls.push(`${prefixCls}-lg`);
    if (mergedSize === 'small') cls.push(`${prefixCls}-sm`);
    if (disabled) cls.push(`${prefixCls}-disabled`);
    if (status) cls.push(`${prefixCls}-status-${status}`);
    if (variant) cls.push(`${prefixCls}-${variant}`);
    if (config.direction === 'rtl') cls.push(`${prefixCls}-rtl`);

    // Add root classes only if no wrapper
    if (!hasAffix && !hasAddon) {
      if (classNames.root) cls.push(classNames.root);
      if (className) cls.push(className);
    }

    if (classNames.input) cls.push(classNames.input);

    return cls.join(' ');
  });

  // Root style (for wrapper or input depending on structure)
  const rootStyle = $derived(styles.root ?? '');
</script>

{#if hasAddon}
  <!-- With addon wrapper -->
  <span class={wrapperClasses} style={rootStyle}>
    <span class="{prefixCls}-group">
      {#if addonBefore}
        <span class="{prefixCls}-group-addon">
          {@render addonBefore()}
        </span>
      {/if}

      {#if hasAffix}
        <span class={affixWrapperClasses} style={styles.root}>
          {#if prefix}
            <span class="{prefixCls}-prefix {classNames.prefix ?? ''}" style={styles.prefix}>
              {@render prefix()}
            </span>
          {/if}

          <input
            {type}
            class={inputClasses}
            style={styles.input}
            value={currentValue}
            {disabled}
            {placeholder}
            {readonly}
            {maxLength}
            oninput={handleInput}
            onkeydown={handleKeyDown}
            onfocus={handleFocus}
            onblur={handleBlur}
            {...restProps}
          />

          {#if suffix || showClearIcon || countConfig}
            <span class="{prefixCls}-suffix {classNames.suffix ?? ''}" style={styles.suffix}>
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
                <span class="{prefixCls}-show-count-suffix {classNames.count ?? ''}" style={styles.count}>
                  {countDisplay}
                </span>
              {/if}
              {#if suffix}
                {@render suffix()}
              {/if}
            </span>
          {/if}
        </span>
      {:else}
        <input
          {type}
          class={inputClasses}
          style={styles.input ?? ''}
          value={currentValue}
          {disabled}
          {placeholder}
          {readonly}
          {maxLength}
          oninput={handleInput}
          onkeydown={handleKeyDown}
          onfocus={handleFocus}
          onblur={handleBlur}
          {...restProps}
        />
      {/if}

      {#if addonAfter}
        <span class="{prefixCls}-group-addon">
          {@render addonAfter()}
        </span>
      {/if}
    </span>
  </span>
{:else if hasAffix}
  <!-- With affix wrapper only -->
  <span class={affixWrapperClasses} style={rootStyle}>
    {#if prefix}
      <span class="{prefixCls}-prefix {classNames.prefix ?? ''}" style={styles.prefix}>
        {@render prefix()}
      </span>
    {/if}

    <input
      {type}
      class={inputClasses}
      style={styles.input}
      value={currentValue}
      {disabled}
      {placeholder}
      {readonly}
      {maxLength}
      oninput={handleInput}
      onkeydown={handleKeyDown}
      onfocus={handleFocus}
      onblur={handleBlur}
      {...restProps}
    />

    {#if suffix || showClearIcon || countConfig}
      <span class="{prefixCls}-suffix {classNames.suffix ?? ''}" style={styles.suffix}>
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
          <span class="{prefixCls}-show-count-suffix {classNames.count ?? ''}" style={styles.count}>
            {countDisplay}
          </span>
        {/if}
        {#if suffix}
          {@render suffix()}
        {/if}
      </span>
    {/if}
  </span>
{:else}
  <!-- Simple input without wrapper -->
  <input
    {type}
    class={inputClasses}
    style={rootStyle || styles.input}
    value={currentValue}
    {disabled}
    {placeholder}
    {readonly}
    {maxLength}
    oninput={handleInput}
    onkeydown={handleKeyDown}
    onfocus={handleFocus}
    onblur={handleBlur}
    {...restProps}
  />
{/if}

<style>
  /* ==================== Base Input ==================== */
  :global(.ant-input) {
    box-sizing: border-box;
    margin: 0;
    padding: 4px 11px;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: 'tnum';
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    font-size: 14px;
    line-height: 1.5714285714285714;
    background-color: var(--ant-color-bg-container, #ffffff);
    background-image: none;
    border-width: 1px;
    border-style: solid;
    border-color: var(--ant-color-border, #d9d9d9);
    border-radius: 6px;
    transition: all 0.2s;
  }

  :global(.ant-input)::placeholder {
    color: var(--ant-color-text-placeholder, rgba(0, 0, 0, 0.25));
    user-select: none;
  }

  :global(.ant-input):placeholder-shown {
    text-overflow: ellipsis;
  }

  :global(.ant-input):hover {
    border-color: var(--ant-color-primary-hover, #4096ff);
  }

  :global(.ant-input):focus,
  :global(.ant-input-focused) {
    border-color: var(--ant-color-primary, #1677ff);
    box-shadow: 0 0 0 2px var(--ant-color-primary-bg, rgba(5, 145, 255, 0.1));
    outline: 0;
  }

  :global(.ant-input-disabled),
  :global(.ant-input[disabled]) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    background-color: var(--ant-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
    border-color: var(--ant-color-border, #d9d9d9);
    box-shadow: none;
    cursor: not-allowed;
    opacity: 1;
  }

  :global(.ant-input-disabled)::placeholder,
  :global(.ant-input[disabled])::placeholder {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-input[readonly]) {
    cursor: default;
  }

  /* ==================== Sizes ==================== */
  :global(.ant-input-lg) {
    padding: 7px 11px;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 8px;
  }

  :global(.ant-input-sm) {
    padding: 0px 7px;
    font-size: 14px;
    border-radius: 4px;
  }

  /* ==================== Status ==================== */
  :global(.ant-input-status-error) {
    border-color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-input-status-error):hover {
    border-color: var(--ant-color-error-hover, #ff7875);
  }

  :global(.ant-input-status-error):focus,
  :global(.ant-input-status-error.ant-input-focused) {
    border-color: var(--ant-color-error, #ff4d4f);
    box-shadow: 0 0 0 2px var(--ant-color-error-outline, rgba(255, 38, 5, 0.06));
  }

  :global(.ant-input-status-warning) {
    border-color: var(--ant-color-warning, #faad14);
  }

  :global(.ant-input-status-warning):hover {
    border-color: var(--ant-color-warning-hover, #ffc53d);
  }

  :global(.ant-input-status-warning):focus,
  :global(.ant-input-status-warning.ant-input-focused) {
    border-color: var(--ant-color-warning, #faad14);
    box-shadow: 0 0 0 2px var(--ant-color-warning-outline, rgba(255, 215, 5, 0.1));
  }

  /* ==================== Variants ==================== */
  /* Outlined (default) - styles already defined above */

  /* Filled */
  :global(.ant-input-filled) {
    background-color: var(--ant-color-fill-tertiary, rgba(0, 0, 0, 0.04));
    border-color: transparent;
  }

  :global(.ant-input-filled):hover {
    background-color: var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06));
    border-color: transparent;
  }

  :global(.ant-input-filled):focus,
  :global(.ant-input-filled.ant-input-focused) {
    background-color: var(--ant-color-bg-container, #ffffff);
    border-color: var(--ant-color-primary, #1677ff);
  }

  /* Borderless */
  :global(.ant-input-borderless) {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  :global(.ant-input-borderless):hover,
  :global(.ant-input-borderless):focus,
  :global(.ant-input-borderless.ant-input-focused) {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  /* ==================== Affix Wrapper ==================== */
  :global(.ant-input-affix-wrapper) {
    position: relative;
    display: inline-flex;
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

  :global(.ant-input-affix-wrapper):hover {
    border-color: var(--ant-color-primary-hover, #4096ff);
  }

  :global(.ant-input-affix-wrapper-focused),
  :global(.ant-input-affix-wrapper):focus-within {
    border-color: var(--ant-color-primary, #1677ff);
    box-shadow: 0 0 0 2px var(--ant-color-primary-bg, rgba(5, 145, 255, 0.1));
    outline: 0;
  }

  :global(.ant-input-affix-wrapper-disabled) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    background-color: var(--ant-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
    border-color: var(--ant-color-border, #d9d9d9);
    box-shadow: none;
    cursor: not-allowed;
  }

  :global(.ant-input-affix-wrapper) > :global(.ant-input) {
    padding: 0;
    font-size: inherit;
    border: none;
    border-radius: 0;
    outline: none;
    background: transparent;
  }

  :global(.ant-input-affix-wrapper) > :global(.ant-input):focus {
    box-shadow: none;
  }

  /* Affix wrapper sizes */
  :global(.ant-input-affix-wrapper-lg) {
    padding: 7px 11px;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 8px;
  }

  :global(.ant-input-affix-wrapper-sm) {
    padding: 0px 7px;
    border-radius: 4px;
  }

  /* Affix wrapper status */
  :global(.ant-input-affix-wrapper-status-error) {
    border-color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-input-affix-wrapper-status-error):hover {
    border-color: var(--ant-color-error-hover, #ff7875);
  }

  :global(.ant-input-affix-wrapper-status-error.ant-input-affix-wrapper-focused),
  :global(.ant-input-affix-wrapper-status-error):focus-within {
    border-color: var(--ant-color-error, #ff4d4f);
    box-shadow: 0 0 0 2px var(--ant-color-error-outline, rgba(255, 38, 5, 0.06));
  }

  :global(.ant-input-affix-wrapper-status-warning) {
    border-color: var(--ant-color-warning, #faad14);
  }

  :global(.ant-input-affix-wrapper-status-warning):hover {
    border-color: var(--ant-color-warning-hover, #ffc53d);
  }

  :global(.ant-input-affix-wrapper-status-warning.ant-input-affix-wrapper-focused),
  :global(.ant-input-affix-wrapper-status-warning):focus-within {
    border-color: var(--ant-color-warning, #faad14);
    box-shadow: 0 0 0 2px var(--ant-color-warning-outline, rgba(255, 215, 5, 0.1));
  }

  /* Affix wrapper variants */
  :global(.ant-input-affix-wrapper-filled) {
    background-color: var(--ant-color-fill-tertiary, rgba(0, 0, 0, 0.04));
    border-color: transparent;
  }

  :global(.ant-input-affix-wrapper-filled):hover {
    background-color: var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06));
    border-color: transparent;
  }

  :global(.ant-input-affix-wrapper-filled.ant-input-affix-wrapper-focused),
  :global(.ant-input-affix-wrapper-filled):focus-within {
    background-color: var(--ant-color-bg-container, #ffffff);
    border-color: var(--ant-color-primary, #1677ff);
  }

  :global(.ant-input-affix-wrapper-borderless) {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  :global(.ant-input-affix-wrapper-borderless):hover,
  :global(.ant-input-affix-wrapper-borderless.ant-input-affix-wrapper-focused),
  :global(.ant-input-affix-wrapper-borderless):focus-within {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  /* ==================== Prefix & Suffix ==================== */
  :global(.ant-input-prefix),
  :global(.ant-input-suffix) {
    display: flex;
    flex: none;
    align-items: center;
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
  }

  :global(.ant-input-prefix) {
    margin-inline-end: 4px;
  }

  /* Prefix color based on status */
  :global(.ant-input-affix-wrapper-status-error .ant-input-prefix) {
    color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-input-affix-wrapper-status-warning .ant-input-prefix) {
    color: var(--ant-color-warning, #faad14);
  }

  :global(.ant-input-suffix) {
    margin-inline-start: 4px;
  }

  :global(.ant-input-show-count-suffix) {
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
    white-space: nowrap;
    pointer-events: none;
  }

  /* ==================== Clear Icon ==================== */
  :global(.ant-input-clear-icon) {
    margin: 0;
    padding: 0;
    color: var(--ant-color-text-quaternary, rgba(0, 0, 0, 0.25));
    font-size: 12px;
    vertical-align: -1px;
    cursor: pointer;
    transition: color 0.2s;
    border: none;
    outline: none;
    background: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  :global(.ant-input-clear-icon):hover {
    color: var(--ant-color-text-tertiary, rgba(0, 0, 0, 0.45));
  }

  :global(.ant-input-clear-icon):active {
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  /* ==================== Group ==================== */
  :global(.ant-input-group-wrapper) {
    display: inline-block;
    width: 100%;
    text-align: start;
    vertical-align: top;
  }

  :global(.ant-input-group) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-feature-settings: 'tnum';
    position: relative;
    display: table;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  :global(.ant-input-group-addon) {
    position: relative;
    padding: 0 11px;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    background-color: var(--ant-color-fill-quaternary, rgba(0, 0, 0, 0.02));
    border: 1px solid var(--ant-color-border, #d9d9d9);
    border-radius: 6px;
    transition: all 0.2s;
    line-height: 1;
    display: table-cell;
    width: 1px;
    white-space: nowrap;
    vertical-align: middle;
  }

  :global(.ant-input-group-addon:first-child) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    border-inline-end: 0;
  }

  :global(.ant-input-group-addon:last-child) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
    border-inline-start: 0;
  }

  /* When there's something before the input (addon before) - square left/start corners */
  :global(.ant-input-group) > :global(.ant-input):not(:first-child),
  :global(.ant-input-group) > :global(.ant-input-affix-wrapper):not(:first-child) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* When there's something after the input (addon after) - square right/end corners */
  :global(.ant-input-group) > :global(.ant-input):not(:last-child),
  :global(.ant-input-group) > :global(.ant-input-affix-wrapper):not(:last-child) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :global(.ant-input-group) > :global(.ant-input) {
    display: table-cell;
    width: 100%;
  }

  /* Input inside group should display as table-cell for proper addon alignment */
  :global(.ant-input-group) > :global(.ant-input-affix-wrapper) {
    display: table-cell;
    width: 100%;
  }

  /* Group wrapper sizes */
  :global(.ant-input-group-wrapper-lg .ant-input-group-addon) {
    border-radius: 8px;
    font-size: 16px;
  }

  :global(.ant-input-group-wrapper-sm .ant-input-group-addon) {
    border-radius: 4px;
  }

  /* Group wrapper status */
  :global(.ant-input-group-wrapper-status-error .ant-input-group-addon) {
    color: var(--ant-color-error, #ff4d4f);
    border-color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-input-group-wrapper-status-warning .ant-input-group-addon) {
    color: var(--ant-color-warning, #faad14);
    border-color: var(--ant-color-warning, #faad14);
  }

  /* ==================== RTL ==================== */
  :global(.ant-input-rtl) {
    direction: rtl;
  }

  :global(.ant-input-affix-wrapper-rtl) {
    direction: rtl;
  }

  :global(.ant-input-affix-wrapper-rtl .ant-input-prefix) {
    margin-inline-end: 0;
    margin-inline-start: 4px;
  }

  :global(.ant-input-affix-wrapper-rtl .ant-input-suffix) {
    margin-inline-start: 0;
    margin-inline-end: 4px;
  }
</style>

