<script lang="ts">
  import { Progress, Flex } from '$lib';

  // Dynamic progress
  let dynamicPercent = $state(30);

  function increase() {
    dynamicPercent = Math.min(100, dynamicPercent + 10);
  }

  function decrease() {
    dynamicPercent = Math.max(0, dynamicPercent - 10);
  }
</script>

<div class="component-page">
  <header class="page-header">
    <h1>Progress</h1>
    <p class="description">Display the current progress of an operation.</p>
  </header>

  <section class="demo-section">
    <h2>Basic</h2>
    <p class="section-desc">A standard progress bar.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <Progress percent={30} />
        <Progress percent={50} status="active" />
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Small Size</h2>
    <p class="section-desc">A smaller progress bar.</p>
    
    <div class="demo-box">
      <Flex vertical gap="small" style="width: 200px">
        <Progress percent={30} size="small" />
        <Progress percent={50} size="small" status="active" />
        <Progress percent={70} size="small" status="exception" />
        <Progress percent={100} size="small" />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Dynamic</h2>
    <p class="section-desc">A dynamic progress bar is better.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <Progress percent={dynamicPercent} />
        <Flex gap="small">
          <button class="control-btn" onclick={decrease}>−</button>
          <button class="control-btn" onclick={increase}>+</button>
        </Flex>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Circle</h2>
    <p class="section-desc">A circular progress bar.</p>
    
    <div class="demo-box">
      <Flex gap="large">
        <Progress type="circle" percent={75} />
        <Progress type="circle" percent={70} status="exception" />
        <Progress type="circle" percent={100} />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Small Circle</h2>
    <p class="section-desc">A smaller circular progress bar.</p>
    
    <div class="demo-box">
      <Flex gap="large">
        <Progress type="circle" percent={30} size="small" />
        <Progress type="circle" percent={70} size="small" status="exception" />
        <Progress type="circle" percent={100} size="small" />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Dashboard</h2>
    <p class="section-desc">A dashboard style of progress bar.</p>
    
    <div class="demo-box">
      <Flex gap="large">
        <Progress type="dashboard" percent={75} />
        <Progress type="dashboard" percent={75} gapDegree={30} />
        <Progress type="dashboard" percent={75} gapPosition="left" />
        <Progress type="dashboard" percent={75} gapPosition="right" />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Custom Colors</h2>
    <p class="section-desc">Customize progress bar color with <code>strokeColor</code>.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <Progress percent={50} strokeColor="#52c41a" />
        <Progress percent={50} strokeColor={{ from: '#108ee9', to: '#87d068' }} />
        <Progress percent={50} strokeColor={['#108ee9', '#87d068']} />
        <Progress type="circle" percent={75} strokeColor="#faad14" />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Linecap</h2>
    <p class="section-desc">Customize the linecap style with <code>strokeLinecap</code>. By setting <code>strokeLinecap="butt"</code>, you can change the linecaps from round to butt.</p>
    
    <div class="demo-box">
      <Flex vertical gap="large">
        <Flex vertical gap="small">
          <span class="label">Line progress:</span>
          <Progress percent={75} strokeLinecap="round" />
          <Progress percent={75} strokeLinecap="butt" />
          <Progress percent={75} strokeLinecap="square" />
        </Flex>
        <Flex vertical gap="small">
          <span class="label">Circle progress:</span>
          <Flex gap="large">
            <Flex vertical gap="small" align="center">
              <span class="label">round</span>
              <Progress type="circle" percent={75} strokeLinecap="round" />
            </Flex>
            <Flex vertical gap="small" align="center">
              <span class="label">butt</span>
              <Progress type="circle" percent={75} strokeLinecap="butt" />
            </Flex>
            <Flex vertical gap="small" align="center">
              <span class="label">square</span>
              <Progress type="circle" percent={75} strokeLinecap="square" />
            </Flex>
          </Flex>
        </Flex>
        <Flex vertical gap="small">
          <span class="label">Circle steps with different linecaps:</span>
          <Flex gap="large">
            <Flex vertical gap="small" align="center">
              <span class="label">round</span>
              <Progress type="circle" percent={60} steps={5} strokeLinecap="round" />
            </Flex>
            <Flex vertical gap="small" align="center">
              <span class="label">butt</span>
              <Progress type="circle" percent={60} steps={5} strokeLinecap="butt" />
            </Flex>
            <Flex vertical gap="small" align="center">
              <span class="label">square</span>
              <Progress type="circle" percent={60} steps={5} strokeLinecap="square" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Steps</h2>
    <p class="section-desc">A progress bar with steps. Works with both line and circle types.</p>
    
    <div class="demo-box">
      <Flex vertical gap="large">
        <Flex vertical gap="middle">
          <span class="label">Line steps:</span>
          <Progress percent={50} steps={5} />
          <Progress percent={30} steps={5} strokeColor="#52c41a" />
          <Progress percent={60} steps={5} size="small" />
        </Flex>
        <Flex gap="large">
          <Flex vertical gap="small" align="center">
            <span class="label">Circle steps</span>
            <Progress type="circle" percent={50} steps={5} />
          </Flex>
          <Flex vertical gap="small" align="center">
            <span class="label">8 steps</span>
            <Progress type="circle" percent={75} steps={8} />
          </Flex>
          <Flex vertical gap="small" align="center">
            <span class="label">Custom color</span>
            <Progress type="circle" percent={60} steps={6} strokeColor="#52c41a" />
          </Flex>
          <Flex vertical gap="small" align="center">
            <span class="label">Small</span>
            <Progress type="circle" percent={40} steps={4} size="small" />
          </Flex>
        </Flex>
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Custom Format</h2>
    <p class="section-desc">Customize the progress text with <code>format</code>.</p>
    
    <div class="demo-box">
      <Flex gap="large">
        <Progress type="circle" percent={75} format={(p) => `${p} Days`} />
        <Progress type="circle" percent={100} format={() => 'Done'} />
        <Progress percent={50} format={(p) => `${p} / 100`} />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Custom Size</h2>
    <p class="section-desc">Set custom size with the <code>size</code> prop.</p>
    
    <div class="demo-box">
      <Flex vertical gap="middle">
        <Progress percent={50} size={20} />
        <Progress percent={50} size={[300, 20]} />
        <Progress type="circle" percent={50} size={180} />
      </Flex>
    </div>
  </section>

  <section class="demo-section">
    <h2>Semantic Styling</h2>
    <p class="section-desc">Use <code>styles</code> prop to customize appearance with JavaScript objects.</p>
    
    <div class="demo-box">
      <Flex vertical gap="large">
        <Flex vertical gap="small">
          <span class="label">Custom trail and progress colors:</span>
          <Progress 
            percent={60} 
            styles={{
              trail: 'background-color: #e6f4ff;',
              progress: 'background: linear-gradient(90deg, #1677ff, #69b1ff);',
            }}
          />
        </Flex>
        
        <Flex vertical gap="small">
          <span class="label">Custom text styling:</span>
          <Progress 
            percent={75} 
            styles={{
              text: 'color: #722ed1; font-weight: bold; font-size: 16px;',
            }}
          />
        </Flex>
        
        <Flex vertical gap="small">
          <span class="label">Glowing progress effect:</span>
          <Progress 
            percent={45} 
            styles={{
              progress: 'background: #52c41a; box-shadow: 0 0 8px rgba(82, 196, 26, 0.6);',
            }}
          />
        </Flex>

        <Flex vertical gap="small">
          <span class="label">Circle with custom inner style:</span>
          <Flex gap="large">
            <Progress 
              type="circle" 
              percent={80} 
              styles={{
                inner: 'filter: drop-shadow(0 4px 8px rgba(22, 119, 255, 0.3));',
                text: 'font-weight: bold; color: #1677ff;',
              }}
            />
            <Progress 
              type="dashboard" 
              percent={65} 
              styles={{
                inner: 'filter: drop-shadow(0 4px 8px rgba(250, 173, 20, 0.4));',
                text: 'color: #faad14; font-size: 20px;',
              }}
              strokeColor="#faad14"
            />
          </Flex>
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

  .control-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 16px;
    font-weight: 600;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    background: var(--ant-color-bg-container, #fff);
    border: 1px solid var(--ant-color-border, #d9d9d9);
    border-radius: var(--ant-border-radius, 6px);
    cursor: pointer;
    transition: all 0.2s;
  }

  .control-btn:hover {
    color: var(--ant-color-primary, #1677ff);
    border-color: var(--ant-color-primary, #1677ff);
  }

  .label {
    font-size: 12px;
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
  }
</style>

