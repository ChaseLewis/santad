import type { Snippet } from 'svelte';
import type { SizeType } from '../../theme';
import type { HTMLAttributes } from 'svelte/elements';

/**
 * Gap size presets
 */
export const GapSizes = ['small', 'middle', 'large'] as const;
export type GapSize = (typeof GapSizes)[number];

/**
 * Flex wrap options
 */
export type FlexWrap = boolean | 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Flex justify content options
 */
export type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'normal';

/**
 * Flex align items options
 */
export type FlexAlign =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'
  | 'start'
  | 'end'
  | 'normal';

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
export function isPresetGap(gap: unknown): gap is GapSize {
  return typeof gap === 'string' && GapSizes.includes(gap as GapSize);
}

/**
 * Convert gap preset to CSS value
 * Note: Using hardcoded values because CSS variables may not resolve
 * correctly in all Svelte component contexts
 */
const gapMap: Record<GapSize, string> = {
  small: '8px',
  middle: '16px',
  large: '24px',
};

export function getGapValue(gap: GapSize | string | number | undefined): string | undefined {
  if (gap === undefined) return undefined;

  if (isPresetGap(gap)) {
    return gapMap[gap];
  }

  if (typeof gap === 'number') {
    return `${gap}px`;
  }

  return gap;
}

