<script lang="ts">
  import { Switch, Button, Flex } from '$lib';

  let checked = $state(false);
  let statusEnabled = $state(true);
</script>

<div class="component-page">
  <header class="page-header">
    <h1>Switch</h1>
    <p class="description">Switching between two states or on-off state.</p>
  </header>

  <section class="demo-section">
    <h2>Basic</h2>
    <p class="section-desc">The most basic usage.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap align="center">
        <Switch />
        <Switch defaultChecked={true} />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Disabled</h2>
    <p class="section-desc">Disabled state of switch.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap align="center">
        <Switch disabled />
        <Switch disabled defaultChecked={true} />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Text & Icon</h2>
    <p class="section-desc">With text or icon inside the switch.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap align="center">
        <Switch checkedChildren="ON" unCheckedChildren="OFF" />
        <Switch checkedChildren="1" unCheckedChildren="0" defaultChecked={true} />
        <Switch checkedChildren="Yes" unCheckedChildren="No" />
        <Switch checkedChildren="✓" unCheckedChildren="✕" defaultChecked={true} />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Size</h2>
    <p class="section-desc">Switch supports two sizes: default and small.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap align="center">
        <Switch defaultChecked={true} />
        <Switch size="small" defaultChecked={true} />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Loading</h2>
    <p class="section-desc">Show a loading indicator during async operations.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap align="center">
        <Switch loading checked={false} />
        <Switch loading checked={true} />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Controlled</h2>
    <p class="section-desc">Controlled switch with external state.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap align="center">
        <Switch 
          checked={checked} 
          onchange={(val) => checked = val}
          checkedChildren="On"
          unCheckedChildren="Off"
        />
        <span style="color: var(--ant-color-text-secondary);">State: {checked ? 'On' : 'Off'}</span>
        <Button size="small" onclick={() => checked = !checked}>Toggle</Button>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Semantic Styling</h2>
    <p class="section-desc">Pass JavaScript objects via <code>styles</code> prop to style specific component parts: <code>root</code>, <code>handle</code>, <code>inner</code>.</p>
    
    <div class="demo-box">
      <Flex gap="large" wrap align="center">
        <div class="custom-switch-wrapper">
          <span class="switch-label">Custom Root</span>
          <Switch 
            defaultChecked={true}
            styles={{
              root: 'background-color: #52c41a'
            }}
          />
        </div>
        <div class="custom-switch-wrapper">
          <span class="switch-label">Custom Handle</span>
          <Switch 
            defaultChecked={true}
            styles={{
              handle: 'filter: drop-shadow(0 0 4px rgba(22, 119, 255, 0.5))'
            }}
          />
        </div>
        <div class="custom-switch-wrapper">
          <span class="switch-label">Gradient</span>
          <Switch 
            defaultChecked={true}
            styles={{
              root: 'background: linear-gradient(135deg, #667eea, #764ba2)',
              handle: 'transform: scale(1.1)'
            }}
          />
        </div>
        <div class="custom-switch-wrapper">
          <span class="switch-label">Status</span>
          <Switch 
            checked={statusEnabled}
            onchange={(val) => statusEnabled = val}
            styles={{
              root: statusEnabled 
                ? 'background-color: #52c41a' 
                : 'background-color: #ff4d4f'
            }}
          />
        </div>
      </Flex>
    </div>
    
    <div class="code-example">
      <pre><code>{`// Dynamic styling based on state
let enabled = $state(true);

<Switch 
  checked={enabled}
  onchange={(val) => enabled = val}
  styles={{
    root: enabled 
      ? 'background-color: #52c41a'  // Green when ON
      : 'background-color: #ff4d4f'  // Red when OFF
  }}
/>`}</code></pre>
    </div>
  </section>

  <section class="demo-section">
    <h2>Semantic Class Names</h2>
    <p class="section-desc">Pass class names via <code>classNames</code> prop to add custom classes to component parts.</p>
    
    <div class="demo-box">
      <Flex gap="large" wrap align="center">
        <div class="custom-switch-wrapper success-switch">
          <span class="switch-label">Success</span>
          <Switch defaultChecked={true} classNames={{ root: 'success-root' }} />
        </div>
        <div class="custom-switch-wrapper danger-switch">
          <span class="switch-label">Danger</span>
          <Switch defaultChecked={true} classNames={{ root: 'danger-root' }} />
        </div>
        <div class="custom-switch-wrapper purple-switch">
          <span class="switch-label">Purple</span>
          <Switch defaultChecked={true} classNames={{ root: 'purple-root' }} />
        </div>
      </Flex>
    </div>
    
    <div class="code-example">
      <pre><code>{`<Switch classNames={{ root: 'success-root' }} />

/* CSS */
:global(.success-root.ant-switch-checked) {
  background-color: #52c41a;
}`}</code></pre>
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

  /* Custom switch wrapper */
  .custom-switch-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .switch-label {
    font-size: 12px;
    color: var(--ant-color-text-secondary);
  }

  /* Semantic classNames examples - using :global() to target the custom class */
  :global(.success-root.ant-switch-checked) {
    background-color: #52c41a !important;
  }
  :global(.success-root.ant-switch-checked:not(.ant-switch-disabled):hover) {
    background-color: #73d13d !important;
  }

  :global(.danger-root.ant-switch-checked) {
    background-color: #ff4d4f !important;
  }
  :global(.danger-root.ant-switch-checked:not(.ant-switch-disabled):hover) {
    background-color: #ff7875 !important;
  }

  :global(.purple-root.ant-switch-checked) {
    background-color: #722ed1 !important;
  }
  :global(.purple-root.ant-switch-checked:not(.ant-switch-disabled):hover) {
    background-color: #9254de !important;
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

