<script lang="ts">
  import { Card, Button, Flex } from '$lib';

  let cardLoading = $state(true);

  setTimeout(() => {
    cardLoading = false;
  }, 3000);
</script>

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
          {#snippet children()}
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          {/snippet}
        </Card>

        <Card title="Card with Extra" style="width: 300px;">
          {#snippet extra()}
            <Button type="link" size="small">More</Button>
          {/snippet}
          {#snippet children()}
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
          {#snippet children()}
            <p>Hover over this card to see the effect.</p>
          {/snippet}
        </Card>

        <Card hoverable style="width: 240px;">
          {#snippet cover()}
            <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
          {/snippet}
          {#snippet children()}
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
          {#snippet children()}
            <p>Default sized card with standard padding.</p>
          {/snippet}
        </Card>

        <Card title="Small Size" size="small" style="width: 300px;">
          {#snippet children()}
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
        {#snippet children()}
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
          {#snippet children()}
            <p>Default outlined card with visible border.</p>
          {/snippet}
        </Card>

        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <Card title="Borderless" variant="borderless" style="width: 280px;">
            {#snippet children()}
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
          {#snippet children()}
            <p><strong>Card with Cover Image</strong></p>
            <p style="color: var(--ant-color-text-secondary);">The cover slot renders above the card body.</p>
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

