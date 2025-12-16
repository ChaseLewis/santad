import { getContext, setContext } from 'svelte';
import type { TabPaneRegistration, TabsType, TabPosition } from './types';
import type { Snippet } from 'svelte';

const TABS_CONTEXT_KEY = Symbol.for('santad-tabs');

/** Reactive tabs state that can be shared via context */
export class TabsState {
  registeredPanes = $state<TabPaneRegistration[]>([]);
  activeKey = $state('');
  type = $state<TabsType>('line');
  flex = $state(false);
  position = $state<TabPosition>('top');

  constructor(
    initialActiveKey: string = '', 
    initialType: TabsType = 'line',
    initialFlex: boolean = false,
    initialPosition: TabPosition = 'top'
  ) {
    this.activeKey = initialActiveKey;
    this.type = initialType;
    this.flex = initialFlex;
    this.position = initialPosition;
  }

  register(pane: TabPaneRegistration) {
    // Check if pane already registered (prevent duplicates)
    const existingIndex = this.registeredPanes.findIndex(p => p.key === pane.key);
    if (existingIndex >= 0) {
      // Update existing pane
      this.registeredPanes = [
        ...this.registeredPanes.slice(0, existingIndex),
        pane,
        ...this.registeredPanes.slice(existingIndex + 1)
      ];
    } else {
      // Add new pane
      this.registeredPanes = [...this.registeredPanes, pane];
    }
    
    // Return unregister function
    return () => {
      this.registeredPanes = this.registeredPanes.filter(p => p.key !== pane.key);
    };
  }

  setActiveKey(key: string) {
    this.activeKey = key;
  }
}

export function setTabsContext(state: TabsState) {
  setContext(TABS_CONTEXT_KEY, state);
}

export function getTabsContext(): TabsState | undefined {
  return getContext<TabsState>(TABS_CONTEXT_KEY);
}

