<script lang="ts" module>
  import type { VirtualListProps, VirtualListItemContext } from './types';

  export type { VirtualListProps, VirtualListItemContext };
</script>

<script lang="ts" generics="T">
  import { getConfigContext } from '../../config/context.svelte';
  import type { VirtualListProps as Props } from './types';

  let {
    items,
    itemHeight,
    height,
    width = '100%',
    overscan = 3,
    renderItem,
    getKey,
    onLoadMore,
    loadMoreThreshold = 100,
    loading = false,
    loadingIndicator,
    prefixCls: customPrefixCls,
    class: className = '',
    classNames = {},
    styles = {},
  }: Props<T> = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('virtual-list'));

  // Container ref
  let containerRef: HTMLDivElement | null = $state(null);

  // Scroll state
  let scrollTop = $state(0);

  // Total height of all items
  const totalHeight = $derived(items.length * itemHeight);

  // Calculate visible range with overscan
  const visibleRange = $derived.by(() => {
    const visibleCount = Math.ceil(height / itemHeight);
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(items.length - 1, startIndex + visibleCount + overscan * 2);
    return { startIndex, endIndex };
  });

  // Visible items with positioning
  const visibleItems = $derived.by(() => {
    const { startIndex, endIndex } = visibleRange;
    const result: Array<{ item: T; index: number; style: string; key: string | number }> = [];

    for (let i = startIndex; i <= endIndex; i++) {
      if (i < items.length) {
        const item = items[i];
        const top = i * itemHeight;
        result.push({
          item,
          index: i,
          style: `position: absolute; top: ${top}px; left: 0; right: 0; height: ${itemHeight}px;`,
          key: getKey ? getKey(item, i) : i,
        });
      }
    }

    return result;
  });

  // Handle scroll
  function handleScroll(e: Event) {
    const target = e.target as HTMLDivElement;
    scrollTop = target.scrollTop;

    // Check if we need to load more
    if (onLoadMore && !loading) {
      const scrollBottom = totalHeight - scrollTop - height;
      if (scrollBottom < loadMoreThreshold) {
        onLoadMore();
      }
    }
  }

  // Compute container width style
  const widthStyle = $derived(typeof width === 'number' ? `${width}px` : width);

  // Compute class names
  const rootClasses = $derived.by(() => {
    const cls = [prefixCls];
    if (className) cls.push(className);
    if (classNames.root) cls.push(classNames.root);
    return cls.join(' ');
  });

  const contentClasses = $derived.by(() => {
    const cls = [`${prefixCls}-content`];
    if (classNames.content) cls.push(classNames.content);
    return cls.join(' ');
  });

  const itemClasses = $derived.by(() => {
    const cls = [`${prefixCls}-item`];
    if (classNames.item) cls.push(classNames.item);
    return cls.join(' ');
  });

  // Public methods to scroll
  export function scrollTo(offset: number) {
    if (containerRef) {
      containerRef.scrollTop = offset;
    }
  }

  export function scrollToIndex(index: number, align: 'start' | 'center' | 'end' = 'start') {
    if (containerRef) {
      let offset = index * itemHeight;
      if (align === 'center') {
        offset -= (height - itemHeight) / 2;
      } else if (align === 'end') {
        offset -= height - itemHeight;
      }
      containerRef.scrollTop = Math.max(0, offset);
    }
  }
</script>

<div
  bind:this={containerRef}
  class={rootClasses}
  style="height: {height}px; width: {widthStyle}; overflow-y: auto; overflow-x: hidden; position: relative; {styles.root ?? ''}"
  onscroll={handleScroll}
  role="list"
  tabindex="0"
>
  <div
    class={contentClasses}
    style="height: {totalHeight}px; position: relative; {styles.content ?? ''}"
  >
    {#each visibleItems as { item, index, style, key } (key)}
      <div 
        class={itemClasses} 
        style="{style} {styles.item ?? ''}"
        role="listitem"
      >
        {@render renderItem({ item, index, style })}
      </div>
    {/each}
  </div>

  {#if loading && loadingIndicator}
    <div class="{prefixCls}-loading">
      {@render loadingIndicator()}
    </div>
  {:else if loading}
    <div class="{prefixCls}-loading">
      <div class="{prefixCls}-loading-spinner"></div>
    </div>
  {/if}
</div>

<style>
  :global(.ant-virtual-list) {
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: var(--ant-color-border, #d9d9d9) transparent;
  }

  :global(.ant-virtual-list::-webkit-scrollbar) {
    width: 8px;
  }

  :global(.ant-virtual-list::-webkit-scrollbar-track) {
    background: transparent;
  }

  :global(.ant-virtual-list::-webkit-scrollbar-thumb) {
    background-color: var(--ant-color-border, #d9d9d9);
    border-radius: 4px;
  }

  :global(.ant-virtual-list::-webkit-scrollbar-thumb:hover) {
    background-color: var(--ant-color-text-quaternary, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-virtual-list:focus-visible) {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--ant-color-primary, #1677ff);
  }

  :global(.ant-virtual-list-content) {
    width: 100%;
  }

  :global(.ant-virtual-list-item) {
    box-sizing: border-box;
    will-change: transform;
  }

  :global(.ant-virtual-list-loading) {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: linear-gradient(to bottom, transparent, var(--ant-color-bg-container, #fff) 50%);
  }

  :global(.ant-virtual-list-loading-spinner) {
    width: 24px;
    height: 24px;
    border: 2px solid var(--ant-color-border, #d9d9d9);
    border-top-color: var(--ant-color-primary, #1677ff);
    border-radius: 50%;
    animation: ant-virtual-list-spin 0.8s linear infinite;
  }

  @keyframes ant-virtual-list-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

