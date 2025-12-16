import type { Snippet } from 'svelte';
import type { SizeType } from '../../theme';
export type TabsType = 'line' | 'card' | 'editable-card';
export type TabPosition = 'top' | 'right' | 'bottom' | 'left';
export type TabPlacement = 'top' | 'bottom' | 'start' | 'end';
/** Internal registration for tab panes */
export interface TabPaneRegistration {
    key: string;
    label: string | Snippet;
    disabled: boolean;
    closable: boolean;
    icon?: Snippet;
    closeIcon?: Snippet;
    children: Snippet;
    forceRender: boolean;
    onClose?: () => void;
}
export interface TabsClassNames {
    root?: string;
    nav?: string;
    navWrap?: string;
    navList?: string;
    tab?: string;
    tabActive?: string;
    tabDisabled?: string;
    indicator?: string;
    content?: string;
    tabPane?: string;
    addButton?: string;
}
export interface TabsStyles {
    root?: string;
    nav?: string;
    navWrap?: string;
    navList?: string;
    tab?: string;
    tabActive?: string;
    indicator?: string;
    content?: string;
    tabPane?: string;
    addButton?: string;
}
export interface TabsProps {
    /** Current active tab key (controlled) */
    activeKey?: string;
    /** Default active tab key (uncontrolled) */
    defaultActiveKey?: string;
    /** Type of tabs */
    type?: TabsType;
    /** Size of tabs */
    size?: SizeType;
    /** Position of tabs (deprecated, use tabPlacement) */
    tabPosition?: TabPosition;
    /** Placement of tabs */
    tabPlacement?: TabPlacement;
    /** Whether tabs are centered */
    centered?: boolean;
    /**
     * Makes the tabs component flex to fill its container.
     * - `true` or `1`: Uses flex: 1
     * - A number: Uses that value as flex-grow
     * - Automatically handles content stretching for all tab positions
     */
    flex?: boolean | number;
    /**
     * Gap between tab bar and content panel (in pixels).
     * Default is 16. Set to 0 for no gap.
     */
    tabBarGap?: number;
    /** Whether to hide the add button (for editable-card) */
    hideAdd?: boolean;
    /** Whether tabs are animated */
    animated?: boolean | {
        inkBar?: boolean;
        tabPane?: boolean;
    };
    /** Tab bar gutter */
    tabBarGutter?: number;
    /** Extra content in tab bar */
    tabBarExtraContent?: Snippet | {
        left?: Snippet;
        right?: Snippet;
    };
    /** Callback when active tab changes */
    onChange?: (activeKey: string) => void;
    /** Callback when tab is clicked */
    onTabClick?: (activeKey: string, event: MouseEvent) => void;
    /** Callback when add button is clicked (editable-card type) */
    onAdd?: () => void;
    /** Callback when tab scroll */
    onTabScroll?: (info: {
        direction: 'left' | 'right' | 'top' | 'bottom';
    }) => void;
    /** Whether to destroy inactive tab panes */
    destroyOnHidden?: boolean;
    /** Custom add icon (for editable-card) */
    addIcon?: Snippet;
    /** Custom remove icon (for editable-card) */
    removeIcon?: Snippet;
    /** Custom more icon (for overflow dropdown) */
    moreIcon?: Snippet;
    /** Custom class name */
    class?: string;
    /** Custom style */
    style?: string;
    /** Semantic class names */
    classNames?: TabsClassNames;
    /** Semantic styles */
    styles?: TabsStyles;
    /** ID attribute */
    id?: string;
    /** Children (TabPane components) */
    children?: Snippet;
}
export interface TabPaneProps {
    /** Unique key for the tab */
    key: string;
    /** Tab label */
    label: string | Snippet;
    /** Whether disabled */
    disabled?: boolean;
    /** Whether to force render even when inactive */
    forceRender?: boolean;
    /** Whether closable (editable-card) */
    closable?: boolean;
    /** Icon displayed before the label */
    icon?: Snippet;
    /** Close icon (overrides default) */
    closeIcon?: Snippet;
    /** Callback when close button is clicked */
    onClose?: () => void;
    /** Custom class */
    class?: string;
    /** Custom style */
    style?: string;
    /** Children content */
    children?: Snippet;
}
