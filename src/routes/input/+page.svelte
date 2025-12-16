<script lang="ts">
  import { Input, Password, TextArea, Search, Button } from '$lib';

  // Basic input value
  let basicValue = $state('');

  // Controlled input
  let controlledValue = $state('Hello');

  // Password input
  let passwordValue = $state('');
  let passwordVisible = $state(false);

  // TextArea value
  let textAreaValue = $state('');

  // Search value
  let searchValue = $state('');
  let searchLoading = $state(false);

  // Handle search
  function handleSearch(value: string) {
    searchLoading = true;
    console.log('Searching:', value);
    setTimeout(() => {
      searchLoading = false;
    }, 1000);
  }
</script>

<div class="page">
  <h1>Input</h1>
  <p class="description">
    A basic widget for getting the user input is a text field. Keyboard and mouse can be used for providing or changing data.
  </p>

  <!-- Basic -->
  <section class="section">
    <h2>Basic</h2>
    <p>Basic usage example.</p>
    <div class="demo">
      <Input placeholder="Basic usage" />
    </div>
  </section>

  <!-- Sizes -->
  <section class="section">
    <h2>Three Sizes</h2>
    <p>There are three sizes of an Input: large (40px), default (32px) and small (24px).</p>
    <div class="demo vertical">
      <Input size="large" placeholder="Large size" />
      <Input placeholder="Default size" />
      <Input size="small" placeholder="Small size" />
    </div>
  </section>

  <!-- Prefix and Suffix -->
  <section class="section">
    <h2>Pre / Post Tab</h2>
    <p>Using prefix and suffix to add prefix or suffix icons inside input.</p>
    <div class="demo vertical">
      <Input placeholder="Enter username">
        {#snippet prefix()}
          <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
            <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
          </svg>
        {/snippet}
        {#snippet suffix()}
          <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" style="opacity: 0.45;">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
            <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
          </svg>
        {/snippet}
      </Input>

      <Input placeholder="Price">
        {#snippet prefix()}
          <span>¥</span>
        {/snippet}
        {#snippet suffix()}
          <span>RMB</span>
        {/snippet}
      </Input>
    </div>
  </section>

  <!-- Addon -->
  <section class="section">
    <h2>Pre / Post Addon</h2>
    <p>Using addon before and after the input.</p>
    <div class="demo vertical">
      <Input placeholder="mysite">
        {#snippet addonBefore()}
          <span>https://</span>
        {/snippet}
        {#snippet addonAfter()}
          <span>.com</span>
        {/snippet}
      </Input>

      <Input placeholder="mysite" defaultValue="example">
        {#snippet addonBefore()}
          <span>https://</span>
        {/snippet}
      </Input>
    </div>
  </section>

  <!-- Status -->
  <section class="section">
    <h2>Status</h2>
    <p>Add status to Input with status. Including error and warning.</p>
    <div class="demo vertical">
      <Input status="error" placeholder="Error status" />
      <Input status="warning" placeholder="Warning status" />
      <Input status="error" placeholder="Error with prefix">
        {#snippet prefix()}
          <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
          </svg>
        {/snippet}
      </Input>
      <Input status="warning" placeholder="Warning with prefix">
        {#snippet prefix()}
          <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
          </svg>
        {/snippet}
      </Input>
    </div>
  </section>

  <!-- Variants -->
  <section class="section">
    <h2>Variants</h2>
    <p>There are 3 variants of Input: outlined (default), filled, and borderless.</p>
    <div class="demo vertical">
      <Input variant="outlined" placeholder="Outlined (default)" />
      <Input variant="filled" placeholder="Filled" />
      <Input variant="borderless" placeholder="Borderless" />
    </div>
  </section>

  <!-- Allow Clear -->
  <section class="section">
    <h2>Allow Clear</h2>
    <p>Add a clear button to allow users to clear the input content.</p>
    <div class="demo vertical">
      <Input placeholder="Input with clear button" allowClear bind:value={basicValue} />
      <p class="note">Value: {basicValue || '(empty)'}</p>
    </div>
  </section>

  <!-- Show Count -->
  <section class="section">
    <h2>Show Count</h2>
    <p>Show character count.</p>
    <div class="demo vertical">
      <Input placeholder="Basic character count" showCount />
      <Input placeholder="With maxLength" showCount maxLength={20} />
    </div>
  </section>

  <!-- Disabled -->
  <section class="section">
    <h2>Disabled</h2>
    <p>A disabled input.</p>
    <div class="demo">
      <Input disabled placeholder="Disabled input" value="This is disabled" />
    </div>
  </section>

  <!-- Password -->
  <section class="section">
    <h2>Password</h2>
    <p>Input type of password with visibility toggle.</p>
    <div class="demo vertical">
      <Password placeholder="Enter password" bind:value={passwordValue} />
      <Password 
        placeholder="Controlled visibility" 
        visibilityToggle={{ 
          visible: passwordVisible, 
          onVisibleChange: (v) => passwordVisible = v 
        }} 
      />
      <Password placeholder="No visibility toggle" visibilityToggle={false} />
    </div>
  </section>

  <!-- TextArea -->
  <section class="section">
    <h2>TextArea</h2>
    <p>For multi-line input.</p>
    <div class="demo vertical">
      <TextArea placeholder="Basic TextArea" rows={4} />
      <TextArea placeholder="With character count" showCount maxLength={100} />
      <TextArea placeholder="With allowClear" allowClear />
    </div>
  </section>

  <!-- TextArea Auto Size -->
  <section class="section">
    <h2>TextArea Auto Size</h2>
    <p>autoSize prop adapts the height to its content.</p>
    <div class="demo vertical">
      <TextArea 
        placeholder="Auto resize height" 
        autoSize 
        bind:value={textAreaValue} 
      />
      <TextArea 
        placeholder="Auto resize with min/max rows" 
        autoSize={{ minRows: 2, maxRows: 6 }} 
      />
    </div>
  </section>

  <!-- Search -->
  <section class="section">
    <h2>Search</h2>
    <p>Input with search button.</p>
    <div class="demo vertical">
      <Search placeholder="Search..." onsearch={(v) => console.log('Search:', v)} />
      <Search 
        placeholder="Search with button" 
        enterButton 
        onsearch={(v) => console.log('Search:', v)} 
      />
      <Search 
        placeholder="Search with loading" 
        enterButton 
        loading={searchLoading}
        bind:value={searchValue}
        onsearch={handleSearch}
      />
      <Search 
        placeholder="Search with custom button"
        onsearch={(v) => console.log('Search:', v)}
      >
        {#snippet enterButton()}
          <span>Search</span>
        {/snippet}
      </Search>
    </div>
  </section>

  <!-- Controlled -->
  <section class="section">
    <h2>Controlled Input</h2>
    <p>Controlled mode with external value management.</p>
    <div class="demo vertical">
      <Input 
        value={controlledValue} 
        onchange={(v) => controlledValue = v}
        placeholder="Controlled input"
      />
      <div class="controls">
        <Button size="small" onclick={() => controlledValue = 'Hello'}>Reset</Button>
        <Button size="small" onclick={() => controlledValue = ''}>Clear</Button>
        <span class="note">Value: {controlledValue}</span>
      </div>
    </div>
  </section>

  <!-- Semantic Styling -->
  <section class="section">
    <h2>Semantic Styling</h2>
    <p>Customize input appearance using the styles prop.</p>
    <div class="demo vertical">
      <Input 
        placeholder="Custom border color"
        styles={{ 
          root: 'border-color: #722ed1; --ant-color-primary: #722ed1;' 
        }}
      />
      <Input 
        placeholder="Custom background"
        styles={{ 
          root: 'background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%); border-color: #1677ff; color: #000;' 
        }}
      />
      <Input 
        placeholder="With prefix styling"
        styles={{ 
          prefix: 'color: #52c41a;',
          suffix: 'color: #faad14;'
        }}
      >
        {#snippet prefix()}
          <span>$</span>
        {/snippet}
        {#snippet suffix()}
          <span>USD</span>
        {/snippet}
      </Input>
    </div>
  </section>
</div>

<style>
  .page {
    max-width: 800px;
  }

  h1 {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  .description {
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.65));
    font-size: 14px;
    margin-bottom: 40px;
  }

  .section {
    margin-bottom: 48px;
  }

  .section h2 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  .section > p {
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.65));
    font-size: 14px;
    margin-bottom: 16px;
  }

  .demo {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 16px;
    padding: 24px;
    background: var(--ant-color-bg-container, #ffffff);
    border-radius: 8px;
    border: 1px solid var(--ant-color-border-secondary, #f0f0f0);
  }

  .demo.vertical {
    flex-direction: column;
  }

  .demo.vertical > :global(*) {
    max-width: 400px;
    width: 100%;
  }

  .controls {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }

  .note {
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.65));
    font-size: 13px;
  }
</style>

