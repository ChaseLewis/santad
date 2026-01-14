import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';

export interface AutoCompleteOption {
  /** The value of the option */
  value: string;
  /** The display label (defaults to value if not provided) */
  label?: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Additional data to store with the option */
  [key: string]: unknown;
}

export interface AutoCompleteOptionGroup {
  /** Group label */
  label: string;
  /** Options in this group */
  options: AutoCompleteOption[];
}

export type AutoCompleteOptions = (AutoCompleteOption | AutoCompleteOptionGroup | string)[];

export type AutoCompleteSize = 'small' | 'middle' | 'large';

export type AutoCompleteStatus = 'error' | 'warning';

export type AutoCompleteFilterOption = 
  | boolean 
  | ((inputValue: string, option: AutoCompleteOption) => boolean);

export type AutoCompleteCaseSensitive = boolean;

export interface AutoCompleteClassNames {
  root?: string;
  input?: string;
  popup?: string;
  option?: string;
  optionActive?: string;
  optionSelected?: string;
  optionDisabled?: string;
  groupLabel?: string;
  clear?: string;
  suffix?: string;
}

export interface AutoCompleteStyles {
  root?: string;
  input?: string;
  popup?: string;
  option?: string;
  groupLabel?: string;
}

export interface AutoCompleteProps extends Omit<HTMLInputAttributes, 'size' | 'value'> {
  /** Current input value (bindable) */
  value?: string;
  /** Available options */
  options?: AutoCompleteOptions;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Size of the input */
  size?: AutoCompleteSize;
  /** Validation status */
  status?: AutoCompleteStatus;
  /** Whether to show clear button */
  allowClear?: boolean;
  /** Whether the dropdown is open (bindable) */
  open?: boolean;
  /** Whether to show dropdown when input is empty and focused (default: true) */
  emptyOpen?: boolean;
  /** Filter options based on input. Set to false to disable filtering */
  filterOption?: AutoCompleteFilterOption;
  /** Whether filtering should be case sensitive (default: false) */
  caseSensitive?: boolean;
  /** Whether to highlight the first option by default when dropdown opens (default: true) */
  defaultActiveFirstOption?: boolean;
  /** Custom prefix class */
  prefixCls?: string;
  /** Additional class name */
  class?: string;
  /** Inline styles */
  style?: string;
  /** Semantic class names */
  classNames?: AutoCompleteClassNames;
  /** Semantic styles */
  styles?: AutoCompleteStyles;
  /** Whether to match popup width to input width */
  popupMatchSelectWidth?: boolean | number;
  /** Callback when value changes */
  onchange?: (value: string) => void;
  /** Callback when an option is selected */
  onselect?: (value: string, option: AutoCompleteOption) => void;
  /** Callback when user types (for async search) */
  onsearch?: (value: string) => void;
  /** Callback when dropdown visibility changes */
  onopenchange?: (open: boolean) => void;
  /** Callback when input is focused */
  onfocus?: (event: FocusEvent) => void;
  /** Callback when input is blurred */
  onblur?: (event: FocusEvent) => void;
  /** Callback when clear button is clicked */
  onclear?: () => void;
  /** Custom option renderer */
  optionRender?: Snippet<[{ option: AutoCompleteOption; isActive: boolean; isSelected: boolean }]>;
  /** Custom empty state renderer */
  notFoundContent?: Snippet | string;
  /** Suffix icon/content */
  suffix?: Snippet | string;
  /** Prefix icon/content */
  prefix?: Snippet | string;
  /** Whether to auto focus on mount */
  autofocus?: boolean;
  /** Max height of dropdown */
  listHeight?: number;
  /** 
   * Virtual scrolling configuration (default: true with 32px item height)
   * - true: Enable with default 32px item height
   * - number: Enable with custom item height in pixels
   * - false: Disable virtual scrolling
   */
  virtual?: boolean | number;
  /** Tab index */
  tabindex?: number;
}

