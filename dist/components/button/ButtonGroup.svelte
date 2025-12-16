<script lang="ts" module>
  import type { ButtonGroupProps } from './types';

  export type { ButtonGroupProps };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { ButtonGroupProps as Props } from './types';

  let {
    size,
    class: className = '',
    children,
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(config.getPrefixCls('btn-group'));

  // Compute class names
  const classes = $derived.by(() => {
    const cls = [prefixCls];

    if (size === 'large') {
      cls.push(`${prefixCls}-lg`);
    } else if (size === 'small') {
      cls.push(`${prefixCls}-sm`);
    }

    if (config.direction === 'rtl') {
      cls.push(`${prefixCls}-rtl`);
    }

    if (className) {
      cls.push(className);
    }

    return cls.join(' ');
  });
</script>

<div class={classes} role="group">
  {@render children()}
</div>

<style>
  :global(.ant-btn-group) {
    position: relative;
    display: inline-flex;
  }

  :global(.ant-btn-group) > :global(.ant-btn) {
    position: relative;
  }

  :global(.ant-btn-group) > :global(.ant-btn:not(:first-child)) {
    margin-inline-start: -1px;
  }

  /* Hide left border of middle and last buttons to prevent double borders */
  :global(.ant-btn-group) > :global(.ant-btn:not(:first-child):not(:hover):not(:focus):not(:active)) {
    border-inline-start-color: transparent;
  }

  :global(.ant-btn-group) > :global(.ant-btn:not(:first-child):not(:last-child)) {
    border-radius: 0;
  }

  :global(.ant-btn-group) > :global(.ant-btn:first-child:not(:last-child)) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :global(.ant-btn-group) > :global(.ant-btn:last-child:not(:first-child)) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  :global(.ant-btn-group) > :global(.ant-btn:hover),
  :global(.ant-btn-group) > :global(.ant-btn:focus),
  :global(.ant-btn-group) > :global(.ant-btn:active) {
    z-index: 1;
  }

  /* RTL */
  :global(.ant-btn-group-rtl) {
    direction: rtl;
  }
</style>

