<script lang="ts" module>
  import type { SwitchProps, SwitchClassNames, SwitchStyles, SwitchSize } from './types';

  export type { SwitchProps, SwitchClassNames, SwitchStyles, SwitchSize };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { SwitchProps as Props } from './types';

  let {
    checked: checkedProp,
    defaultChecked = false,
    disabled = false,
    loading = false,
    size = 'default',
    checkedChildren,
    unCheckedChildren,
    tabIndex = 0,
    autoFocus = false,
    prefixCls: customPrefixCls,
    class: className = '',
    classNames = {},
    style: customStyle = '',
    styles = {},
    onchange,
    onclick,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('switch'));

  // Internal checked state (for uncontrolled mode)
  let internalChecked = $state(defaultChecked);

  // Actual checked state
  const isChecked = $derived(checkedProp !== undefined ? checkedProp : internalChecked);

  // Merged disabled state
  const mergedDisabled = $derived(disabled || loading);

  // Wave animation state
  let showWave = $state(false);
  let waveColor = $state('');

  // Handle click
  function handleClick(e: MouseEvent) {
    if (mergedDisabled) return;

    const newChecked = !isChecked;

    // Trigger wave animation
    // Wave color should be based on the NEW state (what it's becoming)
    // Use theme-aware colorTextQuaternary for unchecked state (adapts to light/dark mode)
    waveColor = newChecked 
      ? 'var(--ant-color-primary, #1677ff)' 
      : 'var(--ant-color-text-quaternary, rgba(0, 0, 0, 0.25))';
    showWave = true;
    
    // Reset wave after animation
    setTimeout(() => {
      showWave = false;
    }, 400);

    // Update internal state if uncontrolled
    if (checkedProp === undefined) {
      internalChecked = newChecked;
    }

    onclick?.(newChecked, e);
    onchange?.(newChecked);
  }

  // Handle keyboard
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as unknown as MouseEvent);
    }
  }

  // Compute class names
  const classes = $derived.by(() => {
    const cls = [prefixCls];

    if (isChecked) cls.push(`${prefixCls}-checked`);
    if (mergedDisabled) cls.push(`${prefixCls}-disabled`);
    if (loading) cls.push(`${prefixCls}-loading`);
    if (size === 'small') cls.push(`${prefixCls}-small`);
    if (config.direction === 'rtl') cls.push(`${prefixCls}-rtl`);
    if (className) cls.push(className);
    if (classNames.root) cls.push(classNames.root);

    return cls.join(' ');
  });

  // Root style
  const rootStyle = $derived.by(() => {
    const styleList: string[] = [];
    if (customStyle) styleList.push(customStyle);
    if (styles.root) styleList.push(styles.root);
    return styleList.join('; ');
  });
</script>

<button
  type="button"
  role="switch"
  aria-checked={isChecked}
  class={classes}
  class:ant-switch-wave={showWave}
  style="{rootStyle}; --wave-color: {waveColor}"
  disabled={mergedDisabled}
  tabindex={mergedDisabled ? -1 : tabIndex}
  onclick={handleClick}
  onkeydown={handleKeyDown}
  {...restProps}
>
  {#if showWave}
    <span class="{prefixCls}-wave"></span>
  {/if}
  <div class="{prefixCls}-handle {classNames.handle ?? ''}" style={styles.handle}>
    {#if loading}
      <span class="{prefixCls}-loading-icon">
        <svg class="{prefixCls}-spin" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C659 83.6 601.4 72 542 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C807.8 66.4 869 105.8 921 157.8c51.9 52.1 91.4 113.2 117.2 179.7 26.9 63.1 40.3 130.2 40.3 199.3.1 19.9-16 36.2-35.9 36.2z" />
        </svg>
      </span>
    {/if}
  </div>
  <span class="{prefixCls}-inner {classNames.inner ?? ''}" style={styles.inner}>
    <span class="{prefixCls}-inner-checked">
      {#if checkedChildren}
        {#if typeof checkedChildren === 'string'}
          {checkedChildren}
        {:else}
          {@render checkedChildren?.()}
        {/if}
      {/if}
    </span>
    <span class="{prefixCls}-inner-unchecked">
      {#if unCheckedChildren}
        {#if typeof unCheckedChildren === 'string'}
          {unCheckedChildren}
        {:else}
          {@render unCheckedChildren?.()}
        {/if}
      {/if}
    </span>
  </span>
</button>

<style>
  :global(.ant-switch) {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-width: 44px;
    height: 22px;
    padding: 0;
    background-color: var(--ant-color-text-quaternary, rgba(0, 0, 0, 0.25));
    border: 0;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.2s;
    user-select: none;
    vertical-align: middle;
  }

  :global(.ant-switch:focus-visible) {
    outline: 2px solid var(--ant-color-primary-border, #91caff);
    outline-offset: 1px;
  }

  :global(.ant-switch-checked) {
    background-color: var(--ant-color-primary, #1677ff);
  }

  :global(.ant-switch-disabled) {
    cursor: not-allowed;
    opacity: 0.65;
  }

  :global(.ant-switch-loading) {
    cursor: default;
    opacity: 0.65;
  }

  /* Handle */
  :global(.ant-switch-handle) {
    position: absolute;
    top: 2px;
    inset-inline-start: 2px;
    width: 18px;
    height: 18px;
    transition: all 0.2s ease-in-out;
  }

  :global(.ant-switch-handle::before) {
    content: '';
    position: absolute;
    inset: 0;
    background-color: #fff;
    border-radius: 9px;
    box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
    transition: all 0.2s ease-in-out;
  }

  :global(.ant-switch-checked .ant-switch-handle) {
    inset-inline-start: calc(100% - 20px);
  }

  /* Loading icon */
  :global(.ant-switch-loading-icon) {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.65);
    z-index: 1;
  }

  :global(.ant-switch-loading-icon svg) {
    width: 10px;
    height: 10px;
  }

  :global(.ant-switch-checked .ant-switch-loading-icon) {
    color: var(--ant-color-primary, #1677ff);
  }

  :global(.ant-switch-spin) {
    animation: ant-switch-spin 1s infinite linear;
  }

  @keyframes ant-switch-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Inner content */
  :global(.ant-switch-inner) {
    display: block;
    overflow: hidden;
    border-radius: 100px;
    height: 100%;
    padding-inline-start: 24px;
    padding-inline-end: 8px;
    transition: padding-inline-start 0.2s ease-in-out, padding-inline-end 0.2s ease-in-out;
  }

  :global(.ant-switch-checked .ant-switch-inner) {
    padding-inline-start: 8px;
    padding-inline-end: 24px;
  }

  :global(.ant-switch-inner-checked),
  :global(.ant-switch-inner-unchecked) {
    display: block;
    color: #fff;
    font-size: 12px;
    line-height: 22px;
    pointer-events: none;
  }

  :global(.ant-switch-inner-checked) {
    margin-top: -22px;
    opacity: 0;
    transition: margin-top 0.2s ease-in-out, opacity 0.2s ease-in-out;
  }

  :global(.ant-switch-checked .ant-switch-inner-checked) {
    margin-top: 0;
    opacity: 1;
  }

  :global(.ant-switch-inner-unchecked) {
    margin-top: 0;
    opacity: 1;
    transition: margin-top 0.2s ease-in-out, opacity 0.2s ease-in-out;
  }

  :global(.ant-switch-checked .ant-switch-inner-unchecked) {
    margin-top: -22px;
    opacity: 0;
  }

  /* Small size */
  :global(.ant-switch-small) {
    min-width: 28px;
    height: 16px;
  }

  :global(.ant-switch-small .ant-switch-handle) {
    width: 12px;
    height: 12px;
  }

  :global(.ant-switch-small .ant-switch-handle::before) {
    border-radius: 6px;
  }

  :global(.ant-switch-small.ant-switch-checked .ant-switch-handle) {
    inset-inline-start: calc(100% - 14px);
  }

  :global(.ant-switch-small .ant-switch-inner) {
    padding-inline-start: 18px;
    padding-inline-end: 6px;
  }

  :global(.ant-switch-small.ant-switch-checked .ant-switch-inner) {
    padding-inline-start: 6px;
    padding-inline-end: 18px;
  }

  :global(.ant-switch-small .ant-switch-inner-checked),
  :global(.ant-switch-small .ant-switch-inner-unchecked) {
    font-size: 12px;
    line-height: 16px;
  }

  :global(.ant-switch-small .ant-switch-inner-checked) {
    margin-top: -16px;
  }

  :global(.ant-switch-small.ant-switch-checked .ant-switch-inner-unchecked) {
    margin-top: -16px;
  }

  :global(.ant-switch-small .ant-switch-loading-icon svg) {
    width: 8px;
    height: 8px;
  }

  /* Hover */
  :global(.ant-switch:not(.ant-switch-disabled):not(.ant-switch-loading):hover) {
    background-color: var(--ant-color-text-tertiary, rgba(0, 0, 0, 0.45));
  }

  :global(.ant-switch-checked:not(.ant-switch-disabled):not(.ant-switch-loading):hover) {
    background-color: var(--ant-color-primary-hover, #4096ff);
  }

  /* RTL */
  :global(.ant-switch-rtl) {
    direction: rtl;
  }

  /* Wave animation - matches Ant Design wave effect */
  :global(.ant-switch-wave) {
    --wave-color: var(--ant-color-primary, #1677ff);
  }

  :global(.ant-switch-wave::after) {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 100px;
    border: 0 solid var(--wave-color);
    opacity: 0.2;
    animation: ant-switch-wave-effect 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
    animation-fill-mode: forwards;
    pointer-events: none;
  }

  @keyframes ant-switch-wave-effect {
    0% {
      inset: -1px;
      border-width: 0;
      opacity: 0.2;
    }
    100% {
      inset: -7px;
      border-width: 6px;
      opacity: 0;
    }
  }
</style>

