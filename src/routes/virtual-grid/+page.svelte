<script lang="ts">
  import { VirtualGrid, Button, Flex, Card } from '$lib';

  // Generate sample image data
  function generateGridItems(count: number, startIndex = 0) {
    return Array.from({ length: count }, (_, i) => ({
      id: startIndex + i,
      title: `Photo ${startIndex + i + 1}`,
      color: `hsl(${(startIndex + i) * 13 % 360}, 70%, 50%)`,
      seed: Math.floor(Math.random() * 1000),
    }));
  }

  let gridItems = $state(generateGridItems(5000));
  let infiniteGridItems = $state(generateGridItems(100));
  let isLoading = $state(false);

  // Infinite scroll demo
  function handleLoadMore() {
    if (isLoading) return;
    isLoading = true;
    
    setTimeout(() => {
      const newItems = generateGridItems(50, infiniteGridItems.length);
      infiniteGridItems = [...infiniteGridItems, ...newItems];
      isLoading = false;
    }, 1000);
  }

  // Ref for programmatic scrolling
  let gridRef: { scrollToIndex: (index: number, align?: 'start' | 'center' | 'end') => void } | undefined;

  function scrollToMiddle() {
    gridRef?.scrollToIndex(2500, 'center');
  }

  function scrollToEnd() {
    gridRef?.scrollToIndex(gridItems.length - 1, 'end');
  }
</script>

{#snippet gridCell(ctx: { item: typeof gridItems[0]; rowIndex: number; columnIndex: number; index: number; style: string })}
  <div class="grid-cell" style="background: {ctx.item.color};">
    <div class="cell-content">
      <div class="cell-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
      </div>
      <span class="cell-title">{ctx.item.title}</span>
      <span class="cell-index">#{ctx.index + 1}</span>
    </div>
  </div>
{/snippet}

{#snippet productCell(ctx: { item: typeof gridItems[0]; rowIndex: number; columnIndex: number; index: number; style: string })}
  <div class="product-cell">
    <div class="product-image" style="background: {ctx.item.color};">
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" opacity="0.5">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
      </svg>
    </div>
    <div class="product-info">
      <span class="product-name">{ctx.item.title}</span>
      <span class="product-price">${(ctx.index * 9.99 % 100).toFixed(2)}</span>
    </div>
  </div>
{/snippet}

{#snippet loadingSpinner()}
  <Flex justify="center" align="center" gap="small">
    <span class="spinner"></span>
    <span>Loading more...</span>
  </Flex>
{/snippet}

<div class="component-page">
  <header class="page-header">
    <h1>VirtualGrid</h1>
    <p class="description">A virtualized grid component for efficiently rendering large datasets with fixed cell dimensions.</p>
  </header>

  <section class="demo-section">
    <h2>Basic Usage</h2>
    <p class="section-desc">A virtual grid with 5,000 items. Only visible cells are rendered for optimal performance.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <Flex gap="small">
          <Button onclick={scrollToMiddle}>Scroll to Middle (Item 2500)</Button>
          <Button onclick={scrollToEnd}>Scroll to End</Button>
        </Flex>
        <div class="grid-container full-width">
          <VirtualGrid
            bind:this={gridRef}
            items={gridItems}
            cellWidth={120}
            cellHeight={120}
            width={850}
            height={400}
            gap={12}
            padding={16}
            renderCell={gridCell}
            getKey={(item) => item.id}
          />
        </div>
        <p class="info-text">Rendering {gridItems.length.toLocaleString()} items efficiently</p>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Infinite Scroll</h2>
    <p class="section-desc">Load more items automatically when scrolling near the bottom.</p>
    
    <div class="demo-box">
      <div class="grid-container full-width">
        <VirtualGrid
          items={infiniteGridItems}
          cellWidth={150}
          cellHeight={150}
          width={850}
          height={400}
          gap={12}
          padding={16}
          renderCell={gridCell}
          getKey={(item) => item.id}
          onLoadMore={handleLoadMore}
          loadMoreThreshold={200}
          loading={isLoading}
          loadingIndicator={loadingSpinner}
        />
      </div>
      <p class="info-text">
        {infiniteGridItems.length} items loaded • Scroll to bottom to load more
      </p>
    </div>
  </section>

  <section class="demo-section">
    <h2>Product Grid</h2>
    <p class="section-desc">A more realistic example showing a product catalog with larger cells.</p>
    
    <div class="demo-box">
      <div class="grid-container full-width product-grid">
        <VirtualGrid
          items={gridItems.slice(0, 1000)}
          cellWidth={180}
          cellHeight={220}
          width={850}
          height={500}
          gap={16}
          padding={16}
          renderCell={productCell}
          getKey={(item) => item.id}
        />
      </div>
    </div>
  </section>

  <section class="demo-section">
    <h2>Justify Modes</h2>
    <p class="section-desc">Control how items are distributed horizontally with the justify prop.</p>
    
    <div class="demo-box">
      <Flex gap="large" vertical>
        <div>
          <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">space-evenly (default) — Equal spacing, minimum 12px gap</h3>
          <div class="grid-container full-width">
            <VirtualGrid
              items={gridItems.slice(0, 100)}
              cellWidth={100}
              cellHeight={100}
              width={850}
              height={220}
              gap={12}
              padding={12}
              justify="space-evenly"
              renderCell={gridCell}
              getKey={(item) => item.id}
            />
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">space-between — Items at edges, minimum 12px gap</h3>
          <div class="grid-container full-width">
            <VirtualGrid
              items={gridItems.slice(0, 100)}
              cellWidth={100}
              cellHeight={100}
              width={850}
              height={220}
              gap={12}
              padding={12}
              justify="space-between"
              renderCell={gridCell}
              getKey={(item) => item.id}
            />
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">center — Fixed 16px gap, centered content</h3>
          <div class="grid-container full-width">
            <VirtualGrid
              items={gridItems.slice(0, 100)}
              cellWidth={100}
              cellHeight={100}
              width={850}
              height={220}
              gap={16}
              padding={12}
              justify="center"
              renderCell={gridCell}
              getKey={(item) => item.id}
            />
          </div>
        </div>
      </Flex>
    </div>
  </section>
</div>

<style>
  .component-page {
    max-width: 900px;
  }

  .page-header {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--ant-color-border-secondary);
  }

  .page-header h1 {
    margin: 0 0 8px;
    font-size: 32px;
    font-weight: 600;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  .page-header .description {
    margin: 0;
    font-size: 16px;
    color: var(--ant-color-text-secondary);
  }

  .demo-section {
    margin-bottom: 32px;
  }

  .demo-section h2 {
    margin: 0 0 8px;
    font-size: 20px;
    font-weight: 600;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  .section-desc {
    margin: 0 0 16px;
    color: var(--ant-color-text-secondary);
    font-size: 14px;
  }

  .demo-box {
    background: var(--ant-color-bg-container);
    border: 1px solid var(--ant-color-border-secondary);
    border-radius: 8px;
    padding: 24px;
  }

  .grid-container {
    border: 1px solid var(--ant-color-border);
    border-radius: 8px;
    overflow: hidden;
  }

  .grid-container.full-width {
    width: 100%;
  }

  .grid-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    box-sizing: border-box;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .grid-cell:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .cell-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
  }

  .cell-icon {
    color: rgba(255, 255, 255, 0.6);
  }

  .cell-title {
    font-size: 11px;
    font-weight: 600;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .cell-index {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.75);
  }

  /* Product cell styles */
  .product-cell {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: var(--ant-color-bg-container);
    border: 1px solid var(--ant-color-border);
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.2s ease;
    box-sizing: border-box;
  }

  .product-cell:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  .product-image {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.5);
  }

  .product-info {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: var(--ant-color-bg-container);
  }

  .product-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--ant-color-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-price {
    font-size: 14px;
    font-weight: 600;
    color: var(--ant-color-primary);
  }

  .info-text {
    margin: 8px 0 0;
    font-size: 12px;
    color: var(--ant-color-text-tertiary);
    text-align: center;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--ant-color-border);
    border-top-color: var(--ant-color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>

