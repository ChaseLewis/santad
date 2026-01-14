import type { Snippet } from 'svelte';

/**
 * Icon theme types
 */
export type IconTheme = 'outlined' | 'filled' | 'twotone';

/**
 * Base Icon props
 */
export interface IconProps {
  /** Custom class name */
  class?: string;
  /** Custom style */
  style?: string;
  /** Whether the icon should spin */
  spin?: boolean;
  /** Rotation angle in degrees */
  rotate?: number;
  /** Two-tone icon primary color (only for twotone theme) */
  twoToneColor?: string | [string, string];
  /** Tab index for accessibility */
  tabindex?: number;
  /** Click handler */
  onclick?: (e: MouseEvent) => void;
  /** Custom prefix class */
  prefixCls?: string;
  /** Aria label for accessibility */
  'aria-label'?: string;
}

/**
 * Custom Icon props - for creating icons from SVG paths or snippets
 */
export interface CustomIconProps extends IconProps {
  /** SVG viewBox attribute */
  viewBox?: string;
  /** Icon content as a snippet */
  children?: Snippet;
}

/**
 * Icon definition structure (compatible with @ant-design/icons-svg)
 */
export interface IconDefinition {
  name: string;
  theme: IconTheme;
  icon: {
    tag: string;
    attrs: Record<string, string>;
    children?: IconDefinition['icon'][];
  };
}

/**
 * Semantic class names for Icon
 */
export interface IconClassNames {
  root?: string;
  svg?: string;
}

/**
 * Semantic styles for Icon
 */
export interface IconStyles {
  root?: string;
  svg?: string;
}

