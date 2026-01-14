import type { Snippet } from 'svelte';
import type { Component } from 'svelte';

/**
 * Text type variants for semantic coloring
 */
export const TextTypes = ['secondary', 'success', 'warning', 'danger'] as const;
export type TextType = (typeof TextTypes)[number];

/**
 * Title levels (h1-h5)
 */
export const TitleLevels = [1, 2, 3, 4, 5] as const;
export type TitleLevel = (typeof TitleLevels)[number];

/**
 * Configuration for copyable feature
 */
export interface CopyConfig {
  /** Text to copy. If not provided, uses the text content */
  text?: string | (() => string | Promise<string>);
  /** Callback after copy */
  onCopy?: (text: string) => void;
  /** Custom icon(s): [copyIcon, copiedIcon] or single icon for both states */
  icon?: Snippet | [Snippet, Snippet] | Component | [Component, Component];
  /** Custom tooltips: [copyTooltip, copiedTooltip] or single tooltip for both states */
  tooltips?: boolean | string | [string, string];
  /** Format of the text to copy */
  format?: 'text/plain' | 'text/html';
  /** Tab index for the copy button */
  tabIndex?: number;
}

/**
 * Configuration for editable feature
 */
export interface EditConfig {
  /** Text to edit. If not provided, uses the text content */
  text?: string;
  /** Whether editing mode is active (controlled) */
  editing?: boolean;
  /** Custom edit icon */
  icon?: Snippet | Component;
  /** Custom tooltip for edit button */
  tooltip?: boolean | string;
  /** Callback when editing starts */
  onStart?: () => void;
  /** Callback when text is changed (on save) */
  onChange?: (value: string) => void;
  /** Callback when editing is cancelled */
  onCancel?: () => void;
  /** Callback when editing ends (after save or cancel) */
  onEnd?: () => void;
  /** Max length for input */
  maxLength?: number;
  /** Whether to auto-resize textarea */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /** How to trigger edit mode: 'icon' | 'text' | both */
  triggerType?: ('icon' | 'text')[];
  /** Custom enter icon */
  enterIcon?: Snippet | Component;
  /** Tab index for the edit button */
  tabIndex?: number;
}

/**
 * Base typography props shared across components
 */
export interface BaseTypographyProps {
  /** Semantic type for text color */
  type?: TextType;
  /** Whether the text is disabled */
  disabled?: boolean;
  /** Whether to render as bold */
  strong?: boolean;
  /** Whether to render as italic */
  italic?: boolean;
  /** Whether to render with underline */
  underline?: boolean;
  /** Whether to render with strikethrough */
  delete?: boolean;
  /** Whether to render as code */
  code?: boolean;
  /** Whether to render as marked/highlighted */
  mark?: boolean;
  /** Whether to render as keyboard key */
  keyboard?: boolean;
  /** Whether the text can be copied */
  copyable?: boolean | CopyConfig;
  /** Whether the text can be edited inline */
  editable?: boolean | EditConfig;
  /** Custom class prefix */
  prefixCls?: string;
  /** Additional class name */
  class?: string;
  /** Custom style */
  style?: string;
  /** Content */
  children?: Snippet;
}

/**
 * Text component props
 */
export interface TextProps extends BaseTypographyProps {
  /** Click handler */
  onclick?: (e: MouseEvent) => void;
}

/**
 * Title component props
 */
export interface TitleProps extends Omit<BaseTypographyProps, 'code' | 'keyboard'> {
  /** Heading level (1-5) */
  level?: TitleLevel;
  /** Click handler */
  onclick?: (e: MouseEvent) => void;
}

/**
 * Paragraph component props
 */
export interface ParagraphProps extends BaseTypographyProps {
  /** Click handler */
  onclick?: (e: MouseEvent) => void;
}

/**
 * Link component props
 */
export interface LinkProps extends Omit<BaseTypographyProps, 'code' | 'keyboard'> {
  /** Link URL */
  href?: string;
  /** Link target */
  target?: string;
  /** Click handler */
  onclick?: (e: MouseEvent) => void;
}

