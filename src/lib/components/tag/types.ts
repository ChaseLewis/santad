import type { Snippet } from 'svelte';

/**
 * Preset color types for Tag
 */
export const PresetColors = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'gold',
  'lime',
] as const;
export type PresetColorKey = (typeof PresetColors)[number];

/**
 * Preset status colors for Tag
 */
export const PresetStatusColors = ['success', 'processing', 'error', 'default', 'warning'] as const;
export type PresetStatusColorType = (typeof PresetStatusColors)[number];

/**
 * Tag variant types
 */
export const TagVariants = ['filled', 'solid', 'outlined'] as const;
export type TagVariant = (typeof TagVariants)[number];

/**
 * Check if color is a preset color
 */
export function isPresetColor(color?: string): color is PresetColorKey {
  return PresetColors.includes(color as PresetColorKey);
}

/**
 * Check if color is a status color
 */
export function isPresetStatusColor(color?: string): color is PresetStatusColorType {
  return PresetStatusColors.includes(color as PresetStatusColorType);
}

/**
 * Semantic class names for Tag component parts
 */
export interface TagClassNames {
  /** Root tag element */
  root?: string;
  /** Icon container */
  icon?: string;
  /** Content container */
  content?: string;
  /** Close icon */
  closeIcon?: string;
}

/**
 * Semantic styles for Tag component parts
 */
export interface TagStyles {
  /** Root tag element */
  root?: string;
  /** Icon container */
  icon?: string;
  /** Content container */
  content?: string;
  /** Close icon */
  closeIcon?: string;
}

/**
 * Tag props
 */
export interface TagProps {
  /** Tag color - can be preset color, status color, or custom hex/rgb */
  color?: PresetColorKey | PresetStatusColorType | string;
  /** Tag variant style */
  variant?: TagVariant;
  /** Whether the tag can be closed */
  closable?: boolean;
  /** Custom close icon */
  closeIcon?: Snippet;
  /** Callback when tag is closed */
  onclose?: (e: MouseEvent) => void;
  /** Icon to display before content */
  icon?: Snippet;
  /** Whether tag is visible */
  visible?: boolean;
  /** Link href (renders as anchor) */
  href?: string;
  /** Link target */
  target?: string;
  /** Whether the tag is disabled */
  disabled?: boolean;
  /** Custom class prefix */
  prefixCls?: string;
  /** Additional class name */
  class?: string;
  /** Semantic class names for component parts */
  classNames?: TagClassNames;
  /** Semantic inline styles for component parts */
  styles?: TagStyles;
  /** Tag content */
  children?: Snippet;
  /** Click handler */
  onclick?: (e: MouseEvent) => void;
}

/**
 * CheckableTag props
 */
export interface CheckableTagProps {
  /** Whether the tag is checked (controlled) */
  checked: boolean;
  /** Callback when checked state changes */
  onchange?: (checked: boolean) => void;
  /** Click handler */
  onclick?: (e: MouseEvent) => void;
  /** Icon to display */
  icon?: Snippet;
  /** Whether the tag is disabled */
  disabled?: boolean;
  /** Custom class prefix */
  prefixCls?: string;
  /** Additional class name */
  class?: string;
  /** Custom style */
  style?: string;
  /** Tag content */
  children?: Snippet;
}

