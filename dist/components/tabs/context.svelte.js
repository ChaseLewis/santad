import { getContext, setContext } from 'svelte';
const TABS_CONTEXT_KEY = Symbol.for('santad-tabs');
/** Reactive tabs state that can be shared via context */
export class TabsState {
    constructor(initialActiveKey = '', initialType = 'line') {
        this.registeredPanes = $state([]);
        this.activeKey = $state('');
        this.type = $state('line');
        this.flex = $state(false);
        this.position = $state('top');
        this.activeKey = initialActiveKey;
        this.type = initialType;
    }
    register(pane) {
        // Check if pane already registered (prevent duplicates)
        const existingIndex = this.registeredPanes.findIndex(p => p.key === pane.key);
        if (existingIndex >= 0) {
            // Update existing pane
            this.registeredPanes = [
                ...this.registeredPanes.slice(0, existingIndex),
                pane,
                ...this.registeredPanes.slice(existingIndex + 1)
            ];
        }
        else {
            // Add new pane
            this.registeredPanes = [...this.registeredPanes, pane];
        }
        // Return unregister function
        return () => {
            this.registeredPanes = this.registeredPanes.filter(p => p.key !== pane.key);
        };
    }
    setActiveKey(key) {
        this.activeKey = key;
    }
}
export function setTabsContext(state) {
    setContext(TABS_CONTEXT_KEY, state);
}
export function getTabsContext() {
    return getContext(TABS_CONTEXT_KEY);
}
