<script lang="ts">
  import { Button, Flex } from '$lib';

  const components = [
    { name: 'Button', path: '/button', description: 'Used to trigger an operation.', icon: '🔘' },
    { name: 'Flex', path: '/flex', description: 'A flex layout container component.', icon: '📐' },
    { name: 'Card', path: '/card', description: 'A simple rectangular container.', icon: '🃏' },
    { name: 'Checkbox', path: '/checkbox', description: 'Used to select multiple options.', icon: '☑️' },
    { name: 'Switch', path: '/switch', description: 'Switching between two states.', icon: '🔀' },
    { name: 'Radio', path: '/radio', description: 'Used to select a single option.', icon: '🔘' },
  ];
</script>

<div class="overview">
  <header class="hero">
    <h1>Santad</h1>
    <p class="subtitle">A Svelte port of Ant Design components</p>
    <p class="description">
      Beautiful, accessible, and customizable components built with Svelte 5 runes
      and following Ant Design specifications.
    </p>
    <Flex gap="middle">
      <Button type="primary" size="large" href="/button">Get Started</Button>
      <Button size="large" href="https://ant.design" target="_blank">Ant Design Docs</Button>
    </Flex>
  </header>

  <section class="features">
    <h2>Features</h2>
    <Flex gap="large" wrap>
      <div class="feature-card">
        <span class="feature-icon">🎨</span>
        <h3>Design Tokens</h3>
        <p>Customizable design tokens for colors, spacing, typography, and more.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🌙</span>
        <h3>Dark Mode</h3>
        <p>Built-in dark mode support with smooth transitions.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">⚡</span>
        <h3>Svelte 5</h3>
        <p>Built with Svelte 5 runes for optimal performance and reactivity.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🎯</span>
        <h3>Semantic Styling</h3>
        <p>Granular control with classNames and styles props for each component part.</p>
      </div>
    </Flex>
  </section>

  <section class="components-section">
    <h2>Components</h2>
    <div class="components-grid">
      {#each components as comp}
        <a href={comp.path} class="component-card">
          <span class="component-icon">{comp.icon}</span>
          <h3>{comp.name}</h3>
          <p>{comp.description}</p>
        </a>
      {/each}
    </div>
  </section>
</div>

<style>
  .overview {
    max-width: 1000px;
  }

  .hero {
    text-align: center;
    padding: 48px 0 64px;
    border-bottom: 1px solid var(--ant-color-border-secondary, #f0f0f0);
    margin-bottom: 48px;
  }

  .hero h1 {
    font-size: 48px;
    font-weight: 700;
    margin: 0 0 8px;
    background: linear-gradient(135deg, var(--ant-color-primary, #1677ff) 0%, var(--ant-color-primary-active, #0958d9) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 20px;
    color: var(--ant-color-text-secondary);
    margin: 0 0 16px;
  }

  .description {
    font-size: 16px;
    color: var(--ant-color-text-tertiary);
    max-width: 500px;
    margin: 0 auto 32px;
    line-height: 1.6;
  }

  /* Features */
  .features {
    margin-bottom: 48px;
  }

  .features h2,
  .components-section h2 {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 24px;
    color: var(--ant-color-text-heading);
  }

  .feature-card {
    flex: 1 1 200px;
    background: var(--ant-color-bg-container);
    border: 1px solid var(--ant-color-border-secondary);
    border-radius: 12px;
    padding: 24px;
    text-align: center;
  }

  .feature-icon {
    font-size: 32px;
    display: block;
    margin-bottom: 12px;
  }

  .feature-card h3 {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
    color: var(--ant-color-text);
  }

  .feature-card p {
    margin: 0;
    font-size: 14px;
    color: var(--ant-color-text-secondary);
    line-height: 1.5;
  }

  /* Components Grid */
  .components-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .component-card {
    display: block;
    background: var(--ant-color-bg-container);
    border: 1px solid var(--ant-color-border-secondary);
    border-radius: 12px;
    padding: 24px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .component-card:hover {
    border-color: var(--ant-color-primary);
    background-color: var(--ant-color-primary-bg, #e6f4ff);
    transform: translateY(-2px);
  }

  .component-icon {
    font-size: 28px;
    display: block;
    margin-bottom: 12px;
  }

  .component-card h3 {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 600;
    color: var(--ant-color-text);
  }

  .component-card p {
    margin: 0;
    font-size: 14px;
    color: var(--ant-color-text-secondary);
    line-height: 1.5;
  }
</style>
