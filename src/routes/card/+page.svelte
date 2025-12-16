<script lang="ts">
  import { Card, Button, Flex, TabPane } from '$lib';

  let cardLoading = $state(true);

  setTimeout(() => {
    cardLoading = false;
  }, 3000);
</script>

{#snippet settingAction()}
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a442.5 442.5 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 37.9-4.6 57 0 19.2 1.5 38.4 4.6 57l-66.3 56.6a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L #702.8l6.6 40.1zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"/>
  </svg>
{/snippet}

{#snippet editAction()}
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"/>
  </svg>
{/snippet}

{#snippet ellipsisAction()}
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"/>
  </svg>
{/snippet}

<div class="component-page">
  <header class="page-header">
    <h1>Card</h1>
    <p class="description">A container for displaying content in a rectangular container.</p>
  </header>

  <section class="demo-section">
    <h2>Basic</h2>
    <p class="section-desc">A basic card containing a title, content and an extra corner content.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap>
        <Card title="Card Title" style="width: 300px;">
          {#snippet body()}
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          {/snippet}
        </Card>

        <Card title="Card with Extra" style="width: 300px;">
          {#snippet extra()}
            <Button type="link" size="small">More</Button>
          {/snippet}
          {#snippet body()}
            <p>Card content with extra actions in the header.</p>
          {/snippet}
        </Card>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Hoverable</h2>
    <p class="section-desc">The hoverable card will get raised when the user hovers over it.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap>
        <Card title="Hoverable" hoverable style="width: 240px;">
          {#snippet body()}
            <p>Hover over this card to see the effect.</p>
          {/snippet}
        </Card>

        <Card hoverable style="width: 240px;">
          {#snippet cover()}
            <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
          {/snippet}
          {#snippet body()}
            <p style="margin: 0;"><strong>Europe Street Beat</strong></p>
            <p style="margin: 0; color: var(--ant-color-text-secondary);">www.instagram.com</p>
          {/snippet}
        </Card>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Size</h2>
    <p class="section-desc">Cards can have two sizes: default and small.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap>
        <Card title="Default Size" style="width: 300px;">
          {#snippet body()}
            <p>Default sized card with standard padding.</p>
          {/snippet}
        </Card>

        <Card title="Small Size" size="small" style="width: 300px;">
          {#snippet body()}
            <p>Small sized card with reduced padding.</p>
          {/snippet}
        </Card>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Loading</h2>
    <p class="section-desc">Shows a loading indicator while the content of the card is being loaded.</p>
    
    <div class="demo-box">
      <Card title="Loading Card" loading={cardLoading} style="width: 300px;">
        {#snippet body()}
          <p>This content appears after loading completes.</p>
          <p>Wait 3 seconds to see the content.</p>
        {/snippet}
      </Card>
    </div>
  </section>

  <section class="demo-section">
    <h2>Variants</h2>
    <p class="section-desc">Cards come in different variants: outlined (default) and borderless.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap align="start">
        <Card title="Outlined (default)" variant="outlined" style="width: 280px;">
          {#snippet body()}
            <p>Default outlined card with visible border.</p>
          {/snippet}
        </Card>

        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <Card title="Borderless" variant="borderless" style="width: 280px;">
            {#snippet body()}
              <p>A borderless card, ideal for colored backgrounds.</p>
            {/snippet}
          </Card>
        </div>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>With Cover</h2>
    <p class="section-desc">A Card that displays an image at the top using the cover slot.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap>
        <Card style="width: 300px;">
          {#snippet cover()}
            <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
          {/snippet}
          {#snippet body()}
            <p><strong>Card with Cover Image</strong></p>
            <p style="color: var(--ant-color-text-secondary);">The cover slot renders above the card body.</p>
          {/snippet}
        </Card>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>With Actions</h2>
    <p class="section-desc">Cards can have action buttons in the footer using the actions prop.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap>
        <Card style="width: 300px;" actions={[settingAction, editAction, ellipsisAction]}>
          {#snippet cover()}
            <img draggable={false} alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
          {/snippet}
          {#snippet body()}
            <Flex gap="small" align="center">
              <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" alt="avatar" style="width: 40px; height: 40px; border-radius: 50%;" />
              <div>
                <p style="margin: 0; font-weight: 500;">Card title</p>
                <p style="margin: 0; color: var(--ant-color-text-secondary); font-size: 12px;">This is the description</p>
              </div>
            </Flex>
          {/snippet}
        </Card>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>With Tabs</h2>
    <p class="section-desc">Cards can contain tabs by using TabPane components as children. The Card automatically creates a tab context.</p>
    
    <div class="demo-box">
      <Flex vertical gap="large">
        <Card title="Card title" defaultActiveTabKey="tab1">
          {#snippet extra()}
            <Button type="link" size="small" href="#more">More</Button>
          {/snippet}
          {#snippet body()}
            <TabPane key="tab1" label="tab1">
              <p>content1</p>
            </TabPane>
            <TabPane key="tab2" label="tab2">
              <p>content2</p>
            </TabPane>
          {/snippet}
        </Card>

        <Card defaultActiveTabKey="app">
          {#snippet body()}
            <TabPane key="article" label="article">
              <p>article content</p>
            </TabPane>
            <TabPane key="app" label="app">
              <p>app content</p>
            </TabPane>
            <TabPane key="project" label="project">
              <p>project content</p>
            </TabPane>
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

  p {
    margin: 0 0 8px;
  }

  p:last-child {
    margin-bottom: 0;
  }
</style>

