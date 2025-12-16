import type { Snippet } from 'svelte';

/**
 * Radio button style type
 */
export type RadioButtonStyle = 'outline' | 'solid';

/**
 * Radio option type
 */
export type RadioOptionType = 'default' | 'button';

/**
 * Semantic class names for Radio component parts
 */
export interface RadioClassNames {
  /** Root wrapper element */
  root?: string;
  /** Radio input visual */
  input?: string;
  /** Label text */
  label?: string;
}

/**
 * Semantic styles for Radio component parts
 */
export interface RadioStyles {
  /** Root wrapper element */
  root?: string;
  /** Radio input visual */
  input?: string;
  /** Label text */
  label?: string;
}

/**
 * Radio change event
 */
export interface RadioChangeEvent {
  value: string | number;
  nativeEvent: Event;
}

/**
 * Radio props
 */
export interface RadioProps {
  /** Whether the radio is checked */
  checked?: boolean;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Radio name for form submission */
  name?: string;
  /** Radio value */
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
  classNames?: RadioClassNames;
  /** Inline styles */
  style?: string;
  /** Semantic inline styles for component parts */
  styles?: RadioStyles;
  /** Label content */
  children?: Snippet;
  /** Change handler */
  onchange?: (event: RadioChangeEvent) => void;
}

/**
 * Radio option for RadioGroup
 */
export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

/**
 * Radio Group props
 */
export interface RadioGroupProps {
  /** Selected value */
  value?: string | number;
  /** Default selected value */
  defaultValue?: string | number;
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Group name for form submission */
  name?: string;
  /** Button style (for button type) */
  buttonStyle?: RadioButtonStyle;
  /** Option type */
  optionType?: RadioOptionType;
  /** Radio options */
  options?: RadioOption[];
  /** Additional class name */
  class?: string;
  /** Inline styles */
  style?: string;
  /** Children */
  children?: Snippet;
  /** Change handler */
  onchange?: (value: string | number) => void;
}

