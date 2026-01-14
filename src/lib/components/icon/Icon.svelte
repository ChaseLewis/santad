<script lang="ts" module>
  import type { IconProps } from './types';

  export type { IconProps };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { IconProps as Props } from './types';

  let {
    class: className = '',
    style = '',
    spin = false,
    rotate,
    tabindex,
    onclick,
    prefixCls: customPrefixCls,
    'aria-label': ariaLabel,
    children,
    ...restProps
  }: Props & { children?: import('svelte').Snippet } = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('icon'));

  // Compute class names
  const classes = $derived.by(() => {
    const cls = ['anticon', prefixCls];

    if (spin) {
      cls.push('anticon-spin');
    }

    if (className) {
      cls.push(className);
    }

    return cls.join(' ');
  });

  // Compute rotation style for inner SVG
  const svgStyle = $derived(
    rotate !== undefined ? `transform: rotate(${rotate}deg);` : ''
  );

  // Compute tabindex
  const computedTabindex = $derived(
    tabindex !== undefined ? tabindex : (onclick ? -1 : undefined)
  );
</script>

<span
  role="img"
  aria-label={ariaLabel}
  class={classes}
  style={[svgStyle, style].filter(Boolean).join(' ') || undefined}
  tabindex={computedTabindex}
  {onclick}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</span>

<style global lang="css">
  /* ==================== Base Icon Styles ==================== */
  /* Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4 */
  :global(.anticon) {
    display: inline-flex;
    align-items: center;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(.anticon > *) {
    line-height: 1;
  }

  :global(.anticon svg) {
    display: inline-block;
    vertical-align: inherit;
  }

  /* Improve SVG rendering quality */
  :global(.anticon svg path) {
    shape-rendering: geometricPrecision;
  }

  :global(.anticon::before) {
    display: none;
  }


  /* ==================== Interactive States ==================== */
  :global(.anticon[tabindex]) {
    cursor: pointer;
  }

  :global(.anticon[tabindex]:focus-visible) {
    outline: 2px solid var(--ant-color-primary, #1677ff);
    outline-offset: 1px;
    border-radius: 2px;
  }

  /* ==================== Spin Animation ==================== */
  :global(.anticon-spin) {
    display: inline-flex;
  }

  :global(.anticon-spin svg) {
    animation: loadingCircle 1s infinite linear;
    transform-origin: 50% 50%;
  }

  @keyframes -global-loadingCircle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

