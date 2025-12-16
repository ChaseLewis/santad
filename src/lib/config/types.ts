import type { ThemeConfig, SizeType, DirectionType } from '../theme';

/**
 * Configuration options for the entire component library
 */
export interface ConfigProviderProps {
  /** Class name prefix for all components */
  prefixCls?: string;
  /** Theme configuration */
  theme?: ThemeConfig;
  /** Component size */
  size?: SizeType;
  /** Text direction */
  direction?: DirectionType;
  /** Whether to disable all components */
  disabled?: boolean;
  /** Custom icon prefix class */
  iconPrefixCls?: string;
  /** Whether components should automatically insert space between 2 Chinese characters */
  autoInsertSpaceInButton?: boolean;
  /** CSS variable prefix */
  cssVarPrefix?: string;
}

/**
 * Resolved configuration with defaults applied
 */
export interface ResolvedConfig {
  prefixCls: string;
  iconPrefixCls: string;
  size: SizeType;
  direction: DirectionType;
  disabled: boolean;
  autoInsertSpaceInButton: boolean;
  cssVarPrefix: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

export const defaultConfig: ResolvedConfig = {
  prefixCls: 'ant',
  iconPrefixCls: 'anticon',
  size: 'middle',
  direction: 'ltr',
  disabled: false,
  autoInsertSpaceInButton: true,
  cssVarPrefix: 'ant',
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `ant-${suffixCls}` : 'ant';
  },
};

