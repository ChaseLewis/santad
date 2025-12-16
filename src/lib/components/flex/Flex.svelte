<script lang="ts" module>
  import type { FlexProps, FlexClassNames, FlexStyles } from './types';

  export type { FlexProps, FlexClassNames, FlexStyles };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import { getGapValue, type FlexProps as Props } from './types';

  let {
    vertical = false,
    wrap = false,
    justify = 'normal',
    align = 'normal',
    flex,
    gap,
    component = 'div',
    prefixCls: customPrefixCls,
    class: className = '',
    classNames = {},
    style: customStyle = '',
    styles = {},
    children,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('flex'));

  // Compute flex-wrap value
  const wrapValue = $derived.by(() => {
    if (wrap === true) return 'wrap';
    if (wrap === false) return 'nowrap';
    return wrap;
  });

  // Compute class names
  const classes = $derived.by(() => {
    const cls = [prefixCls];

    if (vertical) {
      cls.push(`${prefixCls}-vertical`);
    }

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

  // Compute inline styles - using inline styles for gap allows CSS variables to work at runtime
  const inlineStyle = $derived.by(() => {
    const styleList: string[] = [];

    // Justify content
    if (justify && justify !== 'normal') {
      styleList.push(`justify-content: ${justify}`);
    }

    // Align items
    if (align && align !== 'normal') {
      styleList.push(`align-items: ${align}`);
    }

    // Flex
    if (flex !== undefined) {
      styleList.push(`flex: ${flex}`);
    }

    // Gap - always use inline style with CSS variable support
    if (gap !== undefined) {
      const gapValue = getGapValue(gap);
      if (gapValue) {
        styleList.push(`gap: ${gapValue}`);
      }
    }

    // Wrap
    if (wrapValue !== 'nowrap') {
      styleList.push(`flex-wrap: ${wrapValue}`);
    }

    // Custom styles
    if (customStyle) {
      styleList.push(customStyle);
    }

    // Semantic root styles
    if (styles.root) {
      styleList.push(styles.root);
    }

    return styleList.join('; ');
  });
</script>

<svelte:element this={component} class={classes} style={inlineStyle} {...restProps}>
  {@render children()}
</svelte:element>

<style>
  :global(.ant-flex) {
    display: flex;
  }

  :global(.ant-flex-vertical) {
    flex-direction: column;
  }

  /* RTL support */
  :global(.ant-flex-rtl) {
    direction: rtl;
  }
</style>
