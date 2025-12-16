/**
 * Gap size presets
 */
export const GapSizes = ['small', 'middle', 'large'];
/**
 * Check if gap is a preset size
 */
export function isPresetGap(gap) {
    return typeof gap === 'string' && GapSizes.includes(gap);
}
/**
 * Convert gap preset to CSS value
 * Note: Using hardcoded values because CSS variables may not resolve
 * correctly in all Svelte component contexts
 */
const gapMap = {
    small: '8px',
    middle: '16px',
    large: '24px',
};
export function getGapValue(gap) {
    if (gap === undefined)
        return undefined;
    if (isPresetGap(gap)) {
        return gapMap[gap];
    }
    if (typeof gap === 'number') {
        return `${gap}px`;
    }
    return gap;
}
