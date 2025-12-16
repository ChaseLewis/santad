import type { Snippet } from 'svelte';
import { type WaveOptions } from './wave';
interface Props extends WaveOptions {
    children: Snippet;
    /** Element type for the wrapper (default: span) */
    as?: 'span' | 'div';
}
declare const Wave: import("svelte").Component<Props, {}, "">;
type Wave = ReturnType<typeof Wave>;
export default Wave;
