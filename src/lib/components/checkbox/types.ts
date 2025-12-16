import type { Snippet } from 'svelte';

/**
 * Semantic class names for Checkbox component parts
 */
export interface CheckboxClassNames {
  /** Root wrapper element */
  root?: string;
  /** Checkbox input visual */
  input?: string;
  /** Label text */
  label?: string;
}

/**
 * Semantic styles for Checkbox component parts
 */
export interface CheckboxStyles {
  /** Root wrapper element */
  root?: string;
  /** Checkbox input visual */
  input?: string;
  /** Label text */
  label?: string;
}

/**
 * Checkbox change event
 */
export interface CheckboxChangeEvent {
  checked: boolean;
  indeterminate: boolean;
  nativeEvent: Event;
}

/**
 * Checkbox props
 */
export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Indeterminate state (for "select all" scenarios) */
  indeterminate?: boolean;
  /** Checkbox name for form submission */
  name?: string;
  /** Checkbox value for form submission */
  value?: string | number;
  /** Tab index */
  tabIndex?: number;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Custom class prefix */
  prefixCls?: string;
  /** Additional class name */
  class?: string;
  /** Semantic class names for component parts */
  classNames?: CheckboxClassNames;
  /** Inline styles */
  style?: string;
  /** Semantic inline styles for component parts */
  styles?: CheckboxStyles;
  /** Label content */
  label?: Snippet;
  /** Change handler */
  onchange?: (event: CheckboxChangeEvent) => void;
}

/**
 * Checkbox Group props
 */
export interface CheckboxGroupProps {
  /** Selected values */
  value?: (string | number)[];
  /** Default selected values */
  defaultValue?: (string | number)[];
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Group name for form submission */
  name?: string;
  /** Additional class name */
  class?: string;
  /** Inline styles */
  style?: string;
  /** Checkbox options */
  options?: CheckboxOption[];
  /** Children */
  children?: Snippet;
  /** Change handler */
  onchange?: (values: (string | number)[]) => void;
}

/**
 * Checkbox option for CheckboxGroup
 */
export interface CheckboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

