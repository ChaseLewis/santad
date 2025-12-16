/**
 * Wave animation action for Svelte
 * Usage: <button use:wave>Click me</button>
 *
 * Based on Ant Design's wave effect implementation
 */
/**
 * Check if a color is valid for wave effect
 * Filters out white, transparent, and invisible colors
 */
function isValidWaveColor(color) {
    if (!color || typeof color !== 'string')
        return false;
    return (color !== '#fff' &&
        color !== '#ffffff' &&
        color !== 'rgb(255, 255, 255)' &&
        color !== 'rgba(255, 255, 255, 1)' &&
        !/rgba\((?:\d*, ){3}0\)/.test(color) && // any transparent rgba color
        color !== 'transparent');
}
/**
 * Extract wave color from element's computed style
 * Priority: borderTopColor > borderColor > backgroundColor
 */
function getWaveColor(element) {
    const style = getComputedStyle(element);
    const { borderTopColor, borderColor, backgroundColor } = style;
    // Return first valid color
    if (isValidWaveColor(borderTopColor))
        return borderTopColor;
    if (isValidWaveColor(borderColor))
        return borderColor;
    if (isValidWaveColor(backgroundColor))
        return backgroundColor;
    return null;
}
/**
 * Get border radius values from element
 */
function getBorderRadius(element) {
    const style = getComputedStyle(element);
    const { borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius, } = style;
    return `${borderTopLeftRadius} ${borderTopRightRadius} ${borderBottomRightRadius} ${borderBottomLeftRadius}`;
}
/**
 * Svelte action for wave effect
 */
export function wave(node, options = {}) {
    let { disabled = false, color, duration = 400 } = options;
    function showWave() {
        if (disabled)
            return;
        // Get wave color
        const waveColor = color || getWaveColor(node);
        if (!waveColor)
            return;
        // Get element dimensions and position
        const rect = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        const borderRadius = getBorderRadius(node);
        // Create wave element
        const waveEl = document.createElement('div');
        waveEl.className = 'ant-wave-effect';
        waveEl.style.cssText = `
      position: absolute;
      inset: -1px;
      border-radius: ${borderRadius};
      border: 0 solid ${waveColor};
      opacity: 0.2;
      pointer-events: none;
      animation: ant-wave-effect ${duration}ms cubic-bezier(0.08, 0.82, 0.17, 1) forwards;
    `;
        // Ensure parent has position for absolute positioning
        const originalPosition = style.position;
        if (originalPosition === 'static') {
            node.style.position = 'relative';
        }
        // Add wave element
        node.appendChild(waveEl);
        // Remove wave element after animation
        setTimeout(() => {
            waveEl.remove();
            if (originalPosition === 'static') {
                node.style.position = '';
            }
        }, duration);
    }
    // Handle click
    function handleClick() {
        showWave();
    }
    node.addEventListener('click', handleClick);
    return {
        update(newOptions) {
            disabled = newOptions.disabled ?? false;
            color = newOptions.color;
            duration = newOptions.duration ?? 400;
        },
        destroy() {
            node.removeEventListener('click', handleClick);
        }
    };
}
