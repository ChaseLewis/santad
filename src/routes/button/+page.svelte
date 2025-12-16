<script lang="ts">
  import { Button, ButtonGroup, Flex } from '$lib';

  let loading = $state(false);
  let customActive = $state(false);

  function simulateLoading() {
    loading = true;
    setTimeout(() => {
      loading = false;
    }, 2000);
  }
</script>

<div class="component-page">
  <header class="page-header">
    <h1>Button</h1>
    <p class="description">To trigger an operation.</p>
  </header>

  <section class="demo-section">
    <h2>Type</h2>
    <p class="section-desc">There are primary button, default button, dashed button, text button and link button.</p>
    
    <div class="demo-box">
      <Flex gap="small" wrap>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
        <Button type="link">Link</Button>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Size</h2>
    <p class="section-desc">Ant Design supports three button sizes: large, middle (default), and small.</p>
    
    <div class="demo-box">
      <Flex gap="small" align="center" wrap>
        <Button type="primary" size="large">Large</Button>
        <Button type="primary">Middle</Button>
        <Button type="primary" size="small">Small</Button>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Shape</h2>
    <p class="section-desc">Buttons can have different shapes: default, circle, and round.</p>
    
    <div class="demo-box">
      <Flex gap="small" align="center" wrap>
        <Button type="primary">Default</Button>
        <Button type="primary" shape="round">Round</Button>
        <Button type="primary" shape="circle">A</Button>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Danger</h2>
    <p class="section-desc">Use the danger prop to indicate a dangerous or potentially negative action.</p>
    
    <div class="demo-box">
      <Flex gap="small" wrap>
        <Button type="primary" danger>Primary</Button>
        <Button danger>Default</Button>
        <Button type="dashed" danger>Dashed</Button>
        <Button type="text" danger>Text</Button>
        <Button type="link" danger>Link</Button>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Ghost</h2>
    <p class="section-desc">Ghost buttons have transparent backgrounds, making them ideal for use on colored backgrounds.</p>
    
    <div class="demo-box ghost-bg">
      <Flex gap="small" wrap>
        <Button type="primary" ghost>Primary Ghost</Button>
        <Button ghost>Default Ghost</Button>
        <Button type="dashed" ghost>Dashed Ghost</Button>
        <Button type="primary" danger ghost>Danger Ghost</Button>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Loading</h2>
    <p class="section-desc">A loading indicator can be added to a button by setting the loading property.</p>
    
    <div class="demo-box">
      <Flex gap="small" align="center" wrap>
        <Button type="primary" {loading} onclick={simulateLoading}>
          {loading ? 'Loading...' : 'Click to Load'}
        </Button>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Disabled</h2>
    <p class="section-desc">Use the disabled prop to make a button unclickable.</p>
    
    <div class="demo-box">
      <Flex gap="small" vertical>
        <Flex gap="small" wrap>
          <Button type="primary">Primary</Button>
          <Button type="primary" disabled>Primary (disabled)</Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button>Default</Button>
          <Button disabled>Default (disabled)</Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button type="dashed">Dashed</Button>
          <Button type="dashed" disabled>Dashed (disabled)</Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button type="text">Text</Button>
          <Button type="text" disabled>Text (disabled)</Button>
        </Flex>
        <Flex gap="small" wrap>
          <Button type="link">Link</Button>
          <Button type="link" disabled>Link (disabled)</Button>
        </Flex>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Block</h2>
    <p class="section-desc">Block buttons span the full width of their parent container.</p>
    
    <div class="demo-box">
      <Flex gap="small" vertical>
        <Button type="primary" block>Primary Block</Button>
        <Button block>Default Block</Button>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Button Group</h2>
    <p class="section-desc">Buttons can be grouped by placing multiple Button components inside a ButtonGroup.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap>
        <ButtonGroup>
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
        
        <ButtonGroup>
          <Button type="primary">Left</Button>
          <Button type="primary">Middle</Button>
          <Button type="primary">Right</Button>
        </ButtonGroup>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Semantic Styling</h2>
    <p class="section-desc">Pass JavaScript objects via <code>styles</code> prop to style specific component parts: <code>root</code>, <code>icon</code>, <code>content</code>.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap align="center">
        <Button 
          type="primary"
          styles={{
            root: 'background: linear-gradient(135deg, #667eea, #764ba2); border: none'
          }}
        >
          Gradient
        </Button>
        <Button 
          styles={{
            root: 'border-radius: 0; border-color: #722ed1; color: #722ed1'
          }}
        >
          Square Purple
        </Button>
        <Button 
          type="primary"
          styles={{
            root: 'box-shadow: 0 4px 14px rgba(22, 119, 255, 0.4)'
          }}
        >
          With Shadow
        </Button>
        <Button 
          onclick={() => customActive = !customActive}
          styles={{
            root: customActive 
              ? 'background-color: #52c41a; border-color: #52c41a; color: white' 
              : 'background-color: #ff4d4f; border-color: #ff4d4f; color: white'
          }}
        >
          {customActive ? '✓ Active' : '✕ Inactive'}
        </Button>
      </Flex>
    </div>
    
    <div class="code-example">
      <pre><code>{`<Button 
  styles={{
    root: 'background: linear-gradient(135deg, #667eea, #764ba2)',
    icon: 'color: yellow',
    content: 'font-weight: bold'
  }}
>
  Styled Button
</Button>`}</code></pre>
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

  .ghost-bg {
    background: linear-gradient(135deg, var(--ant-color-primary, #1677ff) 0%, var(--ant-color-primary-active, #0958d9) 100%);
  }

  /* Code example styling */
  .code-example {
    margin-top: 16px;
    background: var(--ant-color-bg-layout);
    border: 1px solid var(--ant-color-border-secondary);
    border-radius: 6px;
    overflow: hidden;
  }

  .code-example pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;
  }

  .code-example code {
    font-family: 'SF Mono', 'Fira Code', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.6;
    color: var(--ant-color-text);
  }
</style>

