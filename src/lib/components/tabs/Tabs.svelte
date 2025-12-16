<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import { TabsState, setTabsContext } from './context.svelte';
  import type { TabsProps, TabPosition } from './types';
  import type { Snippet } from 'svelte';

  type Props = TabsProps;

  let {
    activeKey: controlledActiveKey = $bindable(),
    defaultActiveKey,
    type = 'line',
    size: customSize,
    tabPosition,
    tabPlacement = 'top',
    centered = false,
    flex = false,
    tabBarGap,
    hideAdd = false,
    animated = true,
    tabBarGutter,
    tabBarExtraContent,
    onChange,
    onTabClick,
    onAdd,
    onTabScroll,
    destroyOnHidden = false,
    addIcon,
    removeIcon,
    moreIcon,
    class: className = '',
    style = '',
    classNames = {},
    styles = {},
    id,
    children,
  }: Props = $props();

  const config = getConfigContext();
  const prefixCls = $derived(config.prefixCls ? `${config.prefixCls}-tabs` : 'ant-tabs');
  const mergedSize = $derived(customSize ?? config.size ?? 'middle');

  // Convert tabPlacement to tabPosition for internal use
  const mergedPosition = $derived<TabPosition>(
    tabPlacement === 'start' ? 'left' :
    tabPlacement === 'end' ? 'right' :
    (tabPlacement ?? tabPosition ?? 'top') as TabPosition
  );

  // Create shared state for tabs
  const tabsState = new TabsState(defaultActiveKey ?? '', type);

  // Set initial active key when first pane registers (if no default provided)
  $effect(() => {
    if (!tabsState.activeKey && !controlledActiveKey && tabsState.registeredPanes.length > 0) {
      tabsState.activeKey = tabsState.registeredPanes[0].key;
    }
  });

  // Sync controlled activeKey with state
  $effect(() => {
    if (controlledActiveKey !== undefined) {
      tabsState.activeKey = controlledActiveKey;
    }
  });

  // Sync type with state
  $effect(() => {
    tabsState.type = type;
  });

  // Sync flex with state
  $effect(() => {
    tabsState.flex = !!flex;
  });

  // Sync position with state
  $effect(() => {
    tabsState.position = mergedPosition;
  });

  // Set context
  setTabsContext(tabsState);

  // Computed current active key
  const currentActiveKey = $derived(controlledActiveKey ?? tabsState.activeKey);

  function handleTabClick(key: string, event: MouseEvent) {
    const pane = tabsState.registeredPanes.find(p => p.key === key);
    if (pane?.disabled) return;
    
    // Update internal state
    tabsState.activeKey = key;
    
    // Update controlled state if using bindable
    if (controlledActiveKey !== undefined) {
      controlledActiveKey = key;
    }
    
    onTabClick?.(key, event);
    
    if (currentActiveKey !== key) {
      onChange?.(key);
    }
  }

  function handleKeyDown(event: KeyboardEvent, key: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(key, event as unknown as MouseEvent);
    }
  }

  function handleAdd(event: MouseEvent | KeyboardEvent) {
    onAdd?.();
  }

  // Ink bar positioning
  let navListRef = $state<HTMLElement | null>(null);
  let inkBarStyle = $state('');

  $effect(() => {
    if (!navListRef || !currentActiveKey) return;
    
    const activeTab = navListRef.querySelector(`[data-key="${currentActiveKey}"]`) as HTMLElement;
    if (!activeTab) return;

    if (mergedPosition === 'top' || mergedPosition === 'bottom') {
      inkBarStyle = `left: ${activeTab.offsetLeft}px; width: ${activeTab.offsetWidth}px;`;
    } else {
      inkBarStyle = `top: ${activeTab.offsetTop}px; height: ${activeTab.offsetHeight}px;`;
    }
  });

  // Derived classes
  const isVertical = $derived(mergedPosition === 'left' || mergedPosition === 'right');
  const isEditable = $derived(type === 'editable-card');
  const showInkBar = $derived(type === 'line');

  // Compute flex value
  const flexValue = $derived(
    flex === true ? 1 : 
    typeof flex === 'number' ? flex : 
    undefined
  );

  const rootClass = $derived([
    prefixCls,
    `${prefixCls}-${mergedPosition}`,
    `${prefixCls}-${type}`,
    `${prefixCls}-${mergedSize}`,
    centered && `${prefixCls}-centered`,
    isVertical && `${prefixCls}-vertical`,
    flex && `${prefixCls}-flex`,
    className,
    classNames.root ?? '',
  ].filter(Boolean).join(' '));

  // Compute root style with flex
  const rootStyle = $derived(
    (flexValue !== undefined ? `flex: ${flexValue};` : '') +
    (styles.root ?? '') +
    style
  );

  // Compute nav style with gap override
  const navStyle = $derived(() => {
    let s = styles.nav ?? '';
    if (tabBarGap !== undefined) {
      // Override the default margin based on position
      if (mergedPosition === 'top') {
        s += `margin-bottom: ${tabBarGap}px;`;
      } else if (mergedPosition === 'bottom') {
        s += `margin-top: ${tabBarGap}px;`;
      } else if (mergedPosition === 'left') {
        s += `margin-right: ${tabBarGap}px;`;
      } else if (mergedPosition === 'right') {
        s += `margin-left: ${tabBarGap}px;`;
      }
    }
    return s;
  });
</script>

<!-- Tabs UI -->
<div
  class={rootClass}
  style={rootStyle}
  {id}
>
  <div class="{prefixCls}-nav {classNames.nav ?? ''}" style={navStyle()} role="tablist">
    <!-- Extra content left -->
    {#if tabBarExtraContent}
      {#if typeof tabBarExtraContent === 'object' && 'left' in tabBarExtraContent}
        <div class="{prefixCls}-extra-content {prefixCls}-extra-content-left">
          {@render tabBarExtraContent.left?.()}
        </div>
      {/if}
    {/if}

    <div class="{prefixCls}-nav-wrap {classNames.navWrap ?? ''}" style={styles.navWrap}>
      <div
        class="{prefixCls}-nav-list {classNames.navList ?? ''}"
        style={styles.navList}
        bind:this={navListRef}
      >
        {#each tabsState.registeredPanes as pane, index (pane.key)}
          {@const isActive = currentActiveKey === pane.key}
          {@const isDisabled = pane.disabled}
          <div
            class="{prefixCls}-tab {isActive ? `${prefixCls}-tab-active` : ''} {isDisabled ? `${prefixCls}-tab-disabled` : ''} {classNames.tab ?? ''} {isActive ? classNames.tabActive ?? '' : ''} {isDisabled ? classNames.tabDisabled ?? '' : ''}"
            style="{styles.tab ?? ''}{isActive ? styles.tabActive ?? '' : ''}{tabBarGutter && index > 0 ? `margin-left: ${tabBarGutter}px;` : ''}"
            role="tab"
            tabindex={isDisabled ? -1 : 0}
            aria-selected={isActive}
            aria-disabled={isDisabled}
            data-key={pane.key}
            onclick={(e) => handleTabClick(pane.key, e)}
            onkeydown={(e) => handleKeyDown(e, pane.key)}
          >
            <div class="{prefixCls}-tab-btn">
              {#if pane.icon}
                <span class="{prefixCls}-tab-icon">
                  {@render pane.icon()}
                </span>
              {/if}
              {#if typeof pane.label === 'string'}
                {pane.label}
              {:else if pane.label}
                {@render pane.label()}
              {/if}
            </div>
            {#if isEditable && pane.closable}
              <button
                type="button"
                class="{prefixCls}-tab-remove"
                aria-label="Remove tab"
                onclick={(e) => {
                  e.stopPropagation();
                  pane.onClose?.();
                }}
              >
                {#if pane.closeIcon}
                  {@render pane.closeIcon()}
                {:else if removeIcon}
                  {@render removeIcon()}
                {:else}
                  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
                  </svg>
                {/if}
              </button>
            {/if}
          </div>
        {/each}

        {#if isEditable && !hideAdd}
          <button
            type="button"
            class="{prefixCls}-nav-add {classNames.addButton ?? ''}"
            style={styles.addButton}
            aria-label="Add tab"
            onclick={handleAdd}
          >
            {#if addIcon}
              {@render addIcon()}
            {:else}
              <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
                <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
              </svg>
            {/if}
          </button>
        {/if}

        {#if showInkBar}
          <div
            class="{prefixCls}-ink-bar {prefixCls}-ink-bar-animated {classNames.indicator ?? ''}"
            style="{inkBarStyle}{styles.indicator ?? ''}"
          ></div>
        {/if}
      </div>
    </div>

    <!-- Extra content right -->
    {#if tabBarExtraContent}
      {#if typeof tabBarExtraContent === 'object' && 'right' in tabBarExtraContent}
        <div class="{prefixCls}-extra-content {prefixCls}-extra-content-right">
          {@render tabBarExtraContent.right?.()}
        </div>
      {:else if typeof tabBarExtraContent !== 'object' || !('left' in tabBarExtraContent)}
        <div class="{prefixCls}-extra-content">
          {@render (tabBarExtraContent as Snippet)()}
        </div>
      {/if}
    {/if}
  </div>

  <!-- Tab Content - rendered by TabPane children -->
  <div class="{prefixCls}-content-holder">
    <div class="{prefixCls}-content {classNames.content ?? ''}" style={styles.content}>
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>

<style>
  /* Base Tabs Styles */
  :global(.ant-tabs) {
    display: flex;
    font-family: var(--ant-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    font-size: var(--ant-font-size, 14px);
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    box-sizing: border-box;
  }

  :global(.ant-tabs-top),
  :global(.ant-tabs-bottom) {
    flex-direction: column;
  }

  :global(.ant-tabs-left),
  :global(.ant-tabs-right) {
    flex-direction: row;
  }

  :global(.ant-tabs-right) {
    flex-direction: row-reverse;
  }

  :global(.ant-tabs-bottom) {
    flex-direction: column-reverse;
  }

  /* Navigation */
  :global(.ant-tabs-nav) {
    display: flex;
    flex: none;
    align-items: center;
    position: relative;
  }

  :global(.ant-tabs-top > .ant-tabs-nav),
  :global(.ant-tabs-bottom > .ant-tabs-nav) {
    margin-bottom: 16px;
  }

  :global(.ant-tabs-bottom > .ant-tabs-nav) {
    margin-bottom: 0;
    margin-top: 16px;
  }

  :global(.ant-tabs-left > .ant-tabs-nav),
  :global(.ant-tabs-right > .ant-tabs-nav) {
    flex-direction: column;
    min-width: 50px;
  }

  :global(.ant-tabs-left > .ant-tabs-nav) {
    margin-right: 16px;
  }

  :global(.ant-tabs-right > .ant-tabs-nav) {
    margin-left: 16px;
  }

  :global(.ant-tabs-nav-wrap) {
    display: flex;
    flex: auto;
    overflow: hidden;
    position: relative;
  }

  :global(.ant-tabs-nav-list) {
    display: flex;
    position: relative;
    transition: transform 0.3s;
  }

  :global(.ant-tabs-left .ant-tabs-nav-list),
  :global(.ant-tabs-right .ant-tabs-nav-list) {
    flex-direction: column;
  }

  /* Tab */
  :global(.ant-tabs-tab) {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 12px 0;
    font-size: var(--ant-font-size, 14px);
    background: transparent;
    border: 0;
    outline: none;
    cursor: pointer;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    transition: color 0.3s;
  }

  :global(.ant-tabs-top .ant-tabs-tab),
  :global(.ant-tabs-bottom .ant-tabs-tab) {
    margin: 0 32px 0 0;
  }

  :global(.ant-tabs-left .ant-tabs-tab),
  :global(.ant-tabs-right .ant-tabs-tab) {
    padding: 8px 24px;
    margin: 0 0 16px 0;
  }

  :global(.ant-tabs-tab:hover) {
    color: var(--ant-color-primary-hover, #4096ff);
  }

  :global(.ant-tabs-tab-active) {
    color: var(--ant-color-primary, #1677ff);
    font-weight: 500;
  }

  :global(.ant-tabs-tab-disabled) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
  }

  :global(.ant-tabs-tab-btn) {
    outline: none;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  :global(.ant-tabs-tab-icon) {
    display: inline-flex;
  }

  :global(.ant-tabs-tab-remove) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    padding: 0;
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
    font-size: 12px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.3s;
  }

  :global(.ant-tabs-tab-remove:hover) {
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  /* Ink Bar */
  :global(.ant-tabs-ink-bar) {
    position: absolute;
    background: var(--ant-color-primary, #1677ff);
    pointer-events: none;
  }

  :global(.ant-tabs-top .ant-tabs-ink-bar),
  :global(.ant-tabs-bottom .ant-tabs-ink-bar) {
    height: 2px;
    bottom: 0;
  }

  :global(.ant-tabs-bottom .ant-tabs-ink-bar) {
    top: 0;
    bottom: auto;
  }

  :global(.ant-tabs-left .ant-tabs-ink-bar),
  :global(.ant-tabs-right .ant-tabs-ink-bar) {
    width: 2px;
    right: 0;
  }

  :global(.ant-tabs-left .ant-tabs-ink-bar) {
    right: 0;
  }

  :global(.ant-tabs-right .ant-tabs-ink-bar) {
    left: 0;
  }

  :global(.ant-tabs-ink-bar-animated) {
    transition: width 0.3s, height 0.3s, left 0.3s, top 0.3s;
  }

  /* Content */
  :global(.ant-tabs-content-holder) {
    flex: auto;
    min-width: 0;
    min-height: 0;
  }

  :global(.ant-tabs-content) {
    position: relative;
    width: 100%;
  }

  :global(.ant-tabs-tabpane) {
    outline: none;
  }

  :global(.ant-tabs-tabpane-hidden) {
    display: none;
  }

  /* Centered */
  :global(.ant-tabs-centered > .ant-tabs-nav .ant-tabs-nav-wrap) {
    justify-content: center;
  }

  /* Flex - stretches content to fill container */
  :global(.ant-tabs-flex) {
    height: 100%;
  }

  :global(.ant-tabs-flex > .ant-tabs-content-holder) {
    flex: 1;
    min-height: 0;
    min-width: 0;
  }

  :global(.ant-tabs-flex > .ant-tabs-content-holder > .ant-tabs-content) {
    height: 100%;
  }

  :global(.ant-tabs-flex > .ant-tabs-content-holder > .ant-tabs-content > .ant-tabs-tabpane-active) {
    height: 100%;
  }

  /* For vertical tabs (left/right), make content expand horizontally */
  :global(.ant-tabs-flex.ant-tabs-left > .ant-tabs-content-holder),
  :global(.ant-tabs-flex.ant-tabs-right > .ant-tabs-content-holder) {
    flex: 1;
    width: 0;
  }

  /* Size Variants */
  :global(.ant-tabs-small > .ant-tabs-nav .ant-tabs-tab) {
    padding: 8px 0;
    font-size: var(--ant-font-size, 14px);
  }

  :global(.ant-tabs-large > .ant-tabs-nav .ant-tabs-tab) {
    padding: 16px 0;
    font-size: var(--ant-font-size-lg, 16px);
  }

  /* Card Type */
  :global(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab) {
    margin: 0;
    padding: 8px 16px;
    background: var(--ant-color-bg-container, #fafafa);
    border: 1px solid var(--ant-color-border-secondary, #f0f0f0);
    border-bottom: none;
    border-radius: var(--ant-border-radius-lg, 8px) var(--ant-border-radius-lg, 8px) 0 0;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  :global(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab:not(:first-child)) {
    margin-left: 2px;
  }

  :global(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active) {
    background: var(--ant-color-bg-container, #ffffff);
    border-color: var(--ant-color-border-secondary, #f0f0f0);
  }

  :global(.ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active) {
    border-bottom-color: var(--ant-color-bg-container, #ffffff);
  }

  /* Editable Card */
  :global(.ant-tabs-editable-card > .ant-tabs-nav .ant-tabs-tab) {
    padding: 8px 12px;
  }

  :global(.ant-tabs-nav-add) {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    margin-left: 2px;
    padding: 0 8px;
    background: var(--ant-color-bg-container, #fafafa);
    border: 1px solid var(--ant-color-border-secondary, #f0f0f0);
    border-bottom: none;
    border-radius: var(--ant-border-radius-lg, 8px) var(--ant-border-radius-lg, 8px) 0 0;
    outline: none;
    cursor: pointer;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    transition: all 0.3s;
  }

  :global(.ant-tabs-nav-add:hover) {
    color: var(--ant-color-primary, #1677ff);
  }

  /* Extra Content */
  :global(.ant-tabs-extra-content) {
    flex: none;
    display: flex;
    align-items: center;
  }

  :global(.ant-tabs-extra-content-left) {
    margin-right: 16px;
  }

  :global(.ant-tabs-extra-content-right) {
    margin-left: 16px;
  }

  /* Vertical tabs content positioning */
  :global(.ant-tabs-left > .ant-tabs-content-holder),
  :global(.ant-tabs-right > .ant-tabs-content-holder) {
    border-top: 0;
  }

  /* Border for line tabs */
  :global(.ant-tabs-top > .ant-tabs-nav::before),
  :global(.ant-tabs-bottom > .ant-tabs-nav::before) {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    border-bottom: 1px solid var(--ant-color-border-secondary, #f0f0f0);
  }

  :global(.ant-tabs-top > .ant-tabs-nav::before) {
    bottom: 0;
  }

  :global(.ant-tabs-bottom > .ant-tabs-nav::before) {
    top: 0;
  }

  :global(.ant-tabs-left > .ant-tabs-nav::before),
  :global(.ant-tabs-right > .ant-tabs-nav::before) {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    border-right: 1px solid var(--ant-color-border-secondary, #f0f0f0);
  }

  :global(.ant-tabs-left > .ant-tabs-nav::before) {
    right: 0;
  }

  :global(.ant-tabs-right > .ant-tabs-nav::before) {
    left: 0;
  }

  /* Card type removes bottom border line */
  :global(.ant-tabs-card > .ant-tabs-nav::before) {
    display: none;
  }
</style>
