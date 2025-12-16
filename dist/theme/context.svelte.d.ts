import type { ThemeConfig, ResolvedTheme } from './types';
/**
 * Create the default resolved theme
 * Note: If mode is 'system', it should be resolved to 'light' or 'dark' before calling this
 */
export declare function createDefaultTheme(config?: ThemeConfig): ResolvedTheme;
/**
 * Set theme in Svelte context
 */
export declare function setThemeContext(theme: ResolvedTheme): void;
/**
 * Get theme from Svelte context
 */
export declare function getThemeContext(): ResolvedTheme;
/**
 * Generate CSS custom properties from theme
 */
export declare function themeToCSSVars(theme: ResolvedTheme, prefix?: string): Record<string, string>;
/**
 * Apply CSS variables to an element (usually :root or a container)
 */
export declare function applyCSSVars(element: HTMLElement, vars: Record<string, string>): void;
