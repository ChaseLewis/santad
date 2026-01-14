<script lang="ts" module>
  import type { ParagraphProps } from './types';

  export type { ParagraphProps };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { ParagraphProps as Props } from './types';

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
    const cls = [prefixCls, `${prefixCls}-paragraph`];

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

<div
  class={classes}
  {style}
  onclick={disabled ? undefined : onclick}
  role={onclick && !disabled ? 'button' : undefined}
  tabindex={onclick && !disabled ? 0 : undefined}
  {...restProps}
>{@render withStrong()}</div>

<style global lang="css">
  /* ==================== Paragraph Styles ==================== */
  :global(.ant-typography-paragraph) {
    margin-bottom: 1em;
  }
</style>
