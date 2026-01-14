import type { Snippet } from 'svelte';

export type ProgressType = 'line' | 'circle' | 'dashboard';

export type ProgressStatus = 'normal' | 'success' | 'exception' | 'active';

export type ProgressSize = 'small' | 'default';

export type ProgressStrokeLinecap = 'round' | 'butt' | 'square';

export interface ProgressClassNames {
  /** Root element */
  root?: string;
  /** Outer wrapper (line type) */
  outer?: string;
  /** Inner track */
  inner?: string;
  /** Progress bar/path */
  progress?: string;
  /** Trail/background */
  trail?: string;
  /** Text/info display */
  text?: string;
}

export interface ProgressStyles {
  /** Root element */
  root?: string;
  /** Inner track */
  inner?: string;
  /** Progress bar/path */
  progress?: string;
  /** Trail/background */
  trail?: string;
  /** Text/info display */
  text?: string;
}

export interface ProgressProps {
  /** Completion percentage (0-100) */
  percent?: number;
  /** Type of progress */
  type?: ProgressType;
  /** Status of the progress */
  status?: ProgressStatus;
  /** Whether to show progress info (percentage or status icon) */
  showInfo?: boolean;
  /** Stroke color of progress bar */
  strokeColor?: string | { from: string; to: string } | string[];
  /** Stroke linecap style */
  strokeLinecap?: ProgressStrokeLinecap;
  /** Width of the progress bar (line type) */
  strokeWidth?: number;
  /** Trail color (background) */
  trailColor?: string;
  /** Width of the progress circle (circle/dashboard type) */
  width?: number;
  /** Gap degree of dashboard type (0-295) */
  gapDegree?: number;
  /** Gap position of dashboard type */
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** Size of the progress */
  size?: ProgressSize | number | [number, number];
  /** Number of steps (renders as segmented progress) */
  steps?: number;
  /** Custom format function for displaying progress */
  format?: (percent: number) => string;
  /** Custom info content */
  info?: Snippet;
  /** Custom prefix class */
  prefixCls?: string;
  /** Additional class name */
  class?: string;
  /** Inline styles */
  style?: string;
  /** Semantic class names */
  classNames?: ProgressClassNames;
  /** Semantic styles */
  styles?: ProgressStyles;
}

