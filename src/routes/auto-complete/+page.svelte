<script lang="ts">
  import { AutoComplete, Flex } from '$lib';
  import type { AutoCompleteOption } from '$lib';

  // Basic example
  let basicValue = $state('');
  const basicOptions = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ];

  // Dynamic options based on search
  let searchValue = $state('');
  let searchOptions = $state<AutoCompleteOption[]>([]);
  
  function handleSearch(value: string) {
    if (!value) {
      searchOptions = [];
      return;
    }
    searchOptions = ['gmail.com', 'outlook.com', 'yahoo.com'].map(domain => ({
      value: `${value}@${domain}`,
      label: `${value}@${domain}`,
    }));
  }

  // Custom filter
  let filterValue = $state('');
  const filterOptions = [
    { value: 'Apple', label: '🍎 Apple' },
    { value: 'Banana', label: '🍌 Banana' },
    { value: 'Cherry', label: '🍒 Cherry' },
    { value: 'Date', label: '🌴 Date' },
    { value: 'Elderberry', label: '🫐 Elderberry' },
  ];

  // Case sensitive
  let caseSensitiveValue = $state('');
  const caseSensitiveOptions = [
    { value: 'JavaScript' },
    { value: 'javascript' },
    { value: 'TypeScript' },
    { value: 'typescript' },
    { value: 'JSON' },
    { value: 'json' },
  ];

  // Grouped options
  let groupedValue = $state('');
  const groupedOptions = [
    {
      label: 'Cities',
      options: [
        { value: 'New York' },
        { value: 'London' },
        { value: 'Tokyo' },
      ],
    },
    {
      label: 'Countries',
      options: [
        { value: 'United States' },
        { value: 'United Kingdom' },
        { value: 'Japan' },
      ],
    },
  ];

  // Status examples
  let errorValue = $state('');
  let warningValue = $state('');

  // Disabled example
  let disabledValue = $state('Disabled value');

  // Allow clear example
  let clearableValue = $state('Clear me');

  // Custom option rendering
  let frameworkValue = $state('');

  // Virtual scrolling with large dataset
  let virtualValue = $state('');
  const largeOptions = Array.from({ length: 10000 }, (_, i) => ({
    value: `Option ${i + 1}`,
    label: `Option ${i + 1} - Item description`
  }));
</script>

<div class="component-page">
  <header class="page-header">
    <h1>AutoComplete</h1>
    <p class="description">Autocomplete function of input field.</p>
  </header>

  <section class="demo-section">
    <h2>Basic</h2>
    <p class="section-desc">Basic usage. Suggestions appear when typing.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <AutoComplete
          bind:value={basicValue}
          options={basicOptions}
          placeholder="Type to search..."
          style="width: 300px"
        />
        <span>Value: {basicValue}</span>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Empty Open</h2>
    <p class="section-desc">Control whether the dropdown shows when focused with an empty input. Set <code>emptyOpen={'{false}'}</code> to only show dropdown after typing.</p>
    
    <div class="demo-box">
      <Flex gap="large">
        <Flex vertical gap="small">
          <span>Default (shows on focus)</span>
          <AutoComplete
            options={basicOptions}
            placeholder="Click to see options..."
            style="width: 220px"
          />
        </Flex>
        <Flex vertical gap="small">
          <span>emptyOpen={'{false}'}</span>
          <AutoComplete
            options={basicOptions}
            placeholder="Start typing..."
            style="width: 220px"
            emptyOpen={false}
          />
        </Flex>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Dynamic Options</h2>
    <p class="section-desc">Options can be dynamically generated based on input. Great for email suggestions.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <AutoComplete
          bind:value={searchValue}
          options={searchOptions}
          placeholder="Enter email..."
          style="width: 300px"
          onsearch={handleSearch}
        />
        <span>Value: {searchValue}</span>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Custom Filter</h2>
    <p class="section-desc">Custom filter function for case-insensitive search.</p>
    
    <div class="demo-box">
      <AutoComplete
        bind:value={filterValue}
        options={filterOptions}
        placeholder="Search fruits..."
        style="width: 300px"
        filterOption={(input, option) => 
          option.value.toLowerCase().includes(input.toLowerCase())
        }
      />
    </div>
  </section>

  <section class="demo-section">
    <h2>Case Sensitive</h2>
    <p class="section-desc">Enable case-sensitive matching with the <code>caseSensitive</code> prop. Try typing "Java" vs "java".</p>
    
    <div class="demo-box">
      <Flex gap="middle">
        <Flex vertical gap="small">
          <span>Case Insensitive (default)</span>
          <AutoComplete
            bind:value={caseSensitiveValue}
            options={caseSensitiveOptions}
            placeholder="Type 'java'..."
            style="width: 200px"
          />
        </Flex>
        <Flex vertical gap="small">
          <span>Case Sensitive</span>
          <AutoComplete
            options={caseSensitiveOptions}
            placeholder="Type 'Java'..."
            style="width: 200px"
            caseSensitive
          />
        </Flex>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Grouped Options</h2>
    <p class="section-desc">Options can be grouped using the options property with nested structure.</p>
    
    <div class="demo-box">
      <AutoComplete
        bind:value={groupedValue}
        options={groupedOptions}
        placeholder="Search cities or countries..."
        style="width: 300px"
      />
    </div>
  </section>

  <section class="demo-section">
    <h2>Popup Width</h2>
    <p class="section-desc">Control dropdown width with <code>popupMatchSelectWidth</code>. Set to <code>false</code> to allow wider dropdowns, or a number for fixed width.</p>
    
    <div class="demo-box">
      <Flex gap="large">
        <Flex vertical gap="small">
          <span>Match input (default)</span>
          <AutoComplete
            options={[
              { value: 'Option', label: 'Very long option label that exceeds input width' },
              { value: 'Another', label: 'Another very long option label' },
              { value: 'Short' },
            ]}
            placeholder="Type..."
            style="width: 150px"
          />
        </Flex>
        <Flex vertical gap="small">
          <span>Auto width (false)</span>
          <AutoComplete
            options={[
              { value: 'Option', label: 'Very long option label that exceeds input width' },
              { value: 'Another', label: 'Another very long option label' },
              { value: 'Short' },
            ]}
            placeholder="Type..."
            style="width: 150px"
            popupMatchSelectWidth={false}
          />
        </Flex>
        <Flex vertical gap="small">
          <span>Fixed width (300px)</span>
          <AutoComplete
            options={[
              { value: 'Option', label: 'Very long option label that exceeds input width' },
              { value: 'Another', label: 'Another very long option label' },
              { value: 'Short' },
            ]}
            placeholder="Type..."
            style="width: 150px"
            popupMatchSelectWidth={300}
          />
        </Flex>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Sizes</h2>
    <p class="section-desc">Three sizes available: small, middle (default), and large.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <AutoComplete
          options={basicOptions}
          placeholder="Small size"
          size="small"
          style="width: 300px"
        />
        <AutoComplete
          options={basicOptions}
          placeholder="Middle size (default)"
          size="middle"
          style="width: 300px"
        />
        <AutoComplete
          options={basicOptions}
          placeholder="Large size"
          size="large"
          style="width: 300px"
        />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Status</h2>
    <p class="section-desc">Add status to AutoComplete with error or warning validation state.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <AutoComplete
          bind:value={errorValue}
          options={basicOptions}
          placeholder="Error status"
          status="error"
          style="width: 300px"
        />
        <AutoComplete
          bind:value={warningValue}
          options={basicOptions}
          placeholder="Warning status"
          status="warning"
          style="width: 300px"
        />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Allow Clear</h2>
    <p class="section-desc">Show clear button when there is input.</p>
    
    <div class="demo-box">
      <AutoComplete
        bind:value={clearableValue}
        options={basicOptions}
        placeholder="Type something..."
        allowClear
        style="width: 300px"
      />
    </div>
  </section>

  <section class="demo-section">
    <h2>Disabled</h2>
    <p class="section-desc">Disabled state of the input.</p>
    
    <div class="demo-box">
      <AutoComplete
        bind:value={disabledValue}
        options={basicOptions}
        disabled
        style="width: 300px"
      />
    </div>
  </section>

  <section class="demo-section">
    <h2>Virtual Scrolling</h2>
    <p class="section-desc">Virtual scrolling is enabled by default for optimal performance with large lists. Set <code>virtual={'{false}'}</code> to disable, or <code>virtual={'{44}'}</code> for custom item height.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <AutoComplete
          bind:value={virtualValue}
          options={largeOptions}
          placeholder="Search 10,000 items..."
          style="width: 300px"
          listHeight={256}
        />
        <span class="item-count">Total: {largeOptions.length.toLocaleString()} items (virtual scrolling enabled by default)</span>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Custom Option Rendering</h2>
    <p class="section-desc">Customize the rendering of each option. Use <code>virtual={'{false}'}</code> for small lists or <code>virtual={'{height}'}</code> for custom item heights.</p>
    
    <div class="demo-box">
      <AutoComplete
        bind:value={frameworkValue}
        options={[
          { value: 'React', description: 'A JavaScript library for building user interfaces' },
          { value: 'Vue', description: 'The Progressive JavaScript Framework' },
          { value: 'Svelte', description: 'Cybernetically enhanced web apps' },
          { value: 'Angular', description: 'The modern web developer platform' },
        ]}
        placeholder="Search frameworks..."
        style="width: 400px"
        virtual={false}
      >
        {#snippet optionRender({ option, isActive })}
          <div class="custom-option" class:active={isActive}>
            <strong>{option.value}</strong>
            <p class="option-desc">{option.description ?? ''}</p>
          </div>
        {/snippet}
      </AutoComplete>
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

  .custom-option {
    padding: 4px 0;
  }

  .custom-option strong {
    display: block;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  .custom-option .option-desc {
    margin: 2px 0 0;
    font-size: 12px;
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
  }

  .custom-option.active {
    color: var(--ant-color-primary, #1677ff);
  }

  .item-count {
    font-size: 12px;
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
  }
</style>

