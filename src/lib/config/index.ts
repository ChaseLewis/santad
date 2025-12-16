// Config exports
export { default as ConfigProvider } from './ConfigProvider.svelte';
export type { ConfigProviderProps, ResolvedConfig } from './types';
export { defaultConfig } from './types';
export { getConfigContext, setConfigContext, createGetPrefixCls } from './context.svelte';

