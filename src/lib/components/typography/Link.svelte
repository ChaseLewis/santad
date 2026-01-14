<script lang="ts" module>
  import type { LinkProps } from './types';

  export type { LinkProps };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { LinkProps as Props } from './types';

  let {
    href,
    target,
    type,
    disabled = false,
    strong = false,
    italic = false,
    underline = false,
    delete: del = false,
    mark = false,
    prefixCls: customPrefixCls,
    class: className = '',
    style = '',
    children,
    onclick,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('typography'));

  // Compute class names
  const classes = $derived.by(() => {
    const cls = [prefixCls, `${prefixCls}-link`];

    // Type
    if (type) {
      cls.push(`${prefixCls}-${type}`);
    }

    // States
    if (disabled) cls.push(`${prefixCls}-disabled`);

    // RTL
    if (config.direction === 'rtl') {
      cls.push(`${prefixCls}-rtl`);
    }

    // Custom class
    if (className) {
      cls.push(className);
    }

    return cls.join(' ');
  });

  // Handle click
  function handleClick(e: MouseEvent) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onclick?.(e);
  }
</script>

{#snippet inner()}
  {#if children}{@render children()}{/if}
{/snippet}

{#snippet withMark()}
  {#if mark}<mark>{@render inner()}</mark>{:else}{@render inner()}{/if}
{/snippet}

{#snippet withDel()}
  {#if del}<del>{@render withMark()}</del>{:else}{@render withMark()}{/if}
{/snippet}

{#snippet withUnderline()}
  {#if underline}<u>{@render withDel()}</u>{:else}{@render withDel()}{/if}
{/snippet}

{#snippet withItalic()}
  {#if italic}<em>{@render withUnderline()}</em>{:else}{@render withUnderline()}{/if}
{/snippet}

{#snippet withStrong()}
  {#if strong}<strong>{@render withItalic()}</strong>{:else}{@render withItalic()}{/if}
{/snippet}

<a
  {href}
  {target}
  class={classes}
  {style}
  onclick={handleClick}
  aria-disabled={disabled}
  tabindex={disabled ? -1 : undefined}
  {...restProps}
>{@render withStrong()}</a>

<style global lang="css">
  /* ==================== Link Styles ==================== */
  :global(.ant-typography-link) {
    color: var(--ant-color-link, #1677ff);
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: color 0.2s;
  }

  :global(.ant-typography-link:hover) {
    color: var(--ant-color-link-hover, #4096ff);
  }

  :global(.ant-typography-link:active) {
    color: var(--ant-color-link-active, #0958d9);
  }

  :global(.ant-typography-link:focus-visible) {
    outline: 2px solid var(--ant-color-primary, #1677ff);
    outline-offset: 1px;
    border-radius: 2px;
  }

  /* Link with type */
  :global(.ant-typography-link.ant-typography-secondary) {
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
  }

  :global(.ant-typography-link.ant-typography-secondary:hover) {
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  :global(.ant-typography-link.ant-typography-success) {
    color: var(--ant-color-success, #52c41a);
  }

  :global(.ant-typography-link.ant-typography-success:hover) {
    color: var(--ant-color-success-hover, #73d13d);
  }

  :global(.ant-typography-link.ant-typography-warning) {
    color: var(--ant-color-warning, #faad14);
  }

  :global(.ant-typography-link.ant-typography-warning:hover) {
    color: var(--ant-color-warning-hover, #ffc53d);
  }

  :global(.ant-typography-link.ant-typography-danger) {
    color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-typography-link.ant-typography-danger:hover) {
    color: var(--ant-color-error-hover, #ff7875);
  }

  /* Disabled link */
  :global(.ant-typography-link.ant-typography-disabled) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
  }

  :global(.ant-typography-link.ant-typography-disabled:hover) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }
</style>
