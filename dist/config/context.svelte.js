import { getContext, setContext } from 'svelte';
import { defaultConfig } from './types';
const CONFIG_CONTEXT_KEY = Symbol.for('santad-config');
/**
 * Set config in Svelte context
 */
export function setConfigContext(config) {
    setContext(CONFIG_CONTEXT_KEY, config);
}
/**
 * Get config from Svelte context
 */
export function getConfigContext() {
    return getContext(CONFIG_CONTEXT_KEY) ?? defaultConfig;
}
/**
 * Create a getPrefixCls function with the given base prefix
 */
export function createGetPrefixCls(basePrefixCls) {
    return (suffixCls, customizePrefixCls) => {
        if (customizePrefixCls)
            return customizePrefixCls;
        return suffixCls ? `${basePrefixCls}-${suffixCls}` : basePrefixCls;
    };
}
