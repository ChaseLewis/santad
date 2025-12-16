import type { Snippet } from 'svelte';
/**
 * Gap size presets
 */
export declare const GapSizes: readonly ["small", "middle", "large"];
export type GapSize = (typeof GapSizes)[number];
/**
 * Flex wrap options
 */
export type FlexWrap = boolean | 'nowrap' | 'wrap' | 'wrap-reverse';
/**
 * Flex justify content options
 */
export type FlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'normal';
/**
 * Flex align items options
 */
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | 'start' | 'end' | 'normal';
/**
 * Semantic class names for Flex component parts
 */
export interface FlexClassNames {
    /** Root flex container */
    root?: string;
}
/**
 * Semantic styles for Flex component parts
 */
export interface FlexStyles {
    /** Root flex container */
    root?: string;
}
/**
 * Flex props
 */
export interface FlexProps {
    /** Whether to display vertically */
    vertical?: boolean;
    /** Flex wrap behavior */
    wrap?: FlexWrap;
    /** Justify content */
    justify?: FlexJustify;
    /** Align items */
    align?: FlexAlign;
    /** Flex CSS property value */
    flex?: string | number;
    /** Gap between items (preset name or CSS value) */
    gap?: GapSize | string | number;
    /** Custom element tag */
    component?: keyof HTMLElementTagNameMap;
    /** Custom class prefix */
    prefixCls?: string;
    /** Additional class name */
    class?: string;
    /** Semantic class names for component parts (Ant Design 6.0 style) */
    classNames?: FlexClassNames;
    /** Inline styles */
    style?: string;
    /** Semantic inline styles for component parts (Ant Design 6.0 style) */
    styles?: FlexStyles;
    /** Children */
    children: Snippet;
}
/**
 * Check if gap is a preset size
 */
export declare function isPresetGap(gap: unknown): gap is GapSize;
export declare function getGapValue(gap: GapSize | string | number | undefined): string | undefined;
