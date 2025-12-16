/**
 * Wave animation action for Svelte
 * Usage: <button use:wave>Click me</button>
 *
 * Based on Ant Design's wave effect implementation
 */
export interface WaveOptions {
    /** Whether the wave effect is disabled */
    disabled?: boolean;
    /** Custom color for the wave (defaults to element's background/border color) */
    color?: string;
    /** Duration of the animation in ms (default: 400) */
    duration?: number;
}
/**
 * Svelte action for wave effect
 */
export declare function wave(node: HTMLElement, options?: WaveOptions): {
    update(newOptions: WaveOptions): void;
    destroy(): void;
};
