<script lang="ts" module>
  import type { VirtualGridProps, VirtualGridCellContext } from './types';

  export type { VirtualGridProps, VirtualGridCellContext };
</script>

<script lang="ts" generics="T">
  import { getConfigContext } from '../../config/context.svelte';
  import type { VirtualGridProps as Props } from './types';

  let {
    items,
    cellWidth,
    cellHeight,
    height,
    width,
    columns: columnsProp,
    gap = 0,
    justify = 'space-evenly',
    padding = 0,
    overscan = 2,
    renderCell,
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
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('virtual-grid'));

  // Container ref
  let containerRef: HTMLDivElement | null = $state(null);

  // Scroll state
  let scrollTop = $state(0);

  // Derive padding values
  const paddingX = $derived(typeof padding === 'number' ? padding : (padding.x ?? 0));
  const paddingY = $derived(typeof padding === 'number' ? padding : (padding.y ?? 0));

  // Available width for content (excluding padding)
  const contentAreaWidth = $derived(width - paddingX * 2);

  // Calculate number of columns (use minimum gap for column calculation)
  const columns = $derived(columnsProp ?? Math.floor((contentAreaWidth + gap) / (cellWidth + gap)));

  // Total number of rows
  const totalRows = $derived(Math.ceil(items.length / columns));

  // Row height including gap
  const rowHeightWithGap = $derived(cellHeight + gap);

  // Total content height (including vertical padding)
  const totalHeight = $derived(totalRows * rowHeightWithGap - gap + paddingY * 2);

  // Calculate horizontal spacing based on justify mode
  // The `gap` prop is respected as a minimum gap between items
  const horizontalSpacing = $derived.by(() => {
    const totalCellWidth = columns * cellWidth;
    const minGapSpace = (columns - 1) * gap; // Minimum space needed for gaps between items
    const availableSpace = contentAreaWidth - totalCellWidth;
    
    switch (justify) {
      case 'space-evenly': {
        // Equal gaps on edges and between items, respecting minimum gap
        // Total gaps = columns + 1 (edges + between)
        const idealGap = availableSpace / (columns + 1);
        if (idealGap >= gap) {
          // Enough space - distribute evenly
          return { edgeGap: paddingX + idealGap, itemGap: idealGap };
        } else {
          // Not enough space for even distribution with min gap
          // Use min gap between items, center the remaining space
          const remainingSpace = availableSpace - minGapSpace;
          const edgeGap = Math.max(0, remainingSpace / 2);
          return { edgeGap: paddingX + edgeGap, itemGap: gap };
        }
      }
      case 'space-between': {
        // Items at edges, equal gaps between, respecting minimum gap
        if (columns <= 1) {
          return { edgeGap: paddingX + availableSpace / 2, itemGap: 0 };
        }
        const idealGap = availableSpace / (columns - 1);
        const itemGap = Math.max(gap, idealGap);
        // If we're using min gap, center the extra space
        if (idealGap < gap) {
          const usedSpace = (columns - 1) * gap;
          const remainingSpace = availableSpace - usedSpace;
          return { edgeGap: paddingX + Math.max(0, remainingSpace / 2), itemGap: gap };
        }
        return { edgeGap: paddingX, itemGap: itemGap };
      }
      case 'center': {
        // Fixed gap between items, centered content
        const contentWidth = columns * cellWidth + (columns - 1) * gap;
        const edgeGap = Math.max(0, (contentAreaWidth - contentWidth) / 2);
        return { edgeGap: paddingX + edgeGap, itemGap: gap };
      }
      case 'start':
      default: {
        // Fixed gap, left-aligned
        return { edgeGap: paddingX, itemGap: gap };
      }
    }
  });

  // Calculate visible row range with overscan (accounting for top padding)
  const visibleRange = $derived.by(() => {
    const visibleRowCount = Math.ceil(height / rowHeightWithGap);
    const adjustedScrollTop = Math.max(0, scrollTop - paddingY);
    const startRow = Math.max(0, Math.floor(adjustedScrollTop / rowHeightWithGap) - overscan);
    const endRow = Math.min(totalRows - 1, startRow + visibleRowCount + overscan * 2);
    return { startRow, endRow };
  });

  // Visible cells with positioning
  const visibleCells = $derived.by(() => {
    const { startRow, endRow } = visibleRange;
    const result: Array<{
      item: T;
      rowIndex: number;
      columnIndex: number;
      index: number;
      style: string;
      key: string | number;
    }> = [];

    const { edgeGap, itemGap } = horizontalSpacing;
    
    for (let row = startRow; row <= endRow; row++) {
      for (let col = 0; col < columns; col++) {
        const index = row * columns + col;
        if (index < items.length) {
          const item = items[index];
          const top = paddingY + row * rowHeightWithGap;
          const left = edgeGap + col * (cellWidth + itemGap);
          result.push({
            item,
            rowIndex: row,
            columnIndex: col,
            index,
            style: `position: absolute; top: ${top}px; left: ${left}px; width: ${cellWidth}px; height: ${cellHeight}px;`,
            key: getKey ? getKey(item, index) : index,
          });
        }
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

  const cellClasses = $derived.by(() => {
    const cls = [`${prefixCls}-cell`];
    if (classNames.cell) cls.push(classNames.cell);
    return cls.join(' ');
  });

  // Public methods to scroll
  export function scrollTo(offset: number) {
    if (containerRef) {
      containerRef.scrollTop = offset;
    }
  }

  export function scrollToRow(rowIndex: number, align: 'start' | 'center' | 'end' = 'start') {
    if (containerRef) {
      let offset = rowIndex * rowHeightWithGap;
      if (align === 'center') {
        offset -= (height - cellHeight) / 2;
      } else if (align === 'end') {
        offset -= height - cellHeight;
      }
      containerRef.scrollTop = Math.max(0, offset);
    }
  }

  export function scrollToIndex(index: number, align: 'start' | 'center' | 'end' = 'start') {
    const rowIndex = Math.floor(index / columns);
    scrollToRow(rowIndex, align);
  }
</script>

<div
  bind:this={containerRef}
  class={rootClasses}
  style="height: {height}px; width: {width}px; overflow: auto; position: relative; {styles.root ?? ''}"
  onscroll={handleScroll}
  role="grid"
  tabindex="0"
  aria-rowcount={totalRows}
  aria-colcount={columns}
>
  <div
    class={contentClasses}
    style="height: {totalHeight}px; width: 100%; position: relative; {styles.content ?? ''}"
  >
    {#each visibleCells as { item, rowIndex, columnIndex, index, style, key } (key)}
      <div 
        class={cellClasses} 
        style="{style} {styles.cell ?? ''}"
        role="gridcell"
        aria-rowindex={rowIndex + 1}
        aria-colindex={columnIndex + 1}
      >
        {@render renderCell({ item, rowIndex, columnIndex, index, style })}
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
  :global(.ant-virtual-grid) {
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: var(--ant-color-border, #d9d9d9) transparent;
  }

  :global(.ant-virtual-grid::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(.ant-virtual-grid::-webkit-scrollbar-track) {
    background: transparent;
  }

  :global(.ant-virtual-grid::-webkit-scrollbar-thumb) {
    background-color: var(--ant-color-border, #d9d9d9);
    border-radius: 4px;
  }

  :global(.ant-virtual-grid::-webkit-scrollbar-thumb:hover) {
    background-color: var(--ant-color-text-quaternary, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-virtual-grid::-webkit-scrollbar-corner) {
    background: transparent;
  }

  :global(.ant-virtual-grid:focus-visible) {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--ant-color-primary, #1677ff);
  }

  :global(.ant-virtual-grid-content) {
    box-sizing: border-box;
  }

  :global(.ant-virtual-grid-cell) {
    box-sizing: border-box;
    will-change: transform;
  }

  :global(.ant-virtual-grid-loading) {
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

  :global(.ant-virtual-grid-loading-spinner) {
    width: 24px;
    height: 24px;
    border: 2px solid var(--ant-color-border, #d9d9d9);
    border-top-color: var(--ant-color-primary, #1677ff);
    border-radius: 50%;
    animation: ant-virtual-grid-spin 0.8s linear infinite;
  }

  @keyframes ant-virtual-grid-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

