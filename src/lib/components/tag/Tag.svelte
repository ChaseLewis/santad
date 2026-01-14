<script lang="ts" module>
  import type { TagProps } from './types';

  export type { TagProps };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import { wave } from '../../utils/wave';
  import { 
    isPresetColor, 
    isPresetStatusColor, 
    type TagProps as Props 
  } from './types';

  let {
    color,
    variant = 'filled',
    closable = false,
    closeIcon,
    onclose,
    icon,
    visible = true,
    href,
    target,
    disabled = false,
    prefixCls: customPrefixCls,
    class: className = '',
    classNames = {},
    styles = {},
    children,
    onclick,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('tag'));

  // Internal visibility state
  let internalVisible = $state(true);

  // Computed visibility
  const isVisible = $derived(visible && internalVisible);

  // Determine if it's a preset or status color
  const isPreset = $derived(isPresetColor(color));
  const isStatus = $derived(isPresetStatusColor(color));
  const isInternalColor = $derived(isPreset || isStatus);

  // Compute custom tag style for non-preset colors
  const customTagStyle = $derived.by(() => {
    if (!color || isInternalColor) return '';
    
    const styles: string[] = [];
    
    if (variant === 'solid') {
      styles.push(`background-color: ${color}`);
      styles.push('color: #fff');
      styles.push('border-color: transparent');
    } else if (variant === 'outlined') {
      // Calculate lighter background
      styles.push(`color: ${color}`);
      styles.push(`border-color: ${color}`);
      styles.push('background-color: transparent');
    } else {
      // filled variant
      styles.push(`color: ${color}`);
      styles.push('border-color: transparent');
    }
    
    return styles.join('; ');
  });

  // Compute class names
  const classes = $derived.by(() => {
    const cls = [prefixCls];

    // Variant
    cls.push(`${prefixCls}-${variant}`);

    // Color class for preset/status colors
    if (isInternalColor && color) {
      cls.push(`${prefixCls}-${color}`);
    }

    // Has custom color
    if (color && !isInternalColor) {
      cls.push(`${prefixCls}-custom-color`);
    }

    // States
    if (!isVisible) cls.push(`${prefixCls}-hidden`);
    if (disabled) cls.push(`${prefixCls}-disabled`);

    // RTL
    if (config.direction === 'rtl') {
      cls.push(`${prefixCls}-rtl`);
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

  // Compute root inline style
  const rootStyle = $derived.by(() => {
    const parts: string[] = [];
    if (customTagStyle && !disabled) parts.push(customTagStyle);
    if (styles.root) parts.push(styles.root);
    return parts.join('; ');
  });

  // Handle close click
  function handleCloseClick(e: MouseEvent) {
    if (disabled) return;
    e.stopPropagation();
    onclose?.(e);
    if (!e.defaultPrevented) {
      internalVisible = false;
    }
  }

  // Handle click
  function handleClick(e: MouseEvent) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onclick?.(e);
  }

  // Determine if wave effect should be shown
  const showWave = $derived(!!onclick || !!href);
</script>

{#if isVisible}
  {#if href}
    <a
      {href}
      {target}
      class={classes}
      style={rootStyle}
      aria-disabled={disabled}
      onclick={handleClick}
      use:wave={{ disabled: disabled || !showWave }}
      {...restProps}
    >
      {#if icon}
        <span 
          class="{prefixCls}-icon {classNames.icon ?? ''}"
          style={styles.icon}
        >
          {@render icon()}
        </span>
      {/if}
      {#if children}
        {#if icon}
          <span 
            class="{prefixCls}-content {classNames.content ?? ''}"
            style={styles.content}
          >
            {@render children()}
          </span>
        {:else}
          {@render children()}
        {/if}
      {/if}
      {#if closable}
        <span 
          class="{prefixCls}-close-icon {classNames.closeIcon ?? ''}"
          style={styles.closeIcon}
          role="button"
          tabindex={disabled ? -1 : 0}
          onclick={handleCloseClick}
          onkeydown={(e) => e.key === 'Enter' && handleCloseClick(e as unknown as MouseEvent)}
        >
          {#if closeIcon}
            {@render closeIcon()}
          {:else}
            <svg viewBox="64 64 896 896" focusable="false" width="1em" height="1em" fill="currentColor">
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
            </svg>
          {/if}
        </span>
      {/if}
    </a>
  {:else}
    <span
      class={classes}
      style={rootStyle}
      onclick={handleClick}
      role={onclick ? 'button' : undefined}
      tabindex={onclick && !disabled ? 0 : undefined}
      use:wave={{ disabled: disabled || !showWave }}
      {...restProps}
    >
      {#if icon}
        <span 
          class="{prefixCls}-icon {classNames.icon ?? ''}"
          style={styles.icon}
        >
          {@render icon()}
        </span>
      {/if}
      {#if children}
        {#if icon}
          <span 
            class="{prefixCls}-content {classNames.content ?? ''}"
            style={styles.content}
          >
            {@render children()}
          </span>
        {:else}
          {@render children()}
        {/if}
      {/if}
      {#if closable}
        <span 
          class="{prefixCls}-close-icon {classNames.closeIcon ?? ''}"
          style={styles.closeIcon}
          role="button"
          tabindex={disabled ? -1 : 0}
          onclick={handleCloseClick}
          onkeydown={(e) => e.key === 'Enter' && handleCloseClick(e as unknown as MouseEvent)}
        >
          {#if closeIcon}
            {@render closeIcon()}
          {:else}
            <svg viewBox="64 64 896 896" focusable="false" width="1em" height="1em" fill="currentColor">
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
            </svg>
          {/if}
        </span>
      {/if}
    </span>
  {/if}
{/if}

<style global lang="css">
  /* ==================== Base Tag Styles ==================== */
  :global(.ant-tag) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 12px;
    font-variant: tabular-nums;
    line-height: 1.6666666666666667;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: inline-block;
    height: auto;
    padding-inline: 7px;
    white-space: nowrap;
    border-radius: 4px;
    opacity: 1;
    transition: all 0.2s;
    text-align: start;
    position: relative;
  }

  :global(.ant-tag),
  :global(.ant-tag a),
  :global(.ant-tag a:hover) {
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    text-decoration: none;
  }

  :global(a.ant-tag) {
    cursor: pointer;
  }

  /* ==================== Variant: Filled (default) ==================== */
  :global(.ant-tag-filled) {
    background-color: var(--ant-color-fill-quaternary, rgba(0, 0, 0, 0.04));
    border: 1px solid transparent;
  }

  /* ==================== Variant: Outlined ==================== */
  :global(.ant-tag-outlined) {
    background-color: var(--ant-color-bg-container, #ffffff);
    border: 1px solid var(--ant-color-border, #d9d9d9);
  }

  /* ==================== Variant: Solid ==================== */
  :global(.ant-tag-solid) {
    background-color: var(--ant-color-bg-solid, rgba(0, 0, 0, 0.88));
    border: 1px solid transparent;
    color: #fff;
  }

  /* ==================== Close Icon ==================== */
  :global(.ant-tag-close-icon) {
    margin-inline-start: 3px;
    font-size: 10px;
    color: var(--ant-color-icon, rgba(0, 0, 0, 0.45));
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    vertical-align: -0.125em;
  }

  :global(.ant-tag-close-icon:hover) {
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  /* ==================== Icon ==================== */
  :global(.ant-tag-icon) {
    margin-inline-end: 4px;
    display: inline-flex;
    align-items: center;
    vertical-align: -0.125em;
  }

  :global(.ant-tag > .ant-tag-icon + span),
  :global(.ant-tag > span + .ant-tag-icon) {
    margin-inline-start: 7px;
  }

  /* ==================== Hidden ==================== */
  :global(.ant-tag-hidden) {
    display: none;
  }

  /* ==================== Disabled ==================== */
  :global(.ant-tag-disabled) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
    background-color: var(--ant-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
  }

  :global(.ant-tag-disabled a) {
    cursor: not-allowed;
    pointer-events: none;
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-tag-disabled.ant-tag-outlined) {
    border-color: var(--ant-color-border, #d9d9d9);
  }

  :global(.ant-tag-disabled.ant-tag-solid),
  :global(.ant-tag-disabled.ant-tag-filled) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-tag-disabled .ant-tag-close-icon) {
    cursor: not-allowed;
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-tag-disabled .ant-tag-close-icon:hover) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }

  /* ==================== RTL ==================== */
  :global(.ant-tag-rtl) {
    direction: rtl;
  }

  /* ==================== Preset Colors ==================== */
  /* Blue */
  :global(.ant-tag-blue:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #e6f4ff;
    border-color: #91caff;
    color: #1677ff;
  }
  :global(.ant-tag-blue:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #1677ff;
    border-color: #1677ff;
    color: #fff;
  }
  :global(.ant-tag-blue:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #e6f4ff;
    color: #1677ff;
  }

  /* Purple */
  :global(.ant-tag-purple:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #f9f0ff;
    border-color: #d3adf7;
    color: #722ed1;
  }
  :global(.ant-tag-purple:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #722ed1;
    border-color: #722ed1;
    color: #fff;
  }
  :global(.ant-tag-purple:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #f9f0ff;
    color: #722ed1;
  }

  /* Cyan */
  :global(.ant-tag-cyan:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #e6fffb;
    border-color: #87e8de;
    color: #13c2c2;
  }
  :global(.ant-tag-cyan:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #13c2c2;
    border-color: #13c2c2;
    color: #fff;
  }
  :global(.ant-tag-cyan:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #e6fffb;
    color: #13c2c2;
  }

  /* Green */
  :global(.ant-tag-green:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #f6ffed;
    border-color: #b7eb8f;
    color: #52c41a;
  }
  :global(.ant-tag-green:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #52c41a;
    border-color: #52c41a;
    color: #fff;
  }
  :global(.ant-tag-green:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #f6ffed;
    color: #52c41a;
  }

  /* Magenta */
  :global(.ant-tag-magenta:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #fff0f6;
    border-color: #ffadd2;
    color: #eb2f96;
  }
  :global(.ant-tag-magenta:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #eb2f96;
    border-color: #eb2f96;
    color: #fff;
  }
  :global(.ant-tag-magenta:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #fff0f6;
    color: #eb2f96;
  }

  /* Red */
  :global(.ant-tag-red:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #fff2f0;
    border-color: #ffccc7;
    color: #f5222d;
  }
  :global(.ant-tag-red:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #f5222d;
    border-color: #f5222d;
    color: #fff;
  }
  :global(.ant-tag-red:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #fff2f0;
    color: #f5222d;
  }

  /* Orange */
  :global(.ant-tag-orange:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #fff7e6;
    border-color: #ffd591;
    color: #fa8c16;
  }
  :global(.ant-tag-orange:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #fa8c16;
    border-color: #fa8c16;
    color: #fff;
  }
  :global(.ant-tag-orange:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #fff7e6;
    color: #fa8c16;
  }

  /* Yellow */
  :global(.ant-tag-yellow:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #feffe6;
    border-color: #fffb8f;
    color: #fadb14;
  }
  :global(.ant-tag-yellow:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #fadb14;
    border-color: #fadb14;
    color: rgba(0, 0, 0, 0.88);
  }
  :global(.ant-tag-yellow:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #feffe6;
    color: #d4b106;
  }

  /* Volcano */
  :global(.ant-tag-volcano:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #fff2e8;
    border-color: #ffbb96;
    color: #fa541c;
  }
  :global(.ant-tag-volcano:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #fa541c;
    border-color: #fa541c;
    color: #fff;
  }
  :global(.ant-tag-volcano:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #fff2e8;
    color: #fa541c;
  }

  /* Geekblue */
  :global(.ant-tag-geekblue:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #f0f5ff;
    border-color: #adc6ff;
    color: #2f54eb;
  }
  :global(.ant-tag-geekblue:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #2f54eb;
    border-color: #2f54eb;
    color: #fff;
  }
  :global(.ant-tag-geekblue:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #f0f5ff;
    color: #2f54eb;
  }

  /* Gold */
  :global(.ant-tag-gold:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #fffbe6;
    border-color: #ffe58f;
    color: #faad14;
  }
  :global(.ant-tag-gold:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #faad14;
    border-color: #faad14;
    color: #fff;
  }
  :global(.ant-tag-gold:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #fffbe6;
    color: #faad14;
  }

  /* Lime */
  :global(.ant-tag-lime:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #fcffe6;
    border-color: #eaff8f;
    color: #a0d911;
  }
  :global(.ant-tag-lime:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #a0d911;
    border-color: #a0d911;
    color: #fff;
  }
  :global(.ant-tag-lime:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #fcffe6;
    color: #a0d911;
  }

  /* ==================== Status Colors ==================== */
  /* Success */
  :global(.ant-tag-success:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #f6ffed;
    border-color: #b7eb8f;
    color: #52c41a;
  }
  :global(.ant-tag-success:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #52c41a;
    border-color: #52c41a;
    color: #fff;
  }
  :global(.ant-tag-success:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #f6ffed;
    color: #52c41a;
  }

  /* Processing (info) */
  :global(.ant-tag-processing:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #e6f4ff;
    border-color: #91caff;
    color: #1677ff;
  }
  :global(.ant-tag-processing:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #1677ff;
    border-color: #1677ff;
    color: #fff;
  }
  :global(.ant-tag-processing:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #e6f4ff;
    color: #1677ff;
  }

  /* Error */
  :global(.ant-tag-error:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #fff2f0;
    border-color: #ffccc7;
    color: #ff4d4f;
  }
  :global(.ant-tag-error:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #ff4d4f;
    border-color: #ff4d4f;
    color: #fff;
  }
  :global(.ant-tag-error:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #fff2f0;
    color: #ff4d4f;
  }

  /* Warning */
  :global(.ant-tag-warning:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: #fffbe6;
    border-color: #ffe58f;
    color: #faad14;
  }
  :global(.ant-tag-warning:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: #faad14;
    border-color: #faad14;
    color: #fff;
  }
  :global(.ant-tag-warning:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: #fffbe6;
    color: #faad14;
  }

  /* Default */
  :global(.ant-tag-default:not(.ant-tag-disabled).ant-tag-outlined) {
    background-color: var(--ant-color-fill-quaternary, #fafafa);
    border-color: var(--ant-color-border, #d9d9d9);
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }
  :global(.ant-tag-default:not(.ant-tag-disabled).ant-tag-solid) {
    background-color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    border-color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    color: var(--ant-color-bg-container, #fff);
  }
  :global(.ant-tag-default:not(.ant-tag-disabled).ant-tag-filled) {
    background-color: var(--ant-color-fill-quaternary, #fafafa);
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  /* ==================== Checkable Tag ==================== */
  :global(.ant-tag-checkable) {
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
  }

  :global(.ant-tag-checkable:not(.ant-tag-checkable-checked):not(.ant-tag-checkable-disabled):hover) {
    color: var(--ant-color-primary, #1677ff);
    background-color: var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06));
  }

  :global(.ant-tag-checkable:active),
  :global(.ant-tag-checkable-checked) {
    color: #fff;
  }

  :global(.ant-tag-checkable-checked) {
    background-color: var(--ant-color-primary, #1677ff);
  }

  :global(.ant-tag-checkable-checked:hover) {
    background-color: var(--ant-color-primary-hover, #4096ff);
  }

  :global(.ant-tag-checkable:active) {
    background-color: var(--ant-color-primary-active, #0958d9);
  }

  :global(.ant-tag-checkable-disabled) {
    cursor: not-allowed;
  }

  :global(.ant-tag-checkable-disabled:not(.ant-tag-checkable-checked)) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-tag-checkable-disabled:not(.ant-tag-checkable-checked):hover) {
    background-color: transparent;
  }

  :global(.ant-tag-checkable-disabled.ant-tag-checkable-checked) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    background-color: var(--ant-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
  }

  :global(.ant-tag-checkable-disabled:hover),
  :global(.ant-tag-checkable-disabled:active) {
    background-color: var(--ant-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-tag-checkable-disabled:not(.ant-tag-checkable-checked):hover) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }
</style>

