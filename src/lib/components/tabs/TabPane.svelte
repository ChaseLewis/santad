<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { getTabsContext } from './context.svelte';
  import type { TabPaneProps, TabPaneRegistration } from './types';
  import type { Snippet } from 'svelte';

  type Props = TabPaneProps;

  let {
    key,
    label,
    disabled = false,
    forceRender = false,
    closable = true,
    icon,
    closeIcon,
    onClose,
    class: className = '',
    style = '',
    children,
  }: Props = $props();

  // Get the parent Tabs context
  const tabsState = getTabsContext();

  if (!tabsState) {
    console.warn('TabPane must be used within a Tabs component');
  }


  // Store unregister function
  let unregister: (() => void) | undefined;

  // A dummy snippet that we'll pass - actual content is rendered by TabPane itself
  const dummyChildren: Snippet = () => {};

  // Register on mount
  onMount(() => {
    if (!tabsState) return;

    // Register this pane with the parent Tabs (for tab list rendering)
    const registration: TabPaneRegistration = {
      key,
      label,
      disabled,
      closable,
      icon,
      closeIcon,
      children: dummyChildren, // Actual content rendered by this component
      forceRender,
      onClose,
    };

    unregister = tabsState.register(registration);
  });

  // Cleanup on destroy
  onDestroy(() => {
    unregister?.();
  });

  // Derive isActive directly from context
  const isActive = $derived(tabsState?.activeKey === key);
  
  // Check if parent has flex enabled
  const isFlex = $derived(tabsState?.flex ?? false);
  
  // Get tab position for border-radius adjustment
  const position = $derived(tabsState?.position ?? 'top');
  
  // Build base class list (without active/hidden state)
  const baseClass = $derived([
    'ant-tabs-tabpane',
    isFlex && 'ant-tabs-tabpane-flex',
    isFlex && `ant-tabs-tabpane-flex-${position}`,
    className,
  ].filter(Boolean).join(' '));
</script>

<!-- TabPane renders its own content - hidden via CSS when inactive -->
{#if children}
  <div
    class="{baseClass} {isActive ? 'ant-tabs-tabpane-active' : 'ant-tabs-tabpane-hidden'}"
    {style}
    role="tabpanel"
    aria-hidden={!isActive}
    tabindex={isActive ? 0 : -1}
  >
    {@render children()}
  </div>
{/if}

<style>
  :global(.ant-tabs-tabpane) {
    outline: none;
  }

  :global(.ant-tabs-tabpane-hidden) {
    display: none;
  }

  /* Default styling when parent Tabs has flex enabled */
  :global(.ant-tabs-tabpane-flex) {
    height: 100%;
    padding: 16px;
    background-color: var(--ant-color-bg-layout, #f5f5f5);
    overflow: auto;
  }

  /* Position-specific border-radius: no radius on the side touching tabs */
  :global(.ant-tabs-tabpane-flex-top) {
    border-radius: 0 0 var(--ant-border-radius, 6px) var(--ant-border-radius, 6px);
  }

  :global(.ant-tabs-tabpane-flex-bottom) {
    border-radius: var(--ant-border-radius, 6px) var(--ant-border-radius, 6px) 0 0;
  }

  :global(.ant-tabs-tabpane-flex-left) {
    border-radius: 0 var(--ant-border-radius, 6px) var(--ant-border-radius, 6px) 0;
  }

  :global(.ant-tabs-tabpane-flex-right) {
    border-radius: var(--ant-border-radius, 6px) 0 0 var(--ant-border-radius, 6px);
  }

  :global(.ant-tabs-tabpane-flex) > p:first-child,
  :global(.ant-tabs-tabpane-flex) > :first-child {
    margin-top: 0;
  }

  :global(.ant-tabs-tabpane-flex) > p:last-child,
  :global(.ant-tabs-tabpane-flex) > :last-child {
    margin-bottom: 0;
  }

  :global(.ant-tabs-tabpane-flex) p {
    margin: 0 0 8px;
  }

  :global(.ant-tabs-tabpane-flex) code {
    background: var(--ant-color-fill-tertiary, rgba(0, 0, 0, 0.04));
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
    font-size: 0.9em;
  }
</style>
