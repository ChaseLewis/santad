/**
 * Semantic DOM Styling Utilities
 * 
 * Ant Design 6.0 style semantic styling support.
 * Allows users to target specific parts of components for custom styling.
 * 
 * @example
 * ```svelte
 * <Button
 *   classNames={{
 *     root: 'my-custom-button',
 *     icon: 'my-icon-style',
 *     content: 'my-content-style'
 *   }}
 *   styles={{
 *     root: 'background: linear-gradient(90deg, #1677ff, #69b1ff)',
 *     content: 'font-weight: 600'
 *   }}
 * >
 *   Custom Styled Button
 * </Button>
 * ```
 */

/**
 * Base interface for semantic class names
 * Each component extends this with its specific parts
 */
export interface SemanticClassNames {
  /** Root element class */
  root?: string;
  [key: string]: string | undefined;
}

/**
 * Base interface for semantic styles
 * Each component extends this with its specific parts
 */
export interface SemanticStyles {
  /** Root element inline styles */
  root?: string;
  [key: string]: string | undefined;
}

/**
 * Helper to combine base class with semantic class
 */
export function combineClasses(baseClass: string, semanticClass?: string): string {
  if (!semanticClass) return baseClass;
  return `${baseClass} ${semanticClass}`;
}

/**
 * Helper to get style string or undefined
 */
export function getSemanticStyle(styles: SemanticStyles | undefined, key: string): string | undefined {
  return styles?.[key];
}

