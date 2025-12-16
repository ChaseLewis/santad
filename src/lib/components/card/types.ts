import type { Snippet } from 'svelte';

/**
 * Card size options
 */
export type CardSize = 'default' | 'small';

/**
 * Card variant options
 */
export type CardVariant = 'outlined' | 'borderless';

/**
 * Semantic class names for Card component parts
 */
export interface CardClassNames {
  /** Root card element */
  root?: string;
  /** Header section */
  header?: string;
  /** Title element */
  title?: string;
  /** Extra content area */
  extra?: string;
  /** Cover image/media area */
  cover?: string;
  /** Body content area */
  body?: string;
  /** Actions footer */
  actions?: string;
}

/**
 * Semantic styles for Card component parts
 */
export interface CardStyles {
  /** Root card element */
  root?: string;
  /** Header section */
  header?: string;
  /** Title element */
  title?: string;
  /** Extra content area */
  extra?: string;
  /** Cover image/media area */
  cover?: string;
  /** Body content area */
  body?: string;
  /** Actions footer */
  actions?: string;
}

/**
 * Card props
 */
export interface CardProps {
  /** Card title */
  title?: Snippet | string;
  /** Extra content in header (e.g., actions) */
  extra?: Snippet;
  /** Cover image/media */
  cover?: Snippet;
  /** Footer actions */
  actions?: Snippet[];
  /** Card size */
  size?: CardSize;
  /** Card variant */
  variant?: CardVariant;
  /** Whether card is in loading state */
  loading?: boolean;
  /** Whether card shows hover effect */
  hoverable?: boolean;
  /** Custom class prefix */
  prefixCls?: string;
  /** Additional class name */
  class?: string;
  /** Semantic class names for component parts */
  classNames?: CardClassNames;
  /** Inline styles */
  style?: string;
  /** Semantic inline styles for component parts */
  styles?: CardStyles;
  /** Card body content */
  children?: Snippet;
  /** Click handler */
  onclick?: (e: MouseEvent) => void;
}

