import type { ResolvedConfig } from './types';
/**
 * Set config in Svelte context
 */
export declare function setConfigContext(config: ResolvedConfig): void;
/**
 * Get config from Svelte context
 */
export declare function getConfigContext(): ResolvedConfig;
/**
 * Create a getPrefixCls function with the given base prefix
 */
export declare function createGetPrefixCls(basePrefixCls: string): (suffixCls?: string, customizePrefixCls?: string) => string;
