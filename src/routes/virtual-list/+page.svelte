<script lang="ts">
  import { VirtualList, Button, Flex, Card } from '$lib';

  // Generate sample data
  function generateItems(count: number, startIndex = 0) {
    return Array.from({ length: count }, (_, i) => ({
      id: startIndex + i,
      title: `Item ${startIndex + i + 1}`,
      description: `This is the description for item ${startIndex + i + 1}`,
      color: `hsl(${(startIndex + i) * 7 % 360}, 75%, 50%)`,
    }));
  }

  let items = $state(generateItems(10000));
  let loadingMoreItems = $state(generateItems(100));
  let isLoading = $state(false);

  // Infinite scroll demo
  function handleLoadMore() {
    if (isLoading) return;
    isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      const newItems = generateItems(50, loadingMoreItems.length);
      loadingMoreItems = [...loadingMoreItems, ...newItems];
      isLoading = false;
    }, 1000);
  }

  // Ref for programmatic scrolling
  let listRef: { scrollToIndex: (index: number, align?: 'start' | 'center' | 'end') => void } | undefined;

  function scrollToMiddle() {
    listRef?.scrollToIndex(5000, 'center');
  }

  function scrollToEnd() {
    listRef?.scrollToIndex(items.length - 1, 'end');
  }
</script>

{#snippet basicItem(ctx: { item: typeof items[0]; index: number; style: string })}
  <div class="list-item" style="background: {ctx.item.color};">
    <div class="item-content">
      <span class="item-index">#{ctx.index + 1}</span>
      <div class="item-text">
        <strong>{ctx.item.title}</strong>
        <span>{ctx.item.description}</span>
      </div>
    </div>
  </div>
{/snippet}

{#snippet compactItem(ctx: { item: typeof items[0]; index: number; style: string })}
  <div class="list-item compact" style="background: {ctx.item.color};">
    <span class="compact-index">#{ctx.index + 1}</span>
    <span class="compact-title">{ctx.item.title}</span>
  </div>
{/snippet}

{#snippet infiniteItem(ctx: { item: typeof loadingMoreItems[0]; index: number; style: string })}
  <div class="list-item" style="background: {ctx.item.color};">
    <div class="item-content">
      <span class="item-index">#{ctx.index + 1}</span>
      <div class="item-text">
        <strong>{ctx.item.title}</strong>
        <span>{ctx.item.description}</span>
      </div>
    </div>
  </div>
{/snippet}

{#snippet loadingSpinner()}
  <Flex justify="center" align="center" gap="small">
    <span class="spinner"></span>
    <span>Loading more items...</span>
  </Flex>
{/snippet}

<div class="component-page">
  <header class="page-header">
    <h1>VirtualList</h1>
    <p class="description">A virtualized list component for efficiently rendering large datasets with fixed item heights.</p>
  </header>

  <section class="demo-section">
    <h2>Basic Usage</h2>
    <p class="section-desc">A simple virtual list with 10,000 items. Only visible items are rendered for optimal performance.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <Flex gap="small">
          <Button onclick={scrollToMiddle}>Scroll to Middle (Item 5000)</Button>
          <Button onclick={scrollToEnd}>Scroll to End</Button>
        </Flex>
        <div class="list-container">
          <VirtualList
            bind:this={listRef}
            {items}
            itemHeight={72}
            height={400}
            renderItem={basicItem}
            getKey={(item) => item.id}
          />
        </div>
        <p class="info-text">Rendering {items.length.toLocaleString()} items efficiently</p>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Infinite Scroll</h2>
    <p class="section-desc">Load more items automatically when scrolling near the bottom. Great for paginated data.</p>
    
    <div class="demo-box">
      <div class="list-container">
        <VirtualList
          items={loadingMoreItems}
          itemHeight={72}
          height={400}
          renderItem={infiniteItem}
          getKey={(item) => item.id}
          onLoadMore={handleLoadMore}
          loadMoreThreshold={200}
          loading={isLoading}
          loadingIndicator={loadingSpinner}
        />
      </div>
      <p class="info-text">
        {loadingMoreItems.length} items loaded • Scroll to bottom to load more
      </p>
    </div>
  </section>

  <section class="demo-section">
    <h2>Custom Styling</h2>
    <p class="section-desc">Apply custom styles using the classNames and styles props.</p>
    
    <div class="demo-box">
      <VirtualList
        items={items.slice(0, 500)}
        itemHeight={60}
        height={300}
        renderItem={basicItem}
        getKey={(item) => item.id}
        classNames={{ root: 'custom-list-root' }}
        styles={{ root: 'border-radius: 12px; border: 2px solid var(--ant-color-primary); overflow: hidden;' }}
      />
    </div>
  </section>

  <section class="demo-section">
    <h2>Different Sizes</h2>
    <p class="section-desc">Virtual lists can have different heights and widths to fit your layout.</p>
    
    <div class="demo-box">
      <Flex gap="large" wrap>
        <Card title="Compact List" style="width: 280px;">
          {#snippet body()}
            <VirtualList
              items={items.slice(0, 200)}
              itemHeight={36}
              height={200}
              renderItem={compactItem}
              getKey={(item) => item.id}
            />
          {/snippet}
        </Card>

        <Card title="Wide List" style="width: 400px;">
          {#snippet body()}
            <VirtualList
              items={items.slice(0, 200)}
              itemHeight={80}
              height={240}
              renderItem={basicItem}
              getKey={(item) => item.id}
            />
          {/snippet}
        </Card>
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

  .list-container {
    border: 1px solid var(--ant-color-border);
    border-radius: 8px;
    overflow: hidden;
  }

  .list-item {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    border-bottom: 1px solid var(--ant-color-border-secondary);
    box-sizing: border-box;
  }

  .item-content {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
  }

  .item-index {
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    min-width: 50px;
  }

  .item-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .item-text strong {
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .item-text span {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.85);
  }

  /* Compact item styles */
  .list-item.compact {
    padding: 0 12px;
    gap: 8px;
  }

  .compact-index {
    font-size: 11px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    min-width: 36px;
  }

  .compact-title {
    font-size: 13px;
    font-weight: 500;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  :global(.custom-list-root) {
    background: linear-gradient(135deg, var(--ant-color-primary-bg) 0%, var(--ant-color-bg-container) 100%);
  }
</style>

