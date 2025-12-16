<script lang="ts">
  import { Flex } from '$lib';
</script>

<div class="component-page">
  <header class="page-header">
    <h1>Flex</h1>
    <p class="description">A flex layout container component.</p>
  </header>

  <section class="demo-section">
    <h2>Basic</h2>
    <p class="section-desc">The basic usage of flex container.</p>
    
    <div class="demo-box">
      <Flex gap="middle">
        <div class="box">1</div>
        <div class="box">2</div>
        <div class="box">3</div>
        <div class="box">4</div>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Vertical</h2>
    <p class="section-desc">Use vertical prop to control the direction.</p>
    
    <div class="demo-box">
      <Flex vertical gap="small">
        <div class="box">1</div>
        <div class="box">2</div>
        <div class="box">3</div>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Justify & Align</h2>
    <p class="section-desc">Set justify and align to control the layout.</p>
    
    <div class="demo-box">
      <Flex justify="space-between" align="center" style="height: 100px; background: var(--ant-color-fill-tertiary); padding: 0 16px; border-radius: 6px;">
        <div class="box">Start</div>
        <div class="box" style="height: 60px;">Tall</div>
        <div class="box">End</div>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Gap</h2>
    <p class="section-desc">Set gap to adjust the space between items. Supports small, middle, large or custom pixel values.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: var(--ant-color-text-secondary);">small (8px)</p>
          <Flex gap="small" style="background: var(--ant-color-fill-tertiary); padding: 12px; border-radius: 6px;">
            <div class="box">1</div>
            <div class="box">2</div>
            <div class="box">3</div>
          </Flex>
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: var(--ant-color-text-secondary);">middle (16px)</p>
          <Flex gap="middle" style="background: var(--ant-color-fill-tertiary); padding: 12px; border-radius: 6px;">
            <div class="box">1</div>
            <div class="box">2</div>
            <div class="box">3</div>
          </Flex>
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: var(--ant-color-text-secondary);">large (24px)</p>
          <Flex gap="large" style="background: var(--ant-color-fill-tertiary); padding: 12px; border-radius: 6px;">
            <div class="box">1</div>
            <div class="box">2</div>
            <div class="box">3</div>
          </Flex>
        </div>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Wrap</h2>
    <p class="section-desc">Auto wrap when items don't fit in one line.</p>
    
    <div class="demo-box">
      <div style="max-width: 300px; background: var(--ant-color-fill-tertiary); padding: 12px; border-radius: 6px;">
        <Flex wrap gap="small">
          <div class="box">Item 1</div>
          <div class="box">Item 2</div>
          <div class="box">Item 3</div>
          <div class="box">Item 4</div>
          <div class="box">Item 5</div>
          <div class="box">Item 6</div>
        </Flex>
      </div>
    </div>
  </section>

  <section class="demo-section">
    <h2>Flex Grow</h2>
    <p class="section-desc">Use flex property on children to control how they grow.</p>
    
    <div class="demo-box">
      <Flex gap="small">
        <div class="box" style="flex: 1;">Flex 1</div>
        <div class="box" style="flex: 2;">Flex 2</div>
        <div class="box" style="flex: 1;">Flex 1</div>
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

  .box {
    background: var(--ant-color-primary);
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

