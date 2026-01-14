<script lang="ts">
  import { Tag, CheckableTag, Flex, Text } from '$lib';

  let tag1Visible = $state(true);
  let tag2Visible = $state(true);
  let tag3Visible = $state(true);

  // Checkable tags state
  let hot = $state(true);
  let trendy = $state(false);
  let cool = $state(true);

  // Categories state
  let categories = $state([
    { label: 'Movies', checked: true },
    { label: 'Books', checked: false },
    { label: 'Music', checked: true },
    { label: 'Sports', checked: false },
  ]);

  function handleCategoryChange(index: number, checked: boolean) {
    categories[index].checked = checked;
  }

  function resetClosable() {
    tag1Visible = true;
    tag2Visible = true;
    tag3Visible = true;
  }
</script>

<div class="component-page">
  <header class="page-header">
    <h1>Tag</h1>
    <p class="description">Tag for categorizing or markup.</p>
  </header>

  <section class="demo-section">
    <h2>Basic</h2>
    <p class="section-desc">Basic usage of tag. It can be used to mark entities for quick recognition.</p>
    
    <div class="demo-box">
      <Flex gap="small" wrap>
        <Tag>Tag 1</Tag>
        <Tag>Tag 2</Tag>
        <Tag href="https://svelte.dev" target="_blank">Link</Tag>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Variant</h2>
    <p class="section-desc">There are three variants: <code>filled</code> (default), <code>outlined</code>, and <code>solid</code>.</p>
    
    <div class="demo-box">
      <Flex gap="small" vertical>
        <Flex gap="small" wrap>
          <Tag variant="filled">Filled</Tag>
          <Tag variant="filled" color="processing">Filled</Tag>
          <Tag variant="filled" color="purple">Filled</Tag>
        </Flex>
        <Flex gap="small" wrap>
          <Tag variant="outlined">Outlined</Tag>
          <Tag variant="outlined" color="processing">Outlined</Tag>
          <Tag variant="outlined" color="purple">Outlined</Tag>
        </Flex>
        <Flex gap="small" wrap>
          <Tag variant="solid">Solid</Tag>
          <Tag variant="solid" color="processing">Solid</Tag>
          <Tag variant="solid" color="purple">Solid</Tag>
        </Flex>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Colorful</h2>
    <p class="section-desc">Tags support preset colors including both preset and status colors.</p>
    
    <div class="demo-box">
      <Flex gap="small" vertical>
        <Text type="secondary" style="display: block; margin-bottom: 8px;">Preset Colors</Text>
        <Flex gap="4px" wrap>
          <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          <Tag color="volcano">volcano</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="gold">gold</Tag>
          <Tag color="lime">lime</Tag>
          <Tag color="green">green</Tag>
          <Tag color="cyan">cyan</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="geekblue">geekblue</Tag>
          <Tag color="purple">purple</Tag>
        </Flex>
        
        <Text type="secondary" style="display: block; margin: 16px 0 8px;">Status Colors</Text>
        <Flex gap="4px" wrap>
          <Tag color="success">success</Tag>
          <Tag color="processing">processing</Tag>
          <Tag color="error">error</Tag>
          <Tag color="warning">warning</Tag>
          <Tag color="default">default</Tag>
        </Flex>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Solid Variant Colors</h2>
    <p class="section-desc">Solid variant with different colors.</p>
    
    <div class="demo-box">
      <Flex gap="small" vertical>
        <Flex gap="4px" wrap>
          <Tag color="magenta" variant="solid">magenta</Tag>
          <Tag color="red" variant="solid">red</Tag>
          <Tag color="volcano" variant="solid">volcano</Tag>
          <Tag color="orange" variant="solid">orange</Tag>
          <Tag color="gold" variant="solid">gold</Tag>
          <Tag color="lime" variant="solid">lime</Tag>
          <Tag color="green" variant="solid">green</Tag>
          <Tag color="cyan" variant="solid">cyan</Tag>
          <Tag color="blue" variant="solid">blue</Tag>
          <Tag color="geekblue" variant="solid">geekblue</Tag>
          <Tag color="purple" variant="solid">purple</Tag>
        </Flex>
        <Flex gap="4px" wrap>
          <Tag color="success" variant="solid">success</Tag>
          <Tag color="processing" variant="solid">processing</Tag>
          <Tag color="error" variant="solid">error</Tag>
          <Tag color="warning" variant="solid">warning</Tag>
        </Flex>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Custom Color</h2>
    <p class="section-desc">You can set custom color for the tag.</p>
    
    <div class="demo-box">
      <Flex gap="small" vertical>
        <Flex gap="small" wrap>
          <Tag color="#f50">Filled #f50</Tag>
          <Tag color="#2db7f5">Filled #2db7f5</Tag>
          <Tag color="#87d068">Filled #87d068</Tag>
          <Tag color="#108ee9">Filled #108ee9</Tag>
        </Flex>
        <Flex gap="small" wrap>
          <Tag color="#f50" variant="outlined">Outlined #f50</Tag>
          <Tag color="#2db7f5" variant="outlined">Outlined #2db7f5</Tag>
          <Tag color="#87d068" variant="outlined">Outlined #87d068</Tag>
          <Tag color="#108ee9" variant="outlined">Outlined #108ee9</Tag>
        </Flex>
        <Flex gap="small" wrap>
          <Tag color="#f50" variant="solid">Solid #f50</Tag>
          <Tag color="#2db7f5" variant="solid">Solid #2db7f5</Tag>
          <Tag color="#87d068" variant="solid">Solid #87d068</Tag>
          <Tag color="#108ee9" variant="solid">Solid #108ee9</Tag>
        </Flex>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Closable</h2>
    <p class="section-desc">Tags can be closed by clicking the close icon.</p>
    
    <div class="demo-box">
      <Flex gap="small" vertical>
        <Flex gap="small" wrap>
          {#if tag1Visible}
            <Tag closable onclose={() => tag1Visible = false}>Tag 1</Tag>
          {/if}
          {#if tag2Visible}
            <Tag closable color="success" onclose={() => tag2Visible = false}>Success</Tag>
          {/if}
          {#if tag3Visible}
            <Tag closable color="error" variant="solid" onclose={() => tag3Visible = false}>Error</Tag>
          {/if}
        </Flex>
        {#if !tag1Visible || !tag2Visible || !tag3Visible}
          <button class="reset-btn" onclick={resetClosable}>Reset Tags</button>
        {/if}
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Icon</h2>
    <p class="section-desc">Tags can contain an icon.</p>
    
    <div class="demo-box">
      <Flex gap="small" wrap>
        <Tag color="processing">
          {#snippet icon()}
            <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/>
            </svg>
          {/snippet}
          Info
        </Tag>
        <Tag color="success">
          {#snippet icon()}
            <svg viewBox="64 64 896 896" width="12" height="12" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/>
            </svg>
          {/snippet}
          Success
        </Tag>
        <Tag color="error">
          {#snippet icon()}
            <svg viewBox="64 64 896 896" width="12" height="12" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
            </svg>
          {/snippet}
          Error
        </Tag>
        <Tag color="warning">
          {#snippet icon()}
            <svg viewBox="64 64 896 896" width="12" height="12" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/>
            </svg>
          {/snippet}
          Warning
        </Tag>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Disabled</h2>
    <p class="section-desc">Disabled state for tag.</p>
    
    <div class="demo-box">
      <Flex gap="small" wrap>
        <Tag disabled>Disabled</Tag>
        <Tag disabled closable>Closable Disabled</Tag>
        <Tag disabled color="success">Success Disabled</Tag>
        <Tag disabled color="error" variant="solid">Solid Disabled</Tag>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Checkable</h2>
    <p class="section-desc">CheckableTag works like a toggle checkbox.</p>
    
    <div class="demo-box">
      <Flex gap="small" vertical>
        <Flex gap="small" wrap>
          <CheckableTag checked={hot} onchange={(c) => hot = c}>Hot</CheckableTag>
          <CheckableTag checked={trendy} onchange={(c) => trendy = c}>Trendy</CheckableTag>
          <CheckableTag checked={cool} onchange={(c) => cool = c}>Cool</CheckableTag>
        </Flex>
        <p class="hint-text">
          Selected: {[hot && 'Hot', trendy && 'Trendy', cool && 'Cool'].filter(Boolean).join(', ') || 'None'}
        </p>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Checkable Tag Group</h2>
    <p class="section-desc">Multiple checkable tags working together as a group.</p>
    
    <div class="demo-box">
      <Flex gap="small" vertical>
        <p style="margin: 0 0 8px; font-size: 14px;">Categories:</p>
        <Flex gap="small" wrap>
          {#each categories as cat, i}
            <CheckableTag 
              checked={cat.checked} 
              onchange={(c) => handleCategoryChange(i, c)}
            >
              {cat.label}
            </CheckableTag>
          {/each}
        </Flex>
        <p class="hint-text">
          Selected categories: {categories.filter(c => c.checked).map(c => c.label).join(', ') || 'None'}
        </p>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Checkable Disabled</h2>
    <p class="section-desc">Disabled checkable tags.</p>
    
    <div class="demo-box">
      <Flex gap="small" wrap>
        <CheckableTag checked={true} disabled>Checked Disabled</CheckableTag>
        <CheckableTag checked={false} disabled>Unchecked Disabled</CheckableTag>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Semantic Styling</h2>
    <p class="section-desc">Pass JavaScript objects via <code>styles</code> prop to style specific component parts.</p>
    
    <div class="demo-box">
      <Flex gap="small" wrap>
        <Tag 
          styles={{
            root: 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none'
          }}
        >
          Gradient
        </Tag>
        <Tag 
          styles={{
            root: 'border-radius: 12px; font-weight: 600'
          }}
          color="success"
        >
          Pill Style
        </Tag>
        <Tag 
          styles={{
            root: 'box-shadow: 0 2px 8px rgba(0,0,0,0.15)'
          }}
          color="blue"
          variant="solid"
        >
          With Shadow
        </Tag>
      </Flex>
    </div>
    
    <div class="code-example">
      <pre><code>{`<Tag 
  styles={{
    root: 'background: linear-gradient(135deg, #667eea, #764ba2)'
  }}
>
  Gradient Tag
</Tag>`}</code></pre>
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

  .hint-text {
    margin: 8px 0 0;
    font-size: 12px;
    color: var(--ant-color-text-secondary);
  }


  .reset-btn {
    padding: 4px 12px;
    font-size: 12px;
    background: var(--ant-color-primary, #1677ff);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .reset-btn:hover {
    background: var(--ant-color-primary-hover, #4096ff);
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

