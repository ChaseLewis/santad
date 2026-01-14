<script lang="ts" module>
  import type { TitleProps } from './types';

  export type { TitleProps };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { TitleProps as Props } from './types';

  let {
    level = 1,
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
    const cls = [prefixCls, `${prefixCls}-title`, `${prefixCls}-title-${level}`];

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

{#if level === 1}
  <h1 class={classes} {style} onclick={disabled ? undefined : onclick} {...restProps}>{@render withStrong()}</h1>
{:else if level === 2}
  <h2 class={classes} {style} onclick={disabled ? undefined : onclick} {...restProps}>{@render withStrong()}</h2>
{:else if level === 3}
  <h3 class={classes} {style} onclick={disabled ? undefined : onclick} {...restProps}>{@render withStrong()}</h3>
{:else if level === 4}
  <h4 class={classes} {style} onclick={disabled ? undefined : onclick} {...restProps}>{@render withStrong()}</h4>
{:else}
  <h5 class={classes} {style} onclick={disabled ? undefined : onclick} {...restProps}>{@render withStrong()}</h5>
{/if}

<style global lang="css">
  /* ==================== Title Styles ==================== */
  :global(.ant-typography-title) {
    margin-bottom: 0.5em;
    color: var(--ant-color-text-heading, rgba(0, 0, 0, 0.88));
    font-weight: 600;
    line-height: 1.23;
  }

  :global(.ant-typography-title-1) {
    margin-bottom: 0.67em;
    font-size: var(--ant-font-size-heading-1, 38px);
    line-height: var(--ant-line-height-heading-1, 1.21);
  }

  :global(.ant-typography-title-2) {
    font-size: var(--ant-font-size-heading-2, 30px);
    line-height: var(--ant-line-height-heading-2, 1.27);
  }

  :global(.ant-typography-title-3) {
    font-size: var(--ant-font-size-heading-3, 24px);
    line-height: var(--ant-line-height-heading-3, 1.33);
  }

  :global(.ant-typography-title-4) {
    font-size: var(--ant-font-size-heading-4, 20px);
    line-height: var(--ant-line-height-heading-4, 1.4);
  }

  :global(.ant-typography-title-5) {
    font-size: var(--ant-font-size-heading-5, 16px);
    line-height: var(--ant-line-height-heading-5, 1.5);
  }

  /* Title with type */
  :global(.ant-typography-title.ant-typography-secondary) {
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
  }

  :global(.ant-typography-title.ant-typography-success) {
    color: var(--ant-color-success, #52c41a);
  }

  :global(.ant-typography-title.ant-typography-warning) {
    color: var(--ant-color-warning, #faad14);
  }

  :global(.ant-typography-title.ant-typography-danger) {
    color: var(--ant-color-error, #ff4d4f);
  }
</style>
