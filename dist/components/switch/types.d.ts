import type { Snippet } from 'svelte';
/**
 * Switch size options
 */
export type SwitchSize = 'default' | 'small';
/**
 * Semantic class names for Switch component parts
 */
export interface SwitchClassNames {
    /** Root switch element */
    root?: string;
    /** Switch handle */
    handle?: string;
    /** Inner content area */
    inner?: string;
}
/**
 * Semantic styles for Switch component parts
 */
export interface SwitchStyles {
    /** Root switch element */
    root?: string;
    /** Switch handle */
    handle?: string;
    /** Inner content area */
    inner?: string;
}
/**
 * Switch props
 */
export interface SwitchProps {
    /** Whether the switch is checked */
    checked?: boolean;
    /** Default checked state (uncontrolled) */
    defaultChecked?: boolean;
    /** Whether the switch is disabled */
    disabled?: boolean;
    /** Whether the switch is in loading state */
    loading?: boolean;
    /** Switch size */
    size?: SwitchSize;
    /** Content when checked */
    checkedChildren?: Snippet | string;
    /** Content when unchecked */
    unCheckedChildren?: Snippet | string;
    /** Tab index */
    tabIndex?: number;
    /** Auto focus on mount */
    autoFocus?: boolean;
    /** Custom class prefix */
    prefixCls?: string;
    /** Additional class name */
    class?: string;
    /** Semantic class names for component parts */
    classNames?: SwitchClassNames;
    /** Inline styles */
    style?: string;
    /** Semantic inline styles for component parts */
    styles?: SwitchStyles;
    /** Change handler */
    onchange?: (checked: boolean) => void;
    /** Click handler */
    onclick?: (checked: boolean, event: MouseEvent) => void;
}
