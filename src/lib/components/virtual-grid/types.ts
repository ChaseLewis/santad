import type { Snippet } from 'svelte';

/**
 * Virtual grid cell render context
 */
export interface VirtualGridCellContext<T = unknown> {
  /** The cell data */
  item: T;
  /** The row index */
  rowIndex: number;
  /** The column index */
  columnIndex: number;
  /** The flat index in the items array */
  index: number;
  /** Computed style for absolute positioning */
  style: string;
}

/**
 * Semantic class names for VirtualGrid component parts
 */
export interface VirtualGridClassNames {
  /** Root container element */
  root?: string;
  /** Inner content container (the scrollable phantom) */
  content?: string;
  /** Individual cell wrapper */
  cell?: string;
}

/**
 * Semantic styles for VirtualGrid component parts
 */
export interface VirtualGridStyles {
  /** Root container element */
  root?: string;
  /** Inner content container */
  content?: string;
  /** Individual cell wrapper */
  cell?: string;
}

/**
 * VirtualGrid props
 */
export interface VirtualGridProps<T = unknown> {
  /** Array of items to render (flattened, row-major order) */
  items: T[];
  /** Fixed width of each cell in pixels */
  cellWidth: number;
  /** Fixed height of each cell in pixels */
  cellHeight: number;
  /** Height of the visible viewport in pixels */
  height: number;
  /** Width of the visible viewport in pixels */
  width: number;
  /** Number of columns (if not set, computed from width/cellWidth) */
  columns?: number;
  /** Minimum gap between cells in pixels */
  gap?: number;
  /** How to justify items horizontally: 'start' | 'center' | 'space-between' | 'space-evenly' */
  justify?: 'start' | 'center' | 'space-between' | 'space-evenly';
  /** Internal padding around the grid content (number for all sides, or {x, y} for horizontal/vertical) */
  padding?: number | { x?: number; y?: number };
  /** Number of rows to render above/below visible area (buffer) */
  overscan?: number;
  /** Render snippet for each cell - receives VirtualGridCellContext */
  renderCell: Snippet<[VirtualGridCellContext<T>]>;
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
  classNames?: VirtualGridClassNames;
  /** Semantic inline styles for component parts */
  styles?: VirtualGridStyles;
}

/**
 * Scroll event info passed to callbacks
 */
export interface VirtualGridScrollInfo {
  /** Current scroll offset from top */
  scrollTop: number;
  /** Current scroll offset from left */
  scrollLeft: number;
  /** Index of first visible row */
  startRowIndex: number;
  /** Index of last visible row */
  endRowIndex: number;
  /** Whether scrolled to the bottom */
  isAtBottom: boolean;
}

