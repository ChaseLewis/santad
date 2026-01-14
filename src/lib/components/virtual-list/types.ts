import type { Snippet } from 'svelte';

/**
 * Virtual list item render context
 */
export interface VirtualListItemContext<T = unknown> {
  /** The item data */
  item: T;
  /** The index of the item in the full list */
  index: number;
  /** Computed style for absolute positioning */
  style: string;
}

/**
 * Semantic class names for VirtualList component parts
 */
export interface VirtualListClassNames {
  /** Root container element */
  root?: string;
  /** Inner content container (the scrollable phantom) */
  content?: string;
  /** Individual item wrapper */
  item?: string;
}

/**
 * Semantic styles for VirtualList component parts
 */
export interface VirtualListStyles {
  /** Root container element */
  root?: string;
  /** Inner content container */
  content?: string;
  /** Individual item wrapper */
  item?: string;
}

/**
 * VirtualList props
 */
export interface VirtualListProps<T = unknown> {
  /** Array of items to render */
  items: T[];
  /** Fixed height of each item in pixels */
  itemHeight: number;
  /** Height of the visible viewport in pixels */
  height: number;
  /** Width of the list (default: 100%) */
  width?: number | string;
  /** Number of items to render above/below visible area (buffer) */
  overscan?: number;
  /** Render snippet for each item - receives VirtualListItemContext */
  renderItem: Snippet<[VirtualListItemContext<T>]>;
  /** Custom key function for items (defaults to index) */
  getKey?: (item: T, index: number) => string | number;
  /** Callback fired when scroll reaches near the end */
  onLoadMore?: () => void;
  /** Threshold from bottom to trigger onLoadMore (in pixels) */
  loadMoreThreshold?: number;
  /** Whether loading more items is in progress */
  loading?: boolean;
  /** Loading indicator snippet */
  loadingIndicator?: Snippet;
  /** Custom class prefix */
  prefixCls?: string;
  /** Additional class name */
  class?: string;
  /** Semantic class names for component parts */
  classNames?: VirtualListClassNames;
  /** Semantic inline styles for component parts */
  styles?: VirtualListStyles;
}

/**
 * Scroll event info passed to callbacks
 */
export interface VirtualListScrollInfo {
  /** Current scroll offset from top */
  scrollTop: number;
  /** Index of first visible item */
  startIndex: number;
  /** Index of last visible item */
  endIndex: number;
  /** Whether scrolled to the bottom */
  isAtBottom: boolean;
}

