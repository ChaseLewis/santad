import type { Snippet } from 'svelte';

/**
 * Mark configuration for slider
 */
export interface SliderMark {
  /** Style for the mark */
  style?: string;
  /** Label for the mark */
  label?: string | Snippet;
}

/**
 * Slider marks - mapping from value to mark config
 */
export type SliderMarks = Record<number, string | SliderMark>;

/**
 * Tooltip configuration
 */
export interface SliderTooltipConfig {
  /** Whether tooltip is always visible */
  open?: boolean;
  /** Tooltip placement */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Format tooltip content, return null to hide */
  formatter?: ((value: number) => string | null) | null;
}

/**
 * Range configuration
 */
export interface SliderRangeConfig {
  /** Whether the track between handles can be dragged */
  draggableTrack?: boolean;
}

/**
 * Slider component props
 */
export interface SliderProps {
  /** Current value (number for single, [number, number] for range) */
  value?: number | [number, number];
  /** Default value */
  defaultValue?: number | [number, number];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment, null for marks only */
  step?: number | null;
  /** Whether slider is disabled */
  disabled?: boolean;
  /** Enable range selection */
  range?: boolean | SliderRangeConfig;
  /** Vertical orientation */
  vertical?: boolean;
  /** Reverse the slider */
  reverse?: boolean;
  /** Tick marks on slider */
  marks?: SliderMarks;
  /** Whether thumb can only snap to marks */
  dots?: boolean;
  /** Whether to include values between marks */
  included?: boolean;
  /** Tooltip configuration */
  tooltip?: SliderTooltipConfig;
  /** Custom class prefix */
  prefixCls?: string;
  /** Additional class name */
  class?: string;
  /** Custom style */
  style?: string;
  /** Semantic class names */
  classNames?: SliderClassNames;
  /** Semantic styles */
  styles?: SliderStyles;
  /** Change callback */
  onchange?: (value: number | [number, number]) => void;
  /** Change complete callback (on mouseup/keyup) */
  onchangecomplete?: (value: number | [number, number]) => void;
}

/**
 * Semantic class names
 */
export interface SliderClassNames {
  root?: string;
  rail?: string;
  track?: string;
  handle?: string;
  mark?: string;
  markText?: string;
  dot?: string;
}

/**
 * Semantic styles
 */
export interface SliderStyles {
  root?: string;
  rail?: string;
  track?: string;
  handle?: string;
  mark?: string;
  markText?: string;
  dot?: string;
}

