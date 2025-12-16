import type { ConfigProviderProps } from './types';
export type { ConfigProviderProps };
import type { Snippet } from 'svelte';
interface Props extends ConfigProviderProps {
    children: Snippet;
}
declare const ConfigProvider: import("svelte").Component<Props, {}, "">;
type ConfigProvider = ReturnType<typeof ConfigProvider>;
export default ConfigProvider;
