<script lang="ts">
  import { Slider, Flex, Switch } from '$lib';

  let basicValue = $state(30);
  let rangeValue = $state<[number, number]>([20, 50]);
  let disabled = $state(false);
  let verticalValue = $state(40);
  let marksValue = $state(37);
  let reversedValue = $state(30);
</script>

<div class="component-page">
  <header class="page-header">
    <h1>Slider</h1>
    <p class="description">A Slider component for displaying current value and intervals in range.</p>
  </header>

  <section class="demo-section">
    <h2>Basic</h2>
    <p class="section-desc">Basic slider. When disabled, the slider will not be interactable.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <Flex align="center" gap="middle">
          <span>Disabled: {disabled ? 'Yes' : 'No'}</span>
          <Switch checked={disabled} onchange={(checked) => disabled = checked} />
        </Flex>
        <Slider 
          defaultValue={30} 
          {disabled}
          onchange={(v) => basicValue = v as number}
        />
        <span>Value: {basicValue}</span>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Slider with Tooltip</h2>
    <p class="section-desc">Slider with always visible tooltip or custom formatting.</p>
    
    <div class="demo-box">
      <Flex vertical gap="large">
        <div>
          <p class="label">Always show tooltip:</p>
          <Slider defaultValue={30} tooltip={{ open: true }} />
        </div>
        <div>
          <p class="label">Custom formatter:</p>
          <Slider 
            defaultValue={50} 
            tooltip={{ formatter: (val) => `${val}%` }} 
          />
        </div>
        <div>
          <p class="label">Hidden tooltip:</p>
          <Slider defaultValue={30} tooltip={{ formatter: null }} />
        </div>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Range Slider</h2>
    <p class="section-desc">Dual thumb mode for selecting a range of values.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <Slider 
          range 
          defaultValue={[20, 50]}
          onchange={(v) => rangeValue = v as [number, number]}
        />
        <span>Range: [{rangeValue[0]}, {rangeValue[1]}]</span>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Graduated Slider</h2>
    <p class="section-desc">Using marks to display graduated slider with labeled points.</p>
    
    <div class="demo-box">
      <Flex vertical gap="large">
        <div>
          <p class="label">With marks (included=true):</p>
          <Slider 
            marks={{
              0: '0°C',
              26: '26°C',
              37: '37°C',
              100: { label: '100°C', style: 'color: var(--ant-color-error);' }
            }}
            defaultValue={37}
            onchange={(v) => marksValue = v as number}
          />
        </div>
        <div style="margin-top: 20px;">
          <p class="label">With marks (included=false):</p>
          <Slider 
            marks={{
              0: '0°C',
              26: '26°C',
              37: '37°C',
              100: { label: '100°C', style: 'color: var(--ant-color-error);' }
            }}
            included={false}
            defaultValue={37}
          />
        </div>
        <div style="margin-top: 20px;">
          <p class="label">Step to marks only (step=null):</p>
          <Slider 
            marks={{
              0: '0°C',
              26: '26°C',
              37: '37°C',
              100: '100°C'
            }}
            step={null}
            defaultValue={26}
          />
        </div>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Vertical Slider</h2>
    <p class="section-desc">Vertical orientation slider.</p>
    
    <div class="demo-box">
      <Flex gap="large" style="height: 200px;">
        <Slider 
          vertical 
          defaultValue={30} 
        />
        <Slider 
          vertical 
          range
          defaultValue={[20, 50]} 
        />
        <Slider 
          vertical 
          marks={{
            0: '0',
            25: '25',
            50: '50',
            75: '75',
            100: '100'
          }}
          defaultValue={50} 
        />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Reversed</h2>
    <p class="section-desc">Using reverse to render slider reversely.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <Slider 
          reverse 
          defaultValue={30}
          onchange={(v) => reversedValue = v as number}
        />
        <span>Value: {reversedValue}</span>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>With Dots</h2>
    <p class="section-desc">Show dots at each step.</p>
    
    <div class="demo-box">
      <Flex vertical gap="large">
        <div>
          <p class="label">Dots at step 10:</p>
          <Slider dots step={10} defaultValue={20} />
        </div>
        <div>
          <p class="label">Dots with marks:</p>
          <Slider 
            dots 
            step={20}
            marks={{
              0: '0',
              20: '20',
              40: '40',
              60: '60',
              80: '80',
              100: '100'
            }}
            defaultValue={40} 
          />
        </div>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Semantic Styling</h2>
    <p class="section-desc">Use the styles prop to convey semantic meaning with different colors.</p>
    
    <div class="demo-box">
      <Flex vertical gap="large">
        <div>
          <p class="label">Default:</p>
          <Slider defaultValue={30} />
        </div>
        <div>
          <p class="label">Success:</p>
          <Slider 
            defaultValue={70} 
            styles={{
              track: 'background-color: var(--ant-color-success, #52c41a)',
              handle: 'border-color: var(--ant-color-success, #52c41a)'
            }}
          />
        </div>
        <div>
          <p class="label">Warning:</p>
          <Slider 
            defaultValue={50} 
            styles={{
              track: 'background-color: var(--ant-color-warning, #faad14)',
              handle: 'border-color: var(--ant-color-warning, #faad14)'
            }}
          />
        </div>
        <div>
          <p class="label">Error:</p>
          <Slider 
            defaultValue={30} 
            styles={{
              track: 'background-color: var(--ant-color-error, #ff4d4f)',
              handle: 'border-color: var(--ant-color-error, #ff4d4f)'
            }}
          />
        </div>
        <div>
          <p class="label">Info:</p>
          <Slider 
            defaultValue={60} 
            styles={{
              track: 'background-color: var(--ant-color-info, #1677ff)',
              handle: 'border-color: var(--ant-color-info, #1677ff)'
            }}
          />
        </div>
        <div>
          <p class="label">Custom gradient:</p>
          <Slider 
            defaultValue={75} 
            styles={{
              track: 'background: linear-gradient(90deg, #722ed1, #eb2f96)',
              handle: 'border-color: #eb2f96'
            }}
          />
        </div>
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

  .label {
    margin: 0 0 8px;
    font-size: 14px;
    color: var(--ant-color-text-secondary);
  }
</style>

