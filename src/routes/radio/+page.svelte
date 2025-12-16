<script lang="ts">
  import { Radio, RadioGroup, Button, Flex } from '$lib';

  let radioValue = $state<string | number>('apple');
  let optionValue = $state<string>('a');
</script>

<div class="component-page">
  <header class="page-header">
    <h1>Radio</h1>
    <p class="description">Used to select a single state from multiple options.</p>
  </header>

  <section class="demo-section">
    <h2>Basic</h2>
    <p class="section-desc">The simplest use of radio button.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap>
        <Radio value="a">
          {#snippet children()}Option A{/snippet}
        </Radio>
        <Radio value="b" checked={true}>
          {#snippet children()}Option B (checked){/snippet}
        </Radio>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Disabled</h2>
    <p class="section-desc">Radio in disabled state.</p>
    
    <div class="demo-box">
      <Flex gap="middle" wrap>
        <Radio value="disabled" disabled>
          {#snippet children()}Disabled{/snippet}
        </Radio>
        <Radio value="disabled-checked" checked={true} disabled>
          {#snippet children()}Disabled Checked{/snippet}
        </Radio>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Radio Group</h2>
    <p class="section-desc">A group of radio buttons, typically used when only one option can be selected.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <RadioGroup value={radioValue} onchange={(val) => radioValue = val}>
          {#snippet children()}
            <Radio value="apple">
              {#snippet children()}Apple{/snippet}
            </Radio>
            <Radio value="banana">
              {#snippet children()}Banana{/snippet}
            </Radio>
            <Radio value="orange">
              {#snippet children()}Orange{/snippet}
            </Radio>
            <Radio value="grape">
              {#snippet children()}Grape{/snippet}
            </Radio>
          {/snippet}
        </RadioGroup>
        <p style="margin: 0; color: var(--ant-color-text-secondary);">Selected: {radioValue}</p>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Vertical Group</h2>
    <p class="section-desc">Vertical layout for radio group.</p>
    
    <div class="demo-box">
      <RadioGroup value={optionValue} onchange={(val) => optionValue = val}>
        {#snippet children()}
          <Flex vertical gap="small">
            <Radio value="a">
              {#snippet children()}Option A - First choice{/snippet}
            </Radio>
            <Radio value="b">
              {#snippet children()}Option B - Second choice{/snippet}
            </Radio>
            <Radio value="c">
              {#snippet children()}Option C - Third choice{/snippet}
            </Radio>
            <Radio value="d">
              {#snippet children()}Option D - Fourth choice{/snippet}
            </Radio>
          </Flex>
        {/snippet}
      </RadioGroup>
    </div>
  </section>

  <section class="demo-section">
    <h2>Disabled Group</h2>
    <p class="section-desc">Disable the entire radio group.</p>
    
    <div class="demo-box">
      <RadioGroup disabled defaultValue="a">
        {#snippet children()}
          <Radio value="a">
            {#snippet children()}Option A{/snippet}
          </Radio>
          <Radio value="b">
            {#snippet children()}Option B{/snippet}
          </Radio>
          <Radio value="c">
            {#snippet children()}Option C{/snippet}
          </Radio>
        {/snippet}
      </RadioGroup>
    </div>
  </section>

  <section class="demo-section">
    <h2>Controlled</h2>
    <p class="section-desc">Controlled radio group with external state management.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <RadioGroup value={radioValue} onchange={(val) => radioValue = val}>
          {#snippet children()}
            <Radio value="apple">
              {#snippet children()}Apple{/snippet}
            </Radio>
            <Radio value="banana">
              {#snippet children()}Banana{/snippet}
            </Radio>
            <Radio value="orange">
              {#snippet children()}Orange{/snippet}
            </Radio>
          {/snippet}
        </RadioGroup>
        <Flex gap="small" wrap>
          <Button size="small" onclick={() => radioValue = 'apple'}>Select Apple</Button>
          <Button size="small" onclick={() => radioValue = 'banana'}>Select Banana</Button>
          <Button size="small" onclick={() => radioValue = 'orange'}>Select Orange</Button>
        </Flex>
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
</style>

