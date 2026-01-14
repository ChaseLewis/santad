<script lang="ts">
  import { Text, Title, Paragraph, Link, Flex } from '$lib';
</script>

<div class="component-page">
  <header class="page-header">
    <h1>Typography</h1>
    <p class="description">Basic text writing, including headings, body text, lists, and more.</p>
  </header>

  <section class="demo-section">
    <h2>Title</h2>
    <p class="section-desc">Display titles of different levels.</p>
    
    <div class="demo-box">
      <Title level={1}>h1. Ant Design</Title>
      <Title level={2}>h2. Ant Design</Title>
      <Title level={3}>h3. Ant Design</Title>
      <Title level={4}>h4. Ant Design</Title>
      <Title level={5}>h5. Ant Design</Title>
    </div>
  </section>

  <section class="demo-section">
    <h2>Text Types</h2>
    <p class="section-desc">Different text types for semantic meaning.</p>
    
    <div class="demo-box">
      <Flex vertical gap="small">
        <Text>Ant Design (default)</Text>
        <Text type="secondary">Ant Design (secondary)</Text>
        <Text type="success">Ant Design (success)</Text>
        <Text type="warning">Ant Design (warning)</Text>
        <Text type="danger">Ant Design (danger)</Text>
        <Text disabled>Ant Design (disabled)</Text>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Text Decorations</h2>
    <p class="section-desc">Support for various text decorations.</p>
    
    <div class="demo-box">
      <Flex vertical gap="small">
        <Text strong>Bold text</Text>
        <Text italic>Italic text</Text>
        <Text underline>Underlined text</Text>
        <Text delete>Strikethrough text</Text>
        <Text code>Code text</Text>
        <Text keyboard>Keyboard text</Text>
        <Text mark>Marked text</Text>
        <Flex gap="small">
          <Text>Combined:</Text>
          <Text strong italic>Bold and italic</Text>
        </Flex>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Title with Types</h2>
    <p class="section-desc">Titles can also have semantic types.</p>
    
    <div class="demo-box">
      <Title level={4}>Default Title</Title>
      <Title level={4} type="secondary">Secondary Title</Title>
      <Title level={4} type="success">Success Title</Title>
      <Title level={4} type="warning">Warning Title</Title>
      <Title level={4} type="danger">Danger Title</Title>
    </div>
  </section>

  <section class="demo-section">
    <h2>Paragraph</h2>
    <p class="section-desc">Block-level text content.</p>
    
    <div class="demo-box">
      <Paragraph>
        Ant Design, a design language for background applications, is refined by Ant UED Team. 
        Ant Design, a design language for background applications, is refined by Ant UED Team.
      </Paragraph>
      <Paragraph type="secondary">
        This is a secondary paragraph. It's useful for less important text or descriptions.
      </Paragraph>
    </div>
  </section>

  <section class="demo-section">
    <h2>Link</h2>
    <p class="section-desc">Styled anchor links.</p>
    
    <div class="demo-box">
      <Flex vertical gap="small">
        <Link href="https://svelte.dev" target="_blank">Svelte (default link)</Link>
        <Link href="https://svelte.dev" target="_blank" type="secondary">Svelte (secondary)</Link>
        <Link href="https://svelte.dev" target="_blank" type="success">Svelte (success)</Link>
        <Link href="https://svelte.dev" target="_blank" type="warning">Svelte (warning)</Link>
        <Link href="https://svelte.dev" target="_blank" type="danger">Svelte (danger)</Link>
        <Link href="https://svelte.dev" target="_blank" disabled>Svelte (disabled)</Link>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Interactive</h2>
    <p class="section-desc">Typography elements can be clickable.</p>
    
    <div class="demo-box">
      <Flex vertical gap="small">
        <Text onclick={() => alert('Text clicked!')}>Click me (Text)</Text>
        <Link onclick={() => alert('Link clicked!')}>Click me (Link without href)</Link>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Real World Example</h2>
    <p class="section-desc">Typography components used together.</p>
    
    <div class="demo-box">
      <article>
        <Title level={2}>Introduction to Svelte</Title>
        <Paragraph>
          <Text strong>Svelte</Text> is a radical new approach to building user interfaces. 
          Whereas traditional frameworks like <Text code>React</Text> and <Text code>Vue</Text> do 
          the bulk of their work in the <Text italic>browser</Text>, Svelte shifts that work into a 
          <Text mark>compile step</Text> that happens when you build your app.
        </Paragraph>
        <Paragraph type="secondary">
          Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically 
          updates the DOM when the state of your app changes.
        </Paragraph>
        <Title level={4}>Key Features</Title>
        <Paragraph>
          Press <Text keyboard>Ctrl</Text> + <Text keyboard>Shift</Text> + <Text keyboard>P</Text> to 
          open the command palette. Learn more at <Link href="https://svelte.dev" target="_blank">svelte.dev</Link>.
        </Paragraph>
        <Text type="secondary">
          <Text delete>Old approach</Text> → <Text type="success">New approach</Text>
        </Text>
      </article>
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

  article {
    max-width: 600px;
  }
</style>

