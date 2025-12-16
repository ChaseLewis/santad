<script lang="ts">
  import { Checkbox, Button, Flex } from '$lib';

  let checked = $state(true);
  let indeterminate = $state(true);
  let agreeChecked = $state(false);
</script>

<div class="component-page">
  <header class="page-header">
    <h1>Checkbox</h1>
    <p class="description">Used to select multiple items from a set of options.</p>
  </header>

  <section class="demo-section">
    <h2>Basic</h2>
    <p class="section-desc">Basic usage of checkbox.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap>
        <Checkbox>
          {#snippet label()}Checkbox{/snippet}
        </Checkbox>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Disabled</h2>
    <p class="section-desc">Disabled checkbox cannot be interacted with.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap>
        <Checkbox disabled>
          {#snippet label()}Disabled{/snippet}
        </Checkbox>
        <Checkbox checked={true} disabled>
          {#snippet label()}Checked Disabled{/snippet}
        </Checkbox>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Controlled</h2>
    <p class="section-desc">Controlled checkbox with external state management.</p>
    
    <div class="demo-box">
      <Flex gap="middle" align="center">
        <Checkbox 
          checked={checked} 
          onchange={(e) => checked = e.checked}
        >
          {#snippet label()}Controlled: {checked ? 'Checked' : 'Unchecked'}{/snippet}
        </Checkbox>
        <Button size="small" onclick={() => checked = !checked}>Toggle</Button>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Indeterminate</h2>
    <p class="section-desc">The indeterminate state is used when a parent checkbox has some but not all children checked.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <Checkbox indeterminate={indeterminate} onchange={() => indeterminate = false}>
          {#snippet label()}Indeterminate (click to resolve){/snippet}
        </Checkbox>
        <Button size="small" onclick={() => indeterminate = true}>Reset to Indeterminate</Button>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Use Cases</h2>
    <p class="section-desc">Common checkbox usage patterns.</p>
    
    <div class="demo-box">
      <Flex vertical gap="small">
        <Checkbox>
          {#snippet label()}I agree to the terms and conditions{/snippet}
        </Checkbox>
        <Checkbox>
          {#snippet label()}Subscribe to newsletter{/snippet}
        </Checkbox>
        <Checkbox>
          {#snippet label()}Remember me{/snippet}
        </Checkbox>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Semantic Styling</h2>
    <p class="section-desc">Pass JavaScript objects via <code>styles</code> prop to style specific component parts: <code>root</code>, <code>input</code>, <code>label</code>.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <Checkbox 
          styles={{
            label: 'color: #722ed1; font-weight: 600'
          }}
        >
          {#snippet label()}Purple bold label{/snippet}
        </Checkbox>
        <Checkbox 
          checked={true}
          styles={{
            root: 'padding: 8px 12px; background: var(--ant-color-primary-bg); border-radius: 6px'
          }}
        >
          {#snippet label()}With background highlight{/snippet}
        </Checkbox>
        <Checkbox 
          checked={agreeChecked}
          onchange={(e) => agreeChecked = e.checked}
          styles={{
            label: agreeChecked 
              ? 'color: #52c41a; font-weight: 600' 
              : 'color: #ff4d4f'
          }}
        >
          {#snippet label()}{agreeChecked ? '✓ Agreed' : 'Please agree to continue'}{/snippet}
        </Checkbox>
      </Flex>
    </div>
    
    <div class="code-example">
      <pre><code>{`<Checkbox 
  styles={{
    root: 'padding: 8px; background: #f0f0f0',
    label: 'color: purple; font-weight: bold'
  }}
/>`}</code></pre>
    </div>
  </section>

  <section class="demo-section">
    <h2>Custom Checkbox Colors</h2>
    <p class="section-desc">Use CSS custom properties via <code>styles.input</code> to customize colors: <code>--checkbox-color</code>, <code>--checkbox-border-color</code>, <code>--checkbox-check-color</code>.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <Checkbox 
          defaultChecked={true}
          styles={{
            input: '--checkbox-color: #722ed1'
          }}
        >
          {#snippet label()}Purple checkbox{/snippet}
        </Checkbox>
        <Checkbox
          defaultChecked={true}
          styles={{
            input: '--checkbox-color: #52c41a; --checkbox-check-color: #135200'
          }}
        >
          {#snippet label()}Green checkbox with dark check{/snippet}
        </Checkbox>
        <Checkbox
          defaultChecked={true}
          styles={{
            input: '--checkbox-color: #fa541c; --checkbox-check-color: #fff566'
          }}
        >
          {#snippet label()}Orange checkbox with yellow check{/snippet}
        </Checkbox>
        <Checkbox
          defaultChecked={true}
          styles={{
            input: '--checkbox-border-color: #eb2f96; --checkbox-color: #eb2f96'
          }}
        >
          {#snippet label()}Pink border (click to check){/snippet}
        </Checkbox>
      </Flex>
    </div>
    
    <div class="code-example">
      <pre><code>{`<Checkbox 
  styles={{
    input: '--checkbox-color: #722ed1; --checkbox-check-color: gold'
  }}
/>

/* Available CSS custom properties:
 * --checkbox-color: checked background & border
 * --checkbox-border-color: unchecked border
 * --checkbox-check-color: checkmark color
 */`}</code></pre>
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

