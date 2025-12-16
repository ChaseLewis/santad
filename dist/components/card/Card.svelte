<script lang="ts" module>
  import type { CardProps, CardClassNames, CardStyles } from './types';

  export type { CardProps, CardClassNames, CardStyles };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { CardProps as Props } from './types';

  let {
    title,
    extra,
    cover,
    actions,
    size = 'default',
    variant = 'outlined',
    loading = false,
    hoverable = false,
    prefixCls: customPrefixCls,
    class: className = '',
    classNames = {},
    style: customStyle = '',
    styles = {},
    children,
    onclick,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('card'));

  // Merge size from props or config
  const mergedSize = $derived(size ?? config.size ?? 'default');

  // Compute class names
  const classes = $derived.by(() => {
    const cls = [prefixCls];

    // Size
    if (mergedSize === 'small') {
      cls.push(`${prefixCls}-small`);
    }

    // Variant
    if (variant === 'borderless') {
      cls.push(`${prefixCls}-borderless`);
    } else {
      cls.push(`${prefixCls}-bordered`);
    }

    // States
    if (loading) cls.push(`${prefixCls}-loading`);
    if (hoverable) cls.push(`${prefixCls}-hoverable`);

    // Has header
    if (title || extra) {
      cls.push(`${prefixCls}-has-header`);
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

  // Root inline style
  const rootStyle = $derived.by(() => {
    const styleList: string[] = [];
    if (customStyle) styleList.push(customStyle);
    if (styles.root) styleList.push(styles.root);
    return styleList.join('; ');
  });

  // Check if title is a string or snippet
  const isTitleString = $derived(typeof title === 'string');
</script>

<div
  class={classes}
  style={rootStyle}
  onclick={onclick}
  role={onclick ? 'button' : undefined}
  tabindex={onclick ? 0 : undefined}
  {...restProps}
>
  {#if title || extra}
    <div 
      class="{prefixCls}-head {classNames.header ?? ''}"
      style={styles.header}
    >
      <div class="{prefixCls}-head-wrapper">
        {#if title}
          <div 
            class="{prefixCls}-head-title {classNames.title ?? ''}"
            style={styles.title}
          >
            {#if isTitleString}
              {title}
            {:else if title}
              {@render title()}
            {/if}
          </div>
        {/if}
        {#if extra}
          <div 
            class="{prefixCls}-extra {classNames.extra ?? ''}"
            style={styles.extra}
          >
            {@render extra()}
          </div>
        {/if}
      </div>
    </div>
  {/if}

  {#if cover}
    <div 
      class="{prefixCls}-cover {classNames.cover ?? ''}"
      style={styles.cover}
    >
      {@render cover()}
    </div>
  {/if}

  <div 
    class="{prefixCls}-body {classNames.body ?? ''}"
    style={styles.body}
  >
    {#if loading}
      <div class="{prefixCls}-loading-content">
        <div class="{prefixCls}-loading-block" style="width: 94%"></div>
        <div class="{prefixCls}-loading-block" style="width: 28%"></div>
        <div class="{prefixCls}-loading-block" style="width: 62%"></div>
        <div class="{prefixCls}-loading-block" style="width: 22%"></div>
        <div class="{prefixCls}-loading-block" style="width: 76%"></div>
      </div>
    {:else if children}
      {@render children()}
    {/if}
  </div>

  {#if actions && actions.length > 0}
    <ul 
      class="{prefixCls}-actions {classNames.actions ?? ''}"
      style={styles.actions}
    >
      {#each actions as action, i}
        <li style="width: {100 / actions.length}%">
          <span>{@render action()}</span>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  :global(.ant-card) {
    position: relative;
    background-color: var(--ant-color-bg-container, #ffffff);
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.5714285714285714;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  :global(.ant-card-bordered) {
    border: 1px solid var(--ant-color-border-secondary, #f0f0f0);
  }

  :global(.ant-card-borderless) {
    border: none;
  }

  :global(.ant-card-hoverable) {
    cursor: pointer;
  }

  :global(.ant-card-hoverable:hover) {
    border-color: transparent;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
                0 3px 6px 0 rgba(0, 0, 0, 0.12),
                0 5px 12px 4px rgba(0, 0, 0, 0.09);
  }

  /* Header */
  :global(.ant-card-head) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 56px;
    margin-bottom: -1px;
    padding: 0 24px;
    color: var(--ant-color-text-heading, rgba(0, 0, 0, 0.88));
    font-weight: 600;
    font-size: 16px;
    background: transparent;
    border-bottom: 1px solid var(--ant-color-border-secondary, #f0f0f0);
    border-radius: 8px 8px 0 0;
  }

  :global(.ant-card-head-wrapper) {
    display: flex;
    align-items: center;
    width: 100%;
  }

  :global(.ant-card-head-title) {
    flex: 1;
    padding: 16px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  :global(.ant-card-extra) {
    margin-inline-start: auto;
    padding: 16px 0;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    font-weight: 400;
    font-size: 14px;
  }

  /* Cover */
  :global(.ant-card-cover) {
    margin-top: -1px;
    margin-inline: -1px;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
  }

  :global(.ant-card-cover > *) {
    display: block;
    width: 100%;
  }

  :global(.ant-card-cover img) {
    display: block;
    width: 100%;
    border-radius: 8px 8px 0 0;
  }

  /* Body */
  :global(.ant-card-body) {
    padding: 24px;
  }

  :global(.ant-card-body::before),
  :global(.ant-card-body::after) {
    display: table;
    content: '';
  }

  :global(.ant-card-body::after) {
    clear: both;
  }

  /* Loading */
  :global(.ant-card-loading .ant-card-body) {
    overflow: hidden;
  }

  :global(.ant-card-loading-content) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  :global(.ant-card-loading-block) {
    height: 14px;
    background: linear-gradient(90deg, 
      rgba(0, 0, 0, 0.06) 25%, 
      rgba(0, 0, 0, 0.15) 37%, 
      rgba(0, 0, 0, 0.06) 63%);
    background-size: 400% 100%;
    border-radius: 4px;
    animation: ant-card-loading 1.4s ease infinite;
  }

  @keyframes ant-card-loading {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }

  /* Actions */
  :global(.ant-card-actions) {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    background: var(--ant-color-bg-container, #ffffff);
    border-top: 1px solid var(--ant-color-border-secondary, #f0f0f0);
    border-radius: 0 0 8px 8px;
  }

  :global(.ant-card-actions > li) {
    float: left;
    margin: 12px 0;
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
    text-align: center;
  }

  :global(.ant-card-actions > li:not(:last-child)) {
    border-inline-end: 1px solid var(--ant-color-border-secondary, #f0f0f0);
  }

  :global(.ant-card-actions > li > span) {
    display: inline-block;
    min-width: 32px;
    font-size: 14px;
    line-height: 1.5714285714285714;
    cursor: pointer;
    transition: color 0.2s;
  }

  :global(.ant-card-actions > li > span:hover) {
    color: var(--ant-color-primary, #1677ff);
  }

  /* Small size */
  :global(.ant-card-small) {
    font-size: 14px;
  }

  :global(.ant-card-small > .ant-card-head) {
    min-height: 38px;
    padding: 0 12px;
    font-size: 14px;
  }

  :global(.ant-card-small > .ant-card-head > .ant-card-head-wrapper > .ant-card-head-title) {
    padding: 8px 0;
  }

  :global(.ant-card-small > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra) {
    padding: 8px 0;
    font-size: 14px;
  }

  :global(.ant-card-small > .ant-card-body) {
    padding: 12px;
  }

  /* RTL */
  :global(.ant-card-rtl) {
    direction: rtl;
  }
</style>

