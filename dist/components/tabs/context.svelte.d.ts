import type { TabPaneRegistration, TabsType, TabPosition } from './types';
/** Reactive tabs state that can be shared via context */
export declare class TabsState {
    registeredPanes: TabPaneRegistration[];
    activeKey: string;
    type: TabsType;
    flex: boolean;
    position: TabPosition;
    constructor(initialActiveKey?: string, initialType?: TabsType);
    register(pane: TabPaneRegistration): () => void;
    setActiveKey(key: string): void;
}
export declare function setTabsContext(state: TabsState): void;
export declare function getTabsContext(): TabsState | undefined;
