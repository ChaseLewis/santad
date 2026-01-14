<script lang="ts" module>
  import type { CheckableTagProps } from './types';

  export type { CheckableTagProps };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { CheckableTagProps as Props } from './types';

  let {
    checked,
    onchange,
    onclick,
    icon,
    disabled = false,
    prefixCls: customPrefixCls,
    class: className = '',
    style = '',
    children,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('tag'));

  // Handle click
  function handleClick(e: MouseEvent) {
    if (disabled) return;
    onchange?.(!checked);
    onclick?.(e);
  }

  // Compute class names
  const classes = $derived.by(() => {
    const cls = [prefixCls, `${prefixCls}-checkable`];

    if (checked) {
      cls.push(`${prefixCls}-checkable-checked`);
    }

    if (disabled) {
      cls.push(`${prefixCls}-checkable-disabled`);
    }

    if (className) {
      cls.push(className);
    }

    return cls.join(' ');
  });
</script>

<span
  class={classes}
  {style}
  role="checkbox"
  aria-checked={checked}
  aria-disabled={disabled}
  tabindex={disabled ? -1 : 0}
  onclick={handleClick}
  onkeydown={(e) => e.key === 'Enter' && handleClick(e as unknown as MouseEvent)}
  {...restProps}
>
  {#if icon}
    {@render icon()}
  {/if}
  {#if children}
    <span>{@render children()}</span>
  {/if}
</span>

