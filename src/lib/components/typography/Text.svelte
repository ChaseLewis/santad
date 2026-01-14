<script lang="ts" module>
  import type { TextProps } from './types';

  export type { TextProps };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { TextProps as Props } from './types';

  let {
    type,
    disabled = false,
    strong = false,
    italic = false,
    underline = false,
    delete: del = false,
    code = false,
    mark = false,
    keyboard = false,
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
    const cls = [prefixCls];

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

{#snippet withKeyboard()}
  {#if keyboard}<kbd>{@render inner()}</kbd>{:else}{@render inner()}{/if}
{/snippet}

{#snippet withCode()}
  {#if code}<code>{@render withKeyboard()}</code>{:else}{@render withKeyboard()}{/if}
{/snippet}

{#snippet withMark()}
  {#if mark}<mark>{@render withCode()}</mark>{:else}{@render withCode()}{/if}
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

<span
  class={classes}
  {style}
  onclick={disabled ? undefined : onclick}
  role={onclick && !disabled ? 'button' : undefined}
  tabindex={onclick && !disabled ? 0 : undefined}
  {...restProps}
>{@render withStrong()}</span>

<style global lang="css">
  /* ==================== Base Typography Styles ==================== */
  :global(.ant-typography) {
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    overflow-wrap: break-word;
  }

  /* ==================== Type Variants ==================== */
  :global(.ant-typography-secondary) {
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
  }

  :global(.ant-typography-success) {
    color: var(--ant-color-success, #52c41a);
  }

  :global(.ant-typography-warning) {
    color: var(--ant-color-warning, #faad14);
  }

  :global(.ant-typography-danger) {
    color: var(--ant-color-error, #ff4d4f);
  }

  /* ==================== Disabled ==================== */
  :global(.ant-typography-disabled) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
    user-select: none;
  }

  /* ==================== Decorations ==================== */
  :global(.ant-typography code) {
    margin: 0 0.2em;
    padding: 0.2em 0.4em 0.1em;
    font-size: 85%;
    font-family: var(--ant-font-family-code, 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace);
    background: var(--ant-color-fill-tertiary, rgba(0, 0, 0, 0.04));
    border: 1px solid var(--ant-color-border, #d9d9d9);
    border-radius: var(--ant-border-radius-sm, 4px);
  }

  :global(.ant-typography kbd) {
    margin: 0 0.2em;
    padding: 0.15em 0.4em 0.1em;
    font-size: 90%;
    font-family: var(--ant-font-family-code, 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace);
    background: var(--ant-color-fill-tertiary, rgba(0, 0, 0, 0.04));
    border: 1px solid var(--ant-color-border, #d9d9d9);
    border-bottom-width: 2px;
    border-radius: var(--ant-border-radius-sm, 4px);
  }

  :global(.ant-typography mark) {
    padding: 0;
    background-color: var(--ant-color-warning-bg, #fffbe6);
  }

  :global(.ant-typography u) {
    text-decoration: underline;
    text-decoration-skip-ink: auto;
  }

  :global(.ant-typography del) {
    text-decoration: line-through;
  }

  :global(.ant-typography strong) {
    font-weight: 600;
  }

  :global(.ant-typography em) {
    font-style: italic;
  }

  /* ==================== RTL ==================== */
  :global(.ant-typography-rtl) {
    direction: rtl;
  }
</style>
