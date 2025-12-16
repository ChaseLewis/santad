import type { Snippet } from 'svelte';
import type { SizeType } from '../../theme';
import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

/**
 * Button types matching Ant Design
 */
export const ButtonTypes = ['default', 'primary', 'dashed', 'link', 'text'] as const;
export type ButtonType = (typeof ButtonTypes)[number];

/**
 * Button shapes
 */
export const ButtonShapes = ['default', 'circle', 'round'] as const;
export type ButtonShape = (typeof ButtonShapes)[number];

/**
 * Button HTML types
 */
export const ButtonHTMLTypes = ['submit', 'button', 'reset'] as const;
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number];

/**
 * Button variant types (new API)
 */
export const ButtonVariants = ['outlined', 'dashed', 'solid', 'filled', 'text', 'link'] as const;
export type ButtonVariant = (typeof ButtonVariants)[number];

/**
 * Button color types
 */
export const ButtonColors = ['default', 'primary', 'danger'] as const;
export type ButtonColor = (typeof ButtonColors)[number];

/**
 * Icon placement
 */
export type IconPlacement = 'start' | 'end';

/**
 * Loading configuration
 */
export interface LoadingConfig {
  delay?: number;
  icon?: Snippet;
}

/**
 * Semantic class names for Button component parts
 * Allows targeting specific parts of the component for styling
 */
export interface ButtonClassNames {
  /** Root button element */
  root?: string;
  /** Icon container */
  icon?: string;
  /** Content/text container */
  content?: string;
  /** Loading icon container */
  loadingIcon?: string;
}

/**
 * Semantic styles for Button component parts
 * Allows applying inline styles to specific parts of the component
 */
export interface ButtonStyles {
  /** Root button element */
  root?: string;
  /** Icon container */
  icon?: string;
  /** Content/text container */
  content?: string;
  /** Loading icon container */
  loadingIcon?: string;
}

/**
 * Button props
 */
export interface ButtonProps {
  /** Button type (legacy API) */
  type?: ButtonType;
  /** Button color (new API) */
  color?: ButtonColor;
  /** Button variant (new API) */
  variant?: ButtonVariant;
  /** Button shape */
  shape?: ButtonShape;
  /** Button size */
  size?: SizeType;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in loading state */
  loading?: boolean | LoadingConfig;
  /** Make button fit to container width */
  block?: boolean;
  /** Set the danger status */
  danger?: boolean;
  /** Make background transparent */
  ghost?: boolean;
  /** Icon snippet */
  icon?: Snippet;
  /** Icon placement */
  iconPlacement?: IconPlacement;
  /** HTML button type */
  htmlType?: ButtonHTMLType;
  /** Link href (renders as anchor) */
  href?: string;
  /** Link target */
  target?: string;
  /** Custom class prefix */
  prefixCls?: string;
  /** Additional class name */
  class?: string;
  /** Semantic class names for component parts (Ant Design 6.0 style) */
  classNames?: ButtonClassNames;
  /** Semantic inline styles for component parts (Ant Design 6.0 style) */
  styles?: ButtonStyles;
  /** Button content */
  children?: Snippet;
  /** Click handler */
  onclick?: (e: MouseEvent) => void;
}

/**
 * Button group props
 */
export interface ButtonGroupProps {
  /** Size for all buttons in the group */
  size?: SizeType;
  /** Additional class name */
  class?: string;
  /** Button group content */
  children: Snippet;
}

/**
 * Maps legacy button types to color/variant pairs
 */
export function getColorVariantFromType(
  type?: ButtonType,
  danger?: boolean
): [ButtonColor | undefined, ButtonVariant | undefined] {
  const typeMap: Record<ButtonType, [ButtonColor, ButtonVariant]> = {
    default: ['default', 'outlined'],
    primary: ['primary', 'solid'],
    dashed: ['default', 'dashed'],
    link: ['primary', 'link'],
    text: ['default', 'text'],
  };

  if (type && type in typeMap) {
    const [color, variant] = typeMap[type];
    return [danger ? 'danger' : color, variant];
  }

  return [danger ? 'danger' : undefined, undefined];
}

