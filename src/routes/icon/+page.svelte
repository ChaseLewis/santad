<script lang="ts">
  import {
    Icon,
    CheckOutlined,
    CloseOutlined,
    CopyOutlined,
    EditOutlined,
    EnterOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    LoadingOutlined,
    SearchOutlined,
    Flex,
    Button,
    Slider,
  } from '$lib';

  let spinning = $state(false);
  let rotation = $state(0);
</script>

<div class="component-page">
  <header class="page-header">
    <h1>Icon</h1>
    <p class="description">Semantic vector graphics with support for spin, rotation, and custom SVGs.</p>
  </header>

  <section class="demo-section">
    <h2>Basic Icons</h2>
    <p class="section-desc">A collection of commonly used icons.</p>
    
    <div class="demo-box">
      <Flex gap="large" wrap="wrap">
        <div class="icon-item">
          <CheckOutlined />
          <span>Check</span>
        </div>
        <div class="icon-item">
          <CloseOutlined />
          <span>Close</span>
        </div>
        <div class="icon-item">
          <CopyOutlined />
          <span>Copy</span>
        </div>
        <div class="icon-item">
          <EditOutlined />
          <span>Edit</span>
        </div>
        <div class="icon-item">
          <EnterOutlined />
          <span>Enter</span>
        </div>
        <div class="icon-item">
          <EyeOutlined />
          <span>Eye</span>
        </div>
        <div class="icon-item">
          <EyeInvisibleOutlined />
          <span>Eye Invisible</span>
        </div>
        <div class="icon-item">
          <LoadingOutlined />
          <span>Loading</span>
        </div>
        <div class="icon-item">
          <SearchOutlined />
          <span>Search</span>
        </div>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Spinning Icons</h2>
    <p class="section-desc">Icons can spin for loading states.</p>
    
    <div class="demo-box">
      <Flex gap="large" align="center">
        <LoadingOutlined />
        <LoadingOutlined style="font-size: 24px;" />
        <LoadingOutlined style="font-size: 32px;" />
        <Button onclick={() => spinning = !spinning}>
          {spinning ? 'Stop' : 'Spin'}
        </Button>
        <CopyOutlined spin={spinning} style="font-size: 24px;" />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Rotated Icons</h2>
    <p class="section-desc">Icons can be rotated to any angle.</p>
    
    <div class="demo-box">
      <Flex gap="large" align="center">
        <SearchOutlined rotate={0} style="font-size: 24px;" />
        <SearchOutlined rotate={90} style="font-size: 24px;" />
        <SearchOutlined rotate={180} style="font-size: 24px;" />
        <SearchOutlined rotate={270} style="font-size: 24px;" />
      </Flex>
      <Flex gap="middle" align="center" style="margin-top: 16px;">
        <div style="width: 200px;">
          <Slider 
            min={0} 
            max={360} 
            value={rotation}
            onchange={(v) => rotation = v as number}
          />
        </div>
        <span style="min-width: 40px;">{rotation}°</span>
        <SearchOutlined rotate={rotation} style="font-size: 32px;" />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Icon Sizes</h2>
    <p class="section-desc">Icons inherit font-size from their container or can be sized via style.</p>
    
    <div class="demo-box">
      <Flex gap="large" align="center">
        <CopyOutlined style="font-size: 12px;" />
        <CopyOutlined style="font-size: 16px;" />
        <CopyOutlined style="font-size: 24px;" />
        <CopyOutlined style="font-size: 32px;" />
        <CopyOutlined style="font-size: 48px;" />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Icon Colors</h2>
    <p class="section-desc">Icons inherit color from their container or can be styled directly.</p>
    
    <div class="demo-box">
      <Flex gap="large" align="center" style="font-size: 24px;">
        <CheckOutlined style="color: var(--ant-color-success);" />
        <CloseOutlined style="color: var(--ant-color-error);" />
        <EditOutlined style="color: var(--ant-color-warning);" />
        <CopyOutlined style="color: var(--ant-color-primary);" />
        <SearchOutlined style="color: var(--ant-color-text-secondary);" />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Interactive Icons</h2>
    <p class="section-desc">Icons can be clickable with proper focus states.</p>
    
    <div class="demo-box">
      <Flex gap="large" align="center" style="font-size: 24px;">
        <CopyOutlined 
          onclick={() => alert('Copied!')} 
          style="cursor: pointer;"
        />
        <EditOutlined 
          onclick={() => alert('Edit!')} 
          style="cursor: pointer;"
        />
        <CloseOutlined 
          onclick={() => alert('Close!')} 
          style="cursor: pointer;"
        />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Custom Icon</h2>
    <p class="section-desc">Create custom icons using the base Icon component with your own SVG.</p>
    
    <div class="demo-box">
      <Flex gap="large" align="center" style="font-size: 24px;">
        <Icon aria-label="heart">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
            <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3a264.4 264.4 0 00-84 55.5A260.04 260.04 0 00101 283.6c-13.4 32.6-20 67-20 102.4 0 35.4 6.6 69.8 20 102.4 13.1 31.8 31.6 60.4 55.2 85 .7.8 1.5 1.5 2.3 2.3l412.7 415.2 414.4-416.9c.5-.5.9-.9 1.4-1.4 23.5-24.5 42.1-53.1 55.2-85 13.4-32.6 20.1-67 20.1-102.4-.1-35.4-6.7-69.8-20.3-102.4z"/>
          </svg>
        </Icon>
        <Icon aria-label="star" style="color: #faad14;">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"/>
          </svg>
        </Icon>
        <Icon aria-label="thunderbolt" spin style="color: #722ed1;">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
            <path d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L821.3 372c5-4.8 1.4-12.7-5.3-12.7z"/>
          </svg>
        </Icon>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>With Buttons</h2>
    <p class="section-desc">Icons work seamlessly in buttons.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap="wrap">
        <Button type="primary">
          {#snippet icon()}<SearchOutlined />{/snippet}
          Search
        </Button>
        <Button>
          {#snippet icon()}<EditOutlined />{/snippet}
          Edit
        </Button>
        <Button type="primary" danger>
          {#snippet icon()}<CloseOutlined />{/snippet}
          Delete
        </Button>
        <Button type="primary" shape="circle">
          {#snippet icon()}<SearchOutlined />{/snippet}
        </Button>
        <Button shape="circle">
          {#snippet icon()}<CopyOutlined />{/snippet}
        </Button>
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

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 80px;
    font-size: 24px;
  }

  .icon-item span {
    font-size: 12px;
    color: var(--ant-color-text-secondary);
    text-align: center;
  }

  input[type="range"] {
    accent-color: var(--ant-color-primary);
  }
</style>

