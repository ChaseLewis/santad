<script lang="ts" module>
  import type { SearchProps, SearchClassNames, SearchStyles } from './types';

  export type { SearchProps, SearchClassNames, SearchStyles };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { SearchProps as Props } from './types';
  import Input from './Input.svelte';
  import Button from '../button/Button.svelte';

  let {
    value: valueProp,
    defaultValue = '',
    enterButton = false,
    loading = false,
    size,
    disabled = false,
    status,
    variant = 'outlined',
    prefix,
    suffix,
    allowClear = false,
    prefixCls: customPrefixCls,
    class: className = '',
    classNames = {},
    styles = {},
    onsearch,
    onchange,
    onpressenter,
    onclear,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('input'));
  const searchPrefixCls = $derived(`${prefixCls}-search`);

  // Merge size from props or config
  const mergedSize = $derived(size ?? config.size);

  // Internal value state (for uncontrolled mode)
  let internalValue = $state(defaultValue);

  // Actual value
  const currentValue = $derived(valueProp !== undefined ? valueProp : internalValue);

  // Handle change
  function handleChange(newValue: string, event: Event) {
    if (valueProp === undefined) {
      internalValue = newValue;
    }
    onchange?.(newValue, event);

    // If clearing, trigger onSearch with source: 'clear'
    if (newValue === '' && (event.target as HTMLInputElement)?.type === 'click') {
      onsearch?.(newValue, event, { source: 'clear' });
    }
  }

  // Handle search
  function handleSearch(e?: Event) {
    if (loading) return;
    onsearch?.(currentValue, e, { source: 'input' });
  }

  // Handle enter press
  function handlePressEnter(e: KeyboardEvent) {
    onpressenter?.(e);
    handleSearch(e);
  }

  // Handle clear
  function handleClear() {
    onclear?.();
  }

  // Search class - always has button now
  const searchClasses = $derived.by(() => {
    const cls = [searchPrefixCls, `${searchPrefixCls}-with-button`];
    if (mergedSize === 'large') cls.push(`${searchPrefixCls}-large`);
    if (mergedSize === 'small') cls.push(`${searchPrefixCls}-small`);
    if (config.direction === 'rtl') cls.push(`${searchPrefixCls}-rtl`);
    if (classNames.root) cls.push(classNames.root);
    if (className) cls.push(className);
    return cls.join(' ');
  });

  // Determine button variant based on enterButton and input variant
  const buttonVariant = $derived.by(() => {
    if (variant === 'borderless' || variant === 'filled') {
      return 'text';
    }
    // When enterButton is true/truthy, use solid; otherwise use default (outlined)
    return enterButton ? 'solid' : 'outlined';
  });

  // Determine button color
  const buttonColor = $derived(enterButton ? 'primary' : 'default');
</script>

{#snippet searchIcon()}
  <svg viewBox="64 64 896 896" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
  </svg>
{/snippet}

<span class={searchClasses} style={styles.root}>
  <Input
    value={currentValue}
    {size}
    {disabled}
    {status}
    {variant}
    {prefix}
    {allowClear}
    class="{searchPrefixCls}-input"
    classNames={{
      input: classNames.input,
      prefix: classNames.prefix,
      suffix: classNames.suffix,
      clearIcon: classNames.clearIcon,
      count: classNames.count,
    }}
    styles={{
      input: styles.input,
      prefix: styles.prefix,
      suffix: styles.suffix,
      clearIcon: styles.clearIcon,
      count: styles.count,
    }}
    onchange={handleChange}
    onpressenter={handlePressEnter}
    onclear={handleClear}
    {...restProps}
  >
    {#snippet addonAfter()}
      {#if enterButton && typeof enterButton !== 'boolean'}
        <Button
          type={buttonColor}
          variant={buttonVariant}
          size={mergedSize}
          disabled={disabled || loading}
          {loading}
          class="{searchPrefixCls}-button {classNames.button ?? ''}"
          styles={{ root: styles.button }}
          onclick={handleSearch}
          icon={searchIcon}
        >
          {@render enterButton()}
        </Button>
      {:else}
        <Button
          type={buttonColor}
          variant={buttonVariant}
          size={mergedSize}
          disabled={disabled || loading}
          {loading}
          class="{searchPrefixCls}-button {classNames.button ?? ''}"
          styles={{ root: styles.button }}
          onclick={handleSearch}
          icon={searchIcon}
        />
      {/if}
    {/snippet}
  </Input>
</span>

<style>
  /* ==================== Search ==================== */
  :global(.ant-input-search) {
    display: inline-flex;
    width: 100%;
  }

  :global(.ant-input-search) :global(.ant-input-search-input) {
    flex: 1;
  }

  :global(.ant-input-search) :global(.ant-input-group-wrapper) {
    width: 100%;
  }

  :global(.ant-input-search) :global(.ant-input-group) {
    display: flex;
  }

  :global(.ant-input-search) :global(.ant-input-group) > :global(.ant-input-affix-wrapper) {
    flex: 1;
  }

  :global(.ant-input-search) :global(.ant-input-group-addon:last-child) {
    inset-inline-start: -1px;
    padding: 0;
    border: 0;
    background: transparent;
  }

  :global(.ant-input-search-with-button) :global(.ant-input-affix-wrapper) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :global(.ant-input-search-button) {
    height: 100%;
    padding-inline: 8px;
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* RTL */
  :global(.ant-input-search-rtl) {
    direction: rtl;
  }

  :global(.ant-input-search-rtl) :global(.ant-input-group-addon:last-child) {
    inset-inline-start: auto;
    inset-inline-end: -1px;
  }

  :global(.ant-input-search-rtl.ant-input-search-with-button) :global(.ant-input-affix-wrapper) {
    border-start-end-radius: 6px;
    border-end-end-radius: 6px;
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  :global(.ant-input-search-rtl) :global(.ant-input-search-button) {
    border-start-start-radius: 6px;
    border-end-start-radius: 6px;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  /* Spin animation */
  :global(.ant-input-spin),
  :global(.ant-btn-loading-spin) {
    animation: ant-input-spin 1s infinite linear;
  }

  @keyframes -global-ant-input-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

