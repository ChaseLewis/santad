<script lang="ts">
  import { Tabs, TabPane, Button } from '$lib';

  // Size state
  let tabSize = $state<'small' | 'middle' | 'large'>('middle');

  // Placement state
  let tabPlacement = $state<'top' | 'bottom' | 'start' | 'end'>('top');

  // Tab type state
  let tabType = $state<'line' | 'card'>('line');

  // Dynamic tabs
  let dynamicTabs = $state([
    { key: '1', label: 'Tab 1', content: 'Content of Tab 1' },
    { key: '2', label: 'Tab 2', content: 'Content of Tab 2' },
    { key: '3', label: 'Tab 3', content: 'Content of Tab 3' },
  ]);
  let dynamicActiveKey = $state('1');
  let newTabIndex = $state(4);

  function addTab() {
    const newKey = String(newTabIndex++);
    dynamicTabs = [...dynamicTabs, { 
      key: newKey, 
      label: `New Tab ${newKey}`, 
      content: `This is dynamically created content for Tab ${newKey}` 
    }];
    dynamicActiveKey = newKey;
  }

  function removeTab(targetKey: string) {
    const targetIndex = dynamicTabs.findIndex(t => t.key === targetKey);
    const newTabs = dynamicTabs.filter(t => t.key !== targetKey);
    
    if (dynamicActiveKey === targetKey && newTabs.length > 0) {
      const newIndex = targetIndex >= newTabs.length ? newTabs.length - 1 : targetIndex;
      dynamicActiveKey = newTabs[newIndex].key;
    }
    
    dynamicTabs = newTabs;
  }

  // Controlled tabs
  let controlledActiveKey = $state('1');
</script>

<div class="component-page">
  <header class="page-header">
    <h1>Tabs</h1>
    <p class="description">Tabs make it easy to switch between different views.</p>
  </header>

  <!-- Basic -->
  <section class="demo-section">
    <h2>Basic</h2>
    <p class="section-desc">Default tabs with line style indicator. Content is defined as children of TabPane.</p>
    <div class="demo-box">
      <Tabs defaultActiveKey="1">
        <TabPane key="1" label="Tab 1">
          <div class="tab-pane-content">
            <p>This is the content of <strong>Tab 1</strong>.</p>
            <p>Click on other tabs to see their content change.</p>
          </div>
        </TabPane>
        <TabPane key="2" label="Tab 2">
          <div class="tab-pane-content">
            <p>Welcome to <strong>Tab 2</strong>!</p>
            <p>Each tab can contain completely different content.</p>
          </div>
        </TabPane>
        <TabPane key="3" label="Tab 3">
          <div class="tab-pane-content">
            <p>You're viewing <strong>Tab 3</strong>.</p>
            <p>Tabs are great for organizing related content.</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </section>

  <!-- With Rich Content -->
  <section class="demo-section">
    <h2>With Rich Content</h2>
    <p class="section-desc">Tabs can contain complex interactive content.</p>
    <div class="demo-box">
      <Tabs defaultActiveKey="home">
        <TabPane key="home" label="Home">
          <div class="tab-pane-content rich">
            <h3>🏠 Welcome Home</h3>
            <p>This is your dashboard. Here you can see an overview of your activity.</p>
            <div class="stats">
              <div class="stat"><span class="stat-value">128</span><span class="stat-label">Projects</span></div>
              <div class="stat"><span class="stat-value">24</span><span class="stat-label">Active</span></div>
              <div class="stat"><span class="stat-value">12</span><span class="stat-label">Completed</span></div>
            </div>
          </div>
        </TabPane>
        <TabPane key="profile" label="Profile">
          <div class="tab-pane-content rich">
            <h3>👤 Your Profile</h3>
            <p>Manage your personal information and preferences here.</p>
            <ul>
              <li>Name: John Doe</li>
              <li>Email: john@example.com</li>
              <li>Role: Developer</li>
            </ul>
          </div>
        </TabPane>
        <TabPane key="settings" label="Settings">
          <div class="tab-pane-content rich">
            <h3>⚙️ Settings</h3>
            <p>Configure your application settings.</p>
            <div class="settings-list">
              <label><input type="checkbox" checked /> Enable notifications</label>
              <label><input type="checkbox" /> Dark mode</label>
              <label><input type="checkbox" checked /> Auto-save</label>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </section>

  <!-- Disabled -->
  <section class="demo-section">
    <h2>Disabled</h2>
    <p class="section-desc">Disable a tab to prevent user interaction.</p>
    <div class="demo-box">
      <Tabs defaultActiveKey="1">
        <TabPane key="1" label="Tab 1">
          <div class="tab-pane-content">
            <p>Content of Tab 1</p>
          </div>
        </TabPane>
        <TabPane key="2" label="Tab 2 (Disabled)" disabled>
          <div class="tab-pane-content">
            <p>Content of Tab 2 (you shouldn't see this)</p>
          </div>
        </TabPane>
        <TabPane key="3" label="Tab 3">
          <div class="tab-pane-content">
            <p>Content of Tab 3</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </section>

  <!-- Centered -->
  <section class="demo-section">
    <h2>Centered</h2>
    <p class="section-desc">Centered tabs for a different layout.</p>
    <div class="demo-box">
      <Tabs defaultActiveKey="1" centered>
        <TabPane key="1" label="Tab 1">
          <div class="tab-pane-content">
            <p>Content of Tab 1</p>
          </div>
        </TabPane>
        <TabPane key="2" label="Tab 2">
          <div class="tab-pane-content">
            <p>Content of Tab 2</p>
          </div>
        </TabPane>
        <TabPane key="3" label="Tab 3">
          <div class="tab-pane-content">
            <p>Content of Tab 3</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </section>

  <!-- Sizes -->
  <section class="demo-section">
    <h2>Sizes</h2>
    <p class="section-desc">Three sizes available: small, middle (default), and large.</p>
    <div class="demo-box vertical">
      <div class="controls">
        <Button 
          type={tabSize === 'small' ? 'primary' : 'default'}
          onclick={() => tabSize = 'small'}
        >Small</Button>
        <Button 
          type={tabSize === 'middle' ? 'primary' : 'default'}
          onclick={() => tabSize = 'middle'}
        >Middle</Button>
        <Button 
          type={tabSize === 'large' ? 'primary' : 'default'}
          onclick={() => tabSize = 'large'}
        >Large</Button>
      </div>
      <Tabs defaultActiveKey="1" size={tabSize}>
        <TabPane key="1" label="Tab 1">
          <div class="tab-pane-content">
            <p>Content with {tabSize} size tabs</p>
          </div>
        </TabPane>
        <TabPane key="2" label="Tab 2">
          <div class="tab-pane-content">
            <p>Content of Tab 2</p>
          </div>
        </TabPane>
        <TabPane key="3" label="Tab 3">
          <div class="tab-pane-content">
            <p>Content of Tab 3</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </section>

  <!-- Tab Position -->
  <section class="demo-section">
    <h2>Position</h2>
    <p class="section-desc">Tabs can be positioned at top, bottom, start (left), or end (right). Use <code>flex</code> prop to stretch content.</p>
    <div class="demo-box vertical">
      <div class="controls">
        <Button 
          type={tabPlacement === 'top' ? 'primary' : 'default'}
          onclick={() => tabPlacement = 'top'}
        >Top</Button>
        <Button 
          type={tabPlacement === 'bottom' ? 'primary' : 'default'}
          onclick={() => tabPlacement = 'bottom'}
        >Bottom</Button>
        <Button 
          type={tabPlacement === 'start' ? 'primary' : 'default'}
          onclick={() => tabPlacement = 'start'}
        >Start</Button>
        <Button 
          type={tabPlacement === 'end' ? 'primary' : 'default'}
          onclick={() => tabPlacement = 'end'}
        >End</Button>
      </div>
      <div class="position-demo">
        <Tabs defaultActiveKey="1" tabPlacement={tabPlacement} flex tabBarGap={0}>
          <TabPane key="1" label="Tab 1">
            <p>Tab position: <strong>{tabPlacement}</strong></p>
            <p>The <code>flex</code> prop adds default styling: height, padding, background.</p>
            <p>No wrapper div needed!</p>
          </TabPane>
          <TabPane key="2" label="Tab 2">
            <p>Content of Tab 2</p>
            <p>Works with all positions: top, bottom, start, and end.</p>
          </TabPane>
          <TabPane key="3" label="Tab 3">
            <p>Content of Tab 3</p>
          </TabPane>
        </Tabs>
      </div>
      <p class="code-hint">Usage: <code>&lt;Tabs flex&gt;</code> — TabPane gets default styling (height, padding, background).</p>
    </div>
  </section>

  <!-- Card Type -->
  <section class="demo-section">
    <h2>Card Type</h2>
    <p class="section-desc">Card style tabs with a boxed appearance.</p>
    <div class="demo-box vertical">
      <div class="controls">
        <Button 
          type={tabType === 'line' ? 'primary' : 'default'}
          onclick={() => tabType = 'line'}
        >Line</Button>
        <Button 
          type={tabType === 'card' ? 'primary' : 'default'}
          onclick={() => tabType = 'card'}
        >Card</Button>
      </div>
      <Tabs defaultActiveKey="1" type={tabType}>
        <TabPane key="1" label="Tab 1">
          <div class="tab-pane-content">
            <p>Tab type: {tabType}</p>
          </div>
        </TabPane>
        <TabPane key="2" label="Tab 2">
          <div class="tab-pane-content">
            <p>Content of Tab 2</p>
          </div>
        </TabPane>
        <TabPane key="3" label="Tab 3">
          <div class="tab-pane-content">
            <p>Content of Tab 3</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </section>

  <!-- Dynamic Tabs -->
  <section class="demo-section">
    <h2>Dynamic Tabs (Add/Remove)</h2>
    <p class="section-desc">Add and remove tabs dynamically with editable-card type.</p>
    <div class="demo-box">
      <Tabs 
        type="editable-card" 
        bind:activeKey={dynamicActiveKey}
        onAdd={addTab}
      >
        {#each dynamicTabs as tab (tab.key)}
          <TabPane 
            key={tab.key} 
            label={tab.label}
            closable
            onClose={() => removeTab(tab.key)}
          >
            <div class="tab-pane-content">
              <p>{tab.content}</p>
              <p><em>This tab can be closed by clicking the × button.</em></p>
            </div>
          </TabPane>
        {/each}
      </Tabs>
    </div>
  </section>

  <!-- Controlled -->
  <section class="demo-section">
    <h2>Controlled</h2>
    <p class="section-desc">Control the active tab from outside the component using bind:activeKey.</p>
    <div class="demo-box vertical">
      <div class="controls">
        <span>Active: {controlledActiveKey}</span>
        <Button onclick={() => controlledActiveKey = '1'}>Select Tab 1</Button>
        <Button onclick={() => controlledActiveKey = '2'}>Select Tab 2</Button>
        <Button onclick={() => controlledActiveKey = '3'}>Select Tab 3</Button>
      </div>
      <Tabs bind:activeKey={controlledActiveKey}>
        <TabPane key="1" label="Tab 1">
          <div class="tab-pane-content">
            <p>Content of Tab 1</p>
          </div>
        </TabPane>
        <TabPane key="2" label="Tab 2">
          <div class="tab-pane-content">
            <p>Content of Tab 2</p>
          </div>
        </TabPane>
        <TabPane key="3" label="Tab 3">
          <div class="tab-pane-content">
            <p>Content of Tab 3</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </section>

  <!-- Semantic Styling -->
  <section class="demo-section">
    <h2>Semantic Styling</h2>
    <p class="section-desc">Customize tabs using the styles and classNames props.</p>
    <div class="demo-box vertical">
      <Tabs
        defaultActiveKey="1"
        styles={{
          tab: 'font-weight: 600;',
          tabActive: 'color: #722ed1;',
          indicator: 'background: linear-gradient(90deg, #722ed1, #eb2f96);',
        }}
      >
        <TabPane key="1" label="Custom Tab 1">
          <div class="tab-pane-content">
            <p>Custom styled tabs with gradient indicator</p>
          </div>
        </TabPane>
        <TabPane key="2" label="Custom Tab 2">
          <div class="tab-pane-content">
            <p>Content of Tab 2</p>
          </div>
        </TabPane>
        <TabPane key="3" label="Custom Tab 3">
          <div class="tab-pane-content">
            <p>Content of Tab 3</p>
          </div>
        </TabPane>
      </Tabs>
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

  .demo-box.vertical {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .controls {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }

  .position-demo {
    height: 280px;
    border: 1px dashed var(--ant-color-border);
    border-radius: 4px;
    padding: 16px;
  }

  .code-hint {
    margin: 0;
    font-size: 13px;
    color: var(--ant-color-text-secondary);
  }

  .code-hint code {
    background: var(--ant-color-fill-tertiary, rgba(0, 0, 0, 0.04));
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  }

  /* Tab pane content styles */
  .tab-pane-content {
    padding: 16px;
    background: var(--ant-color-bg-layout, #f5f5f5);
    border-radius: 4px;
  }

  .tab-pane-content p {
    margin: 0 0 8px;
  }

  .tab-pane-content p:last-child {
    margin-bottom: 0;
  }

  .tab-pane-content.rich h3 {
    margin: 0 0 12px;
    font-size: 18px;
    font-weight: 600;
    color: var(--ant-color-text);
  }

  .tab-pane-content .stats {
    display: flex;
    gap: 24px;
    margin-top: 16px;
  }

  .tab-pane-content .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 24px;
    background: var(--ant-color-bg-container);
    border-radius: 8px;
    border: 1px solid var(--ant-color-border-secondary);
  }

  .tab-pane-content .stat-value {
    font-size: 24px;
    font-weight: 600;
    color: var(--ant-color-primary);
  }

  .tab-pane-content .stat-label {
    font-size: 12px;
    color: var(--ant-color-text-secondary);
    margin-top: 4px;
  }

  .tab-pane-content ul {
    margin: 16px 0 0;
    padding-left: 20px;
  }

  .tab-pane-content li {
    margin-bottom: 8px;
  }

  .tab-pane-content .settings-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }

  .tab-pane-content .settings-list label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
</style>
