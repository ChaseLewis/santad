import { getContext, setContext } from 'svelte';
import { seedTokens } from './tokens';
const THEME_CONTEXT_KEY = Symbol.for('santad-theme');
/**
 * Lighten a hex color by a percentage
 */
function lightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const B = Math.min(255, (num & 0x0000ff) + amt);
    return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}
/**
 * Darken a hex color by a percentage
 */
function darkenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
    const B = Math.max(0, (num & 0x0000ff) - amt);
    return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}
/**
 * Add alpha channel to a hex color
 */
function colorWithAlpha(hex, alpha) {
    const num = parseInt(hex.replace('#', ''), 16);
    const R = (num >> 16) & 0xff;
    const G = (num >> 8) & 0xff;
    const B = num & 0xff;
    return `rgba(${R}, ${G}, ${B}, ${alpha})`;
}
/**
 * Generate derived tokens from seed tokens
 */
function generateDerivedTokens(mode, tokens) {
    const isDark = mode === 'dark';
    // Base colors adjusted for mode
    const colorBgBase = isDark ? '#141414' : tokens.colorBgBase || '#ffffff';
    const colorTextBase = isDark ? '#ffffffd9' : tokens.colorTextBase || '#000000d9';
    return {
        ...tokens,
        mode,
        // Primary color variations
        colorPrimaryHover: lightenColor(tokens.colorPrimary, 10),
        colorPrimaryActive: darkenColor(tokens.colorPrimary, 10),
        colorPrimaryBg: isDark ? darkenColor(tokens.colorPrimary, 35) : lightenColor(tokens.colorPrimary, 45),
        colorPrimaryBgHover: isDark ? darkenColor(tokens.colorPrimary, 30) : lightenColor(tokens.colorPrimary, 40),
        colorPrimaryBorder: isDark ? darkenColor(tokens.colorPrimary, 20) : lightenColor(tokens.colorPrimary, 30),
        colorPrimaryBorderHover: lightenColor(tokens.colorPrimary, 20),
        colorPrimaryText: tokens.colorPrimary,
        colorPrimaryTextHover: lightenColor(tokens.colorPrimary, 10),
        colorPrimaryTextActive: darkenColor(tokens.colorPrimary, 10),
        // Success color variations
        colorSuccessHover: lightenColor(tokens.colorSuccess, 10),
        colorSuccessActive: darkenColor(tokens.colorSuccess, 10),
        colorSuccessBg: isDark ? darkenColor(tokens.colorSuccess, 35) : lightenColor(tokens.colorSuccess, 45),
        colorSuccessBorder: isDark ? darkenColor(tokens.colorSuccess, 20) : lightenColor(tokens.colorSuccess, 30),
        // Warning color variations
        colorWarningHover: lightenColor(tokens.colorWarning, 10),
        colorWarningActive: darkenColor(tokens.colorWarning, 10),
        colorWarningBg: isDark ? darkenColor(tokens.colorWarning, 35) : lightenColor(tokens.colorWarning, 45),
        colorWarningBorder: isDark ? darkenColor(tokens.colorWarning, 20) : lightenColor(tokens.colorWarning, 30),
        // Error color variations
        colorErrorHover: lightenColor(tokens.colorError, 10),
        colorErrorActive: darkenColor(tokens.colorError, 10),
        colorErrorBg: isDark ? darkenColor(tokens.colorError, 35) : lightenColor(tokens.colorError, 45),
        colorErrorBorder: isDark ? darkenColor(tokens.colorError, 20) : lightenColor(tokens.colorError, 30),
        // Background colors
        colorBgContainer: isDark ? '#1f1f1f' : '#ffffff',
        colorBgElevated: isDark ? '#2a2a2a' : '#ffffff',
        colorBgLayout: isDark ? '#141414' : '#f5f5f5',
        colorBgSpotlight: isDark ? '#424242' : 'rgba(0, 0, 0, 0.85)',
        colorBgMask: 'rgba(0, 0, 0, 0.45)',
        // Border colors
        colorBorder: isDark ? '#424242' : '#d9d9d9',
        colorBorderSecondary: isDark ? '#303030' : '#f0f0f0',
        // Text colors
        colorText: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.88)',
        colorTextSecondary: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
        colorTextTertiary: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
        colorTextQuaternary: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
        colorTextDisabled: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
        colorTextPlaceholder: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
        colorTextHeading: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.88)',
        colorTextLabel: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
        colorTextDescription: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
        colorTextLightSolid: '#ffffff',
        // Fill colors
        colorFill: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.15)',
        colorFillSecondary: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)',
        colorFillTertiary: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        colorFillQuaternary: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
        // Split color
        colorSplit: isDark ? 'rgba(253, 253, 253, 0.12)' : 'rgba(5, 5, 5, 0.06)',
        // Icon colors
        colorIcon: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
        colorIconHover: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.88)',
        // Control colors
        colorBgContainerDisabled: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        colorBorderBg: isDark ? '#1f1f1f' : '#ffffff',
        // Link colors
        colorLinkHover: lightenColor(tokens.colorLink, 15),
        colorLinkActive: darkenColor(tokens.colorLink, 10),
    };
}
/**
 * Create the default resolved theme
 * Note: If mode is 'system', it should be resolved to 'light' or 'dark' before calling this
 */
export function createDefaultTheme(config) {
    // Handle 'system' mode - defaults to 'light' if not resolved by caller
    const mode = config?.mode === 'system' || !config?.mode ? 'light' : config.mode;
    const mergedTokens = { ...seedTokens, ...config?.token };
    return generateDerivedTokens(mode, mergedTokens);
}
/**
 * Set theme in Svelte context
 */
export function setThemeContext(theme) {
    setContext(THEME_CONTEXT_KEY, theme);
}
/**
 * Get theme from Svelte context
 */
export function getThemeContext() {
    const ctx = getContext(THEME_CONTEXT_KEY);
    if (!ctx)
        return createDefaultTheme();
    // Handle both reactive wrapper and direct theme
    if ('current' in ctx)
        return ctx.current;
    return ctx;
}
/**
 * Generate CSS custom properties from theme
 */
export function themeToCSSVars(theme, prefix = 'ant') {
    const vars = {};
    for (const [key, value] of Object.entries(theme)) {
        if (value === null || value === undefined)
            continue;
        // Convert camelCase to kebab-case
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        const cssVarName = `--${prefix}-${cssKey}`;
        if (typeof value === 'number') {
            vars[cssVarName] = String(value);
        }
        else if (typeof value === 'string') {
            vars[cssVarName] = value;
        }
        else if (typeof value === 'boolean') {
            vars[cssVarName] = value ? '1' : '0';
        }
    }
    return vars;
}
/**
 * Apply CSS variables to an element (usually :root or a container)
 */
export function applyCSSVars(element, vars) {
    for (const [key, value] of Object.entries(vars)) {
        element.style.setProperty(key, value);
    }
}
