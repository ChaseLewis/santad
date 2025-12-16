import type { Snippet } from 'svelte';
import type { SizeType } from '../../theme';
import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';

// ==================== Status ====================
export type InputStatus = 'error' | 'warning';

// ==================== Variants ====================
export type InputVariant = 'outlined' | 'filled' | 'borderless';

// ==================== Semantic Class Names ====================
export interface InputClassNames {
  /** Root wrapper element */
  root?: string;
  /** The input element itself */
  input?: string;
  /** Prefix element container */
  prefix?: string;
  /** Suffix element container */
  suffix?: string;
  /** Clear icon */
  clearIcon?: string;
  /** Character count display */
  count?: string;
}

// ==================== Semantic Styles ====================
export interface InputStyles {
  /** Root wrapper element */
  root?: string;
  /** The input element itself */
  input?: string;
  /** Prefix element container */
  prefix?: string;
  /** Suffix element container */
  suffix?: string;
  /** Clear icon */
  clearIcon?: string;
  /** Character count display */
  count?: string;
}

// ==================== Input Props ====================
export interface InputProps extends Omit<HTMLInputAttributes, 'size'> {
  /** Value of the input */
  value?: string;
  /** Default value (for uncontrolled mode) */
  defaultValue?: string;
  /** Size of the input - small, middle (default), large */
  size?: SizeType;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Validation status */
  status?: InputStatus;
  /** Variant style */
  variant?: InputVariant;
  /** Prefix icon or text (renders inside the input before the text) */
  prefix?: Snippet;
  /** Suffix icon or text (renders inside the input after the text) */
  suffix?: Snippet;
  /** Element to render before the input (addon) */
  addonBefore?: Snippet;
  /** Element to render after the input (addon) */
  addonAfter?: Snippet;
  /** Allow clearing the input with a clear icon */
  allowClear?: boolean | { clearIcon?: Snippet };
  /** Max character count. Shows count when set */
  maxLength?: number;
  /** Whether to show character count */
  showCount?: boolean | { formatter?: (info: { value: string; count: number; maxLength?: number }) => string };
  /** Custom prefix class */
  prefixCls?: string;
  /** Additional class name */
  class?: string;
  /** Semantic class names */
  classNames?: InputClassNames;
  /** Semantic styles */
  styles?: InputStyles;
  /** Change callback */
  onchange?: (value: string, event: Event) => void;
  /** Press enter callback */
  onpressenter?: (event: KeyboardEvent) => void;
  /** Clear callback */
  onclear?: () => void;
}

// ==================== Password Props ====================
export interface PasswordVisibilityToggle {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

export interface PasswordProps extends Omit<InputProps, 'type'> {
  /** Whether to show visibility toggle */
  visibilityToggle?: boolean | PasswordVisibilityToggle;
  /** Custom icon render function */
  iconRender?: Snippet<[visible: boolean]>;
}

export interface PasswordClassNames extends InputClassNames {
  /** Password visibility toggle icon */
  icon?: string;
}

export interface PasswordStyles extends InputStyles {
  /** Password visibility toggle icon */
  icon?: string;
}

// ==================== TextArea Props ====================
export interface TextAreaAutoSize {
  minRows?: number;
  maxRows?: number;
}

export interface TextAreaClassNames {
  /** Root wrapper element */
  root?: string;
  /** The textarea element itself */
  textarea?: string;
  /** Character count display */
  count?: string;
}

export interface TextAreaStyles {
  /** Root wrapper element */
  root?: string;
  /** The textarea element itself */
  textarea?: string;
  /** Character count display */
  count?: string;
}

export interface TextAreaProps extends Omit<HTMLTextareaAttributes, 'value'> {
  /** Value of the textarea */
  value?: string;
  /** Default value (for uncontrolled mode) */
  defaultValue?: string;
  /** Size of the textarea */
  size?: SizeType;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Validation status */
  status?: InputStatus;
  /** Variant style */
  variant?: InputVariant;
  /** Allow clearing with a clear icon */
  allowClear?: boolean | { clearIcon?: Snippet };
  /** Auto size config or boolean */
  autoSize?: boolean | TextAreaAutoSize;
  /** Max character count */
  maxLength?: number;
  /** Whether to show character count */
  showCount?: boolean | { formatter?: (info: { value: string; count: number; maxLength?: number }) => string };
  /** Custom prefix class */
  prefixCls?: string;
  /** Additional class name */
  class?: string;
  /** Semantic class names */
  classNames?: TextAreaClassNames;
  /** Semantic styles */
  styles?: TextAreaStyles;
  /** Change callback */
  onchange?: (value: string, event: Event) => void;
  /** Press enter callback */
  onpressenter?: (event: KeyboardEvent) => void;
  /** Clear callback */
  onclear?: () => void;
  /** Resize callback */
  onresize?: (info: { width: number; height: number }) => void;
}

// ==================== Search Props ====================
export interface SearchClassNames extends InputClassNames {
  /** Search button */
  button?: string;
}

export interface SearchStyles extends InputStyles {
  /** Search button */
  button?: string;
}

export interface SearchProps extends Omit<InputProps, 'classNames' | 'styles'> {
  /** Search button content. Set to true for default icon */
  enterButton?: boolean | Snippet;
  /** Loading state */
  loading?: boolean;
  /** Search callback */
  onsearch?: (value: string, event?: Event, info?: { source: 'input' | 'clear' }) => void;
  /** Semantic class names */
  classNames?: SearchClassNames;
  /** Semantic styles */
  styles?: SearchStyles;
}

