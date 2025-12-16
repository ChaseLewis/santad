<script lang="ts" module>
  import type { ButtonProps } from './types';

  export type { ButtonProps };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import { getThemeContext } from '../../theme/context.svelte';
  import { wave } from '../../utils/wave';
  import { getColorVariantFromType, type ButtonProps as Props } from './types';

  let {
    type = 'default',
    color,
    variant,
    shape = 'default',
    size,
    disabled = false,
    loading = false,
    block = false,
    danger = false,
    ghost = false,
    icon,
    iconPlacement = 'start',
    htmlType = 'button',
    href,
    target,
    prefixCls: customPrefixCls,
    class: className = '',
    classNames = {},
    styles = {},
    children,
    onclick,
    ...restProps
  }: Props = $props();

  // Get config and theme from context
  const config = getConfigContext();
  const theme = getThemeContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('btn'));

  // Merge size from props or config
  const mergedSize = $derived(size ?? config.size);

  // Resolve color and variant from type (legacy API support)
  const [derivedColor, derivedVariant] = $derived.by(() => {
    if (color && variant) {
      return [color, variant];
    }
    return getColorVariantFromType(type, danger);
  });

  const mergedColor = $derived(color ?? derivedColor ?? 'default');
  const mergedVariant = $derived(variant ?? derivedVariant ?? 'outlined');

  // Loading state
  const isLoading = $derived(
    typeof loading === 'boolean' ? loading : false
  );

  // Wave animation state
  let waveActive = $state(false);

  // Compute class names
  const classes = $derived.by(() => {
    const cls = [prefixCls];

    // Type class (for backwards compatibility)
    if (type && type !== 'default') {
      cls.push(`${prefixCls}-${type}`);
    }

    // Color and variant
    cls.push(`${prefixCls}-color-${mergedColor}`);
    cls.push(`${prefixCls}-variant-${mergedVariant}`);

    // Size
    if (mergedSize === 'large') {
      cls.push(`${prefixCls}-lg`);
    } else if (mergedSize === 'small') {
      cls.push(`${prefixCls}-sm`);
    }

    // Shape
    if (shape !== 'default') {
      cls.push(`${prefixCls}-${shape}`);
    }

    // States
    if (isLoading) cls.push(`${prefixCls}-loading`);
    if (disabled) cls.push(`${prefixCls}-disabled`);
    if (block) cls.push(`${prefixCls}-block`);
    if (ghost) cls.push(`${prefixCls}-background-ghost`);
    if (danger) cls.push(`${prefixCls}-dangerous`);

    // Icon only
    if (icon && !children) {
      cls.push(`${prefixCls}-icon-only`);
    }

    // Icon placement
    if (iconPlacement === 'end') {
      cls.push(`${prefixCls}-icon-end`);
    }

    // RTL
    if (config.direction === 'rtl') {
      cls.push(`${prefixCls}-rtl`);
    }

    // Wave animation
    if (waveActive) {
      cls.push(`${prefixCls}-wave-active`);
    }

    // Custom class
    if (className) {
      cls.push(className);
    }

    // Semantic root class
    if (classNames.root) {
      cls.push(classNames.root);
    }

    return cls.join(' ');
  });

  // Compute root inline style (combining semantic styles)
  const rootStyle = $derived(styles.root ?? '');

  // Trigger wave animation
  function triggerWave() {
    // Don't show wave for text/link buttons
    if (mergedVariant === 'text' || mergedVariant === 'link') {
      return;
    }
    
    waveActive = true;
    setTimeout(() => {
      waveActive = false;
    }, 400);
  }

  // Click handler
  function handleClick(e: MouseEvent) {
    if (isLoading || disabled) {
      e.preventDefault();
      return;
    }
    triggerWave();
    onclick?.(e);
  }
</script>

{#if href}
  <a
    {href}
    {target}
    class={classes}
    style={rootStyle}
    aria-disabled={disabled || isLoading}
    tabindex={disabled ? -1 : 0}
    onclick={handleClick}
    use:wave={{ disabled: disabled || isLoading }}
    {...restProps}
  >
    {#if isLoading}
      <span 
        class="{prefixCls}-loading-icon {classNames.loadingIcon ?? ''}"
        style={styles.loadingIcon}
      >
        <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
          <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C659 83.6 601.4 72 542 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C807.8 66.4 869 105.8 921 157.8c51.9 52.1 91.4 113.2 117.2 179.7 26.9 63.1 40.3 130.2 40.3 199.3.1 19.9-16 36.2-35.9 36.2z" />
        </svg>
      </span>
    {:else if icon}
      <span 
        class="{prefixCls}-icon {classNames.icon ?? ''}"
        style={styles.icon}
      >
        {@render icon()}
      </span>
    {/if}
    {#if children}
      <span 
        class="{prefixCls}-content {classNames.content ?? ''}"
        style={styles.content}
      >
        {@render children()}
      </span>
    {/if}
  </a>
{:else}
  <button
    type={htmlType}
    class={classes}
    style={rootStyle}
    disabled={disabled || isLoading}
    onclick={handleClick}
    use:wave={{ disabled: disabled || isLoading }}
    {...restProps}
  >
    {#if isLoading}
      <span 
        class="{prefixCls}-loading-icon {classNames.loadingIcon ?? ''}"
        style={styles.loadingIcon}
      >
        <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
          <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C659 83.6 601.4 72 542 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C807.8 66.4 869 105.8 921 157.8c51.9 52.1 91.4 113.2 117.2 179.7 26.9 63.1 40.3 130.2 40.3 199.3.1 19.9-16 36.2-35.9 36.2z" />
        </svg>
      </span>
    {:else if icon}
      <span 
        class="{prefixCls}-icon {classNames.icon ?? ''}"
        style={styles.icon}
      >
        {@render icon()}
      </span>
    {/if}
    {#if children}
      <span 
        class="{prefixCls}-content {classNames.content ?? ''}"
        style={styles.content}
      >
        {@render children()}
      </span>
    {/if}
  </button>
{/if}

<style global>
  :global(.ant-btn) {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    background-color: transparent;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5714285714285714;
    height: 32px;
    padding: 4px 15px;
    border-radius: 6px;
    outline: none;
    text-decoration: none;
  }

  :global(.ant-btn:focus-visible) {
    outline: 2px solid var(--ant-color-primary, #1677ff);
    outline-offset: 1px;
  }

  /* Size variants */
  :global(.ant-btn-lg) {
    height: 40px;
    padding: 6px 15px;
    font-size: 16px;
    border-radius: 8px;
  }

  :global(.ant-btn-sm) {
    height: 24px;
    padding: 0 7px;
    font-size: 12px;
    border-radius: 4px;
  }

  /* Shape variants */
  :global(.ant-btn-circle) {
    width: 32px;
    height: 32px;
    min-width: 32px;
    padding: 0;
    border-radius: 50%;
  }

  :global(.ant-btn-circle.ant-btn-lg) {
    width: 40px;
    height: 40px;
    min-width: 40px;
  }

  :global(.ant-btn-circle.ant-btn-sm) {
    width: 24px;
    height: 24px;
    min-width: 24px;
  }

  :global(.ant-btn-round) {
    border-radius: 32px;
    padding-inline: 16px;
  }

  :global(.ant-btn-round.ant-btn-lg) {
    border-radius: 40px;
    padding-inline: 20px;
  }

  :global(.ant-btn-round.ant-btn-sm) {
    border-radius: 24px;
    padding-inline: 12px;
  }

  /* Block */
  :global(.ant-btn-block) {
    width: 100%;
  }

  /* Icon only */
  :global(.ant-btn-icon-only) {
    width: var(--ant-control-height, 32px);
    padding-inline: 0;
  }

  :global(.ant-btn-icon-only.ant-btn-lg) {
    width: var(--ant-control-height-lg, 40px);
  }

  :global(.ant-btn-icon-only.ant-btn-sm) {
    width: var(--ant-control-height-sm, 24px);
  }

  /* Icon placement */
  :global(.ant-btn-icon-end) {
    flex-direction: row-reverse;
  }

  /* Icon */
  :global(.ant-btn-icon) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
  }

  :global(.ant-btn-loading-icon) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
  }

  /* Loading */
  :global(.ant-btn-loading) {
    opacity: var(--ant-opacity-loading, 0.65);
    cursor: default;
  }

  :global(.ant-btn-loading-icon) {
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }

  :global(.ant-btn-loading-icon svg) {
    animation: ant-btn-spin 1s infinite linear;
  }

  @keyframes -global-ant-btn-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Disabled */
  :global(.ant-btn-disabled),
  :global(.ant-btn:disabled) {
    cursor: not-allowed;
    opacity: 0.65;
  }

  /* ==================== Wave Effect ==================== */
  :global(.ant-btn)::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    box-shadow: 0 0 0 0 currentColor;
    transition: none;
    pointer-events: none;
  }

  :global(.ant-btn-wave-active)::after {
    animation: ant-btn-wave 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
  }

  @keyframes ant-btn-wave {
    0% {
      opacity: 0.4;
      box-shadow: 0 0 0 0 currentColor;
    }
    100% {
      opacity: 0;
      box-shadow: 0 0 0 6px currentColor;
    }
  }

  /* Wave color overrides for different variants */
  :global(.ant-btn-variant-solid.ant-btn-color-primary)::after {
    color: var(--ant-color-primary, #1677ff);
  }

  :global(.ant-btn-variant-solid.ant-btn-color-danger)::after,
  :global(.ant-btn-dangerous.ant-btn-variant-solid)::after {
    color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-btn-variant-outlined)::after,
  :global(.ant-btn-variant-dashed)::after {
    color: var(--ant-color-primary, #1677ff);
  }

  /* Danger variants - override to red wave */
  :global(.ant-btn-dangerous.ant-btn-variant-outlined)::after,
  :global(.ant-btn-dangerous.ant-btn-variant-dashed)::after,
  :global(.ant-btn-dangerous.ant-btn-variant-text)::after,
  :global(.ant-btn-dangerous.ant-btn-variant-link)::after {
    color: var(--ant-color-error, #ff4d4f);
  }

  /* ==================== VARIANT: outlined (default) ==================== */
  :global(.ant-btn-variant-outlined) {
    background-color: var(--ant-color-bg-container, #ffffff);
    border-color: var(--ant-color-border, #d9d9d9);
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  }

  :global(.ant-btn-variant-outlined:not(:disabled):hover) {
    color: var(--ant-color-primary-hover, #4096ff);
    border-color: var(--ant-color-primary-hover, #4096ff);
  }

  :global(.ant-btn-variant-outlined:not(:disabled):active) {
    color: var(--ant-color-primary-active, #0958d9);
    border-color: var(--ant-color-primary-active, #0958d9);
  }

  /* ==================== VARIANT: dashed ==================== */
  :global(.ant-btn-variant-dashed) {
    background-color: var(--ant-color-bg-container, #ffffff);
    border-color: var(--ant-color-border, #d9d9d9);
    border-style: dashed;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  }

  :global(.ant-btn-variant-dashed:not(:disabled):hover) {
    color: var(--ant-color-primary-hover, #4096ff);
    border-color: var(--ant-color-primary-hover, #4096ff);
  }

  :global(.ant-btn-variant-dashed:not(:disabled):active) {
    color: var(--ant-color-primary-active, #0958d9);
    border-color: var(--ant-color-primary-active, #0958d9);
  }

  /* ==================== VARIANT: solid ==================== */
  :global(.ant-btn-variant-solid) {
    border-color: transparent;
  }

  :global(.ant-btn-variant-solid.ant-btn-color-default) {
    background-color: var(--ant-color-bg-container, #ffffff);
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  :global(.ant-btn-variant-solid.ant-btn-color-primary) {
    background-color: var(--ant-color-primary, #1677ff);
    color: #fff;
    box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
  }

  :global(.ant-btn-variant-solid.ant-btn-color-primary:not(:disabled):hover) {
    background-color: var(--ant-color-primary-hover, #4096ff);
  }

  :global(.ant-btn-variant-solid.ant-btn-color-primary:not(:disabled):active) {
    background-color: var(--ant-color-primary-active, #0958d9);
  }

  :global(.ant-btn-variant-solid.ant-btn-color-danger) {
    background-color: var(--ant-color-error, #ff4d4f);
    color: #fff;
    box-shadow: 0 2px 0 rgba(255, 38, 5, 0.06);
  }

  :global(.ant-btn-variant-solid.ant-btn-color-danger:not(:disabled):hover) {
    background-color: var(--ant-color-error-hover, #ff7875);
  }

  :global(.ant-btn-variant-solid.ant-btn-color-danger:not(:disabled):active) {
    background-color: var(--ant-color-error-active, #d9363e);
  }

  /* ==================== VARIANT: filled ==================== */
  :global(.ant-btn-variant-filled) {
    border-color: transparent;
  }

  :global(.ant-btn-variant-filled.ant-btn-color-default) {
    background-color: var(--ant-color-fill-tertiary, rgba(0, 0, 0, 0.04));
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  :global(.ant-btn-variant-filled.ant-btn-color-default:not(:disabled):hover) {
    background-color: var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06));
  }

  :global(.ant-btn-variant-filled.ant-btn-color-primary) {
    background-color: var(--ant-color-primary-bg, #e6f4ff);
    color: var(--ant-color-primary, #1677ff);
  }

  :global(.ant-btn-variant-filled.ant-btn-color-primary:not(:disabled):hover) {
    background-color: var(--ant-color-primary-bg-hover, #bae0ff);
  }

  :global(.ant-btn-variant-filled.ant-btn-color-danger) {
    background-color: var(--ant-color-error-bg, #fff2f0);
    color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-btn-variant-filled.ant-btn-color-danger:not(:disabled):hover) {
    background-color: var(--ant-color-error-bg-hover, #ffccc7);
  }

  /* ==================== VARIANT: text ==================== */
  :global(.ant-btn-variant-text) {
    background-color: transparent;
    border-color: transparent;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  :global(.ant-btn-variant-text:not(:disabled):hover) {
    background-color: var(--ant-color-fill-tertiary, rgba(0, 0, 0, 0.04));
  }

  :global(.ant-btn-variant-text:not(:disabled):active) {
    background-color: var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06));
  }

  :global(.ant-btn-variant-text.ant-btn-color-primary) {
    color: var(--ant-color-primary, #1677ff);
  }

  :global(.ant-btn-variant-text.ant-btn-color-danger) {
    color: var(--ant-color-error, #ff4d4f);
  }

  /* ==================== VARIANT: link ==================== */
  :global(.ant-btn-variant-link) {
    background-color: transparent;
    border-color: transparent;
    color: var(--ant-color-primary, #1677ff);
  }

  :global(.ant-btn-variant-link:not(:disabled):hover) {
    color: var(--ant-color-primary-hover, #4096ff);
  }

  :global(.ant-btn-variant-link:not(:disabled):active) {
    color: var(--ant-color-primary-active, #0958d9);
  }

  :global(.ant-btn-variant-link.ant-btn-color-danger) {
    color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-btn-variant-link.ant-btn-color-danger:not(:disabled):hover) {
    color: var(--ant-color-error-hover, #ff7875);
  }

  /* ==================== Ghost mode ==================== */
  :global(.ant-btn-background-ghost) {
    background-color: transparent;
  }

  :global(.ant-btn-background-ghost.ant-btn-variant-solid.ant-btn-color-primary) {
    color: var(--ant-color-primary, #1677ff);
    border-color: var(--ant-color-primary, #1677ff);
    background-color: transparent;
  }

  :global(.ant-btn-background-ghost.ant-btn-variant-solid.ant-btn-color-primary:not(:disabled):hover) {
    color: var(--ant-color-primary-hover, #4096ff);
    border-color: var(--ant-color-primary-hover, #4096ff);
    background-color: transparent;
  }

  :global(.ant-btn-background-ghost.ant-btn-variant-solid.ant-btn-color-primary:not(:disabled):active) {
    color: var(--ant-color-primary-active, #0958d9);
    border-color: var(--ant-color-primary-active, #0958d9);
    background-color: transparent;
  }

  :global(.ant-btn-background-ghost.ant-btn-variant-solid.ant-btn-color-danger) {
    color: var(--ant-color-error, #ff4d4f);
    border-color: var(--ant-color-error, #ff4d4f);
    background-color: transparent;
  }

  :global(.ant-btn-background-ghost.ant-btn-variant-solid.ant-btn-color-danger:not(:disabled):hover) {
    color: var(--ant-color-error-hover, #ff7875);
    border-color: var(--ant-color-error-hover, #ff7875);
    background-color: transparent;
  }

  :global(.ant-btn-background-ghost.ant-btn-variant-solid.ant-btn-color-danger:not(:disabled):active) {
    color: var(--ant-color-error-active, #d9363e);
    border-color: var(--ant-color-error-active, #d9363e);
    background-color: transparent;
  }

  /* Ghost outlined/dashed variants */
  :global(.ant-btn-background-ghost.ant-btn-variant-outlined),
  :global(.ant-btn-background-ghost.ant-btn-variant-dashed) {
    background-color: transparent;
  }

  :global(.ant-btn-background-ghost.ant-btn-variant-outlined:not(:disabled):hover),
  :global(.ant-btn-background-ghost.ant-btn-variant-dashed:not(:disabled):hover) {
    background-color: transparent;
  }

  /* ==================== Dangerous modifier ==================== */
  :global(.ant-btn-dangerous.ant-btn-variant-outlined) {
    color: var(--ant-color-error, #ff4d4f);
    border-color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-btn-dangerous.ant-btn-variant-outlined:not(:disabled):hover) {
    color: var(--ant-color-error-hover, #ff7875);
    border-color: var(--ant-color-error-hover, #ff7875);
  }

  :global(.ant-btn-dangerous.ant-btn-variant-dashed) {
    color: var(--ant-color-error, #ff4d4f);
    border-color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-btn-dangerous.ant-btn-variant-dashed:not(:disabled):hover) {
    color: var(--ant-color-error-hover, #ff7875);
    border-color: var(--ant-color-error-hover, #ff7875);
  }

  /* RTL support */
  :global(.ant-btn-rtl) {
    direction: rtl;
  }

  :global(.ant-btn-rtl.ant-btn-icon-end) {
    flex-direction: row;
  }
</style>

