<script lang="ts" module>
  import type { ConfigProviderProps } from './types';

  export type { ConfigProviderProps };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setContext } from 'svelte';
  import { createGetPrefixCls } from './context.svelte';
  import { defaultConfig, type ResolvedConfig } from './types';
  import {
    createDefaultTheme,
    themeToCSSVars,
    type ThemeConfig,
    type ResolvedThemeMode,
  } from '../theme';

  // Browser check that works in any environment (SvelteKit, Vite, etc.)
  const browser = typeof window !== 'undefined';

  interface Props extends ConfigProviderProps {
    children: Snippet;
  }

  let {
    prefixCls = defaultConfig.prefixCls,
    iconPrefixCls = defaultConfig.iconPrefixCls,
    size = defaultConfig.size,
    direction = defaultConfig.direction,
    disabled = defaultConfig.disabled,
    autoInsertSpaceInButton = defaultConfig.autoInsertSpaceInButton,
    cssVarPrefix = defaultConfig.cssVarPrefix,
    theme,
    children,
  }: Props = $props();

  // Create resolved config - using a getter function for reactive access
  const config: ResolvedConfig = {
    get prefixCls() { return prefixCls; },
    get iconPrefixCls() { return iconPrefixCls; },
    get size() { return size; },
    get direction() { return direction; },
    get disabled() { return disabled; },
    get autoInsertSpaceInButton() { return autoInsertSpaceInButton; },
    get cssVarPrefix() { return cssVarPrefix; },
    getPrefixCls: createGetPrefixCls(prefixCls),
  };

  // Set config context at mount time
  setContext(Symbol.for('santad-config'), config);

  // Track system preference when mode is 'system'
  // Initialize from data-theme attribute (set by blocking script) to prevent flash
  let systemPrefersDark = $state(
    browser ? document.documentElement.dataset.theme === 'dark' : false
  );

  $effect(() => {
    if (!browser || theme?.mode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemPrefersDark = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      systemPrefersDark = e.matches;
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  });

  // Resolve the actual mode - handle 'system' internally
  // On initial client render, trust the data-theme attribute set by blocking script
  const resolvedMode = $derived<ResolvedThemeMode>(
    theme?.mode === 'system'
      ? (systemPrefersDark ? 'dark' : 'light')
      : (theme?.mode ?? 'light')
  );

  // Sync data-theme on html element for CSS selectors
  $effect(() => {
    if (!browser) return;
    document.documentElement.dataset.theme = resolvedMode;
    document.documentElement.style.colorScheme = resolvedMode;
  });

  // Create theme with resolved mode
  const resolvedTheme = $derived(
    createDefaultTheme({ ...theme, mode: resolvedMode })
  );

  // Set theme context
  setContext(Symbol.for('santad-theme'), {
    get current() { return resolvedTheme; }
  });

  // Check if there are custom theme tokens (not just mode)
  const hasCustomTokens = $derived(
    theme?.token && Object.keys(theme.token).length > 0
  );

  // Generate CSS variables only for custom tokens
  // Standard light/dark themes are handled by CSS [data-theme] selector
  const cssVars = $derived(
    hasCustomTokens ? themeToCSSVars(resolvedTheme, cssVarPrefix) : {}
  );
  const cssVarsStyle = $derived(
    Object.entries(cssVars)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ')
  );
</script>

<div
  class="{prefixCls}-config-provider"
  class:ant-rtl={direction === 'rtl'}
  style={cssVarsStyle || undefined}
  data-theme={resolvedMode}
>
  {@render children()}
</div>

<style>
  .ant-config-provider {
    font-family: var(--ant-font-family);
    font-size: var(--ant-font-size);
    line-height: var(--ant-line-height);
    color: var(--ant-color-text);
  }

  .ant-rtl {
    direction: rtl;
  }
</style>

