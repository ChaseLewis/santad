<script lang="ts">
  import '../lib/styles/index.css';
  import { ConfigProvider } from '$lib';
  import type { ThemeMode } from '$lib/theme';
  import type { Snippet } from 'svelte';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { browser } from '$app/environment';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  // Theme mode: 'light' | 'dark' | 'system'
  // Initialize from localStorage if available (set by blocking script in app.html)
  let themeMode = $state<ThemeMode>(
    browser ? (localStorage.getItem('santad-theme') as ThemeMode) || 'system' : 'system'
  );

  // Persist theme preference and update document attribute
  $effect(() => {
    if (!browser) return;
    
    localStorage.setItem('santad-theme', themeMode);
    
    // Update data-theme for the blocking script's initial load
    let resolvedTheme = themeMode;
    if (themeMode === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  });

  // Cycle through theme modes
  function cycleTheme() {
    const modes: ThemeMode[] = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(themeMode);
    themeMode = modes[(currentIndex + 1) % modes.length];
  }

  // Get icon and label for current mode
  const themeIcon = $derived(
    themeMode === 'light' ? '☀️' :
    themeMode === 'dark' ? '🌙' : '💻'
  );

  const themeLabel = $derived(
    themeMode === 'light' ? 'Light' :
    themeMode === 'dark' ? 'Dark' : 'System'
  );

  // Navigation items
  const navItems = [
    { name: 'Overview', path: '/' },
    { name: 'AutoComplete', path: '/auto-complete' },
    { name: 'Button', path: '/button' },
    { name: 'Flex', path: '/flex' },
    { name: 'Card', path: '/card' },
    { name: 'Checkbox', path: '/checkbox' },
    { name: 'Switch', path: '/switch' },
    { name: 'Radio', path: '/radio' },
    { name: 'Input', path: '/input' },
    { name: 'Tabs', path: '/tabs' },
    { name: 'Tag', path: '/tag' },
    { name: 'Typography', path: '/typography' },
    { name: 'Icon', path: '/icon' },
    { name: 'Slider', path: '/slider' },
    { name: 'VirtualList', path: '/virtual-list' },
    { name: 'VirtualGrid', path: '/virtual-grid' },
  ];
</script>

<ConfigProvider theme={{ mode: themeMode }}>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1 class="logo">Santad</h1>
        <span class="tagline">Svelte Ant Design</span>
      </div>
      
      <nav class="nav">
        <ul class="nav-list">
          {#each navItems as item}
            <li>
              <a 
                href="{base}{item.path}" 
                class="nav-link"
                class:active={$page.url.pathname === `${base}${item.path}` || ($page.url.pathname === base && item.path === '/')}
              >
                <span class="nav-text">{item.name}</span>
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <div class="sidebar-footer">
        <button class="theme-toggle" onclick={cycleTheme}>
          {themeIcon} {themeLabel}
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <main class="main-content">
      {@render children()}
    </main>
  </div>
</ConfigProvider>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: var(--ant-color-bg-layout, #f5f5f5);
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    transition: background-color 0.3s, color 0.3s;
  }

  .app-layout {
    display: flex;
    min-height: 100vh;
    background-color: var(--ant-color-bg-layout, #f5f5f5);
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    font-family: var(--ant-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    transition: background-color 0.3s, color 0.3s;
  }

  /* Sidebar */
  .sidebar {
    width: 240px;
    background-color: var(--ant-color-bg-container, #ffffff);
    border-right: 1px solid var(--ant-color-border-secondary, #f0f0f0);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 100;
    transition: background-color 0.3s, border-color 0.3s;
  }

  .sidebar-header {
    padding: 24px 20px;
    border-bottom: 1px solid var(--ant-color-border-secondary, #f0f0f0);
    transition: border-color 0.3s;
  }

  .logo {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: var(--ant-color-primary, #1677ff);
    letter-spacing: -0.5px;
  }

  .tagline {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
    transition: color 0.3s;
  }

  /* Navigation */
  .nav {
    flex: 1;
    padding: 16px 0;
    overflow-y: auto;
  }

  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.88));
    text-decoration: none;
    font-size: 14px;
    border-left: 3px solid transparent;
  }

  .nav-link:hover {
    background-color: var(--ant-color-fill-tertiary, rgba(0, 0, 0, 0.04));
    color: var(--ant-color-primary, #1677ff);
  }

  .nav-link.active {
    background-color: var(--ant-color-primary, #1677ff);
    color: var(--ant-color-text-light-solid, rgba(0, 0, 0, 0.88));
    font-weight: 500;
    border-top-right-radius: var(--ant-border-radius-lg, 8px);
    border-bottom-right-radius: var(--ant-border-radius-lg, 8px);
  }

  .nav-icon {
    font-size: 16px;
    width: 20px;
    text-align: center;
  }

  .nav-text {
    flex: 1;
  }

  /* Sidebar footer */
  .sidebar-footer {
    padding: 16px 20px;
    border-top: 1px solid var(--ant-color-border-secondary, #f0f0f0);
    transition: border-color 0.3s;
  }

  .theme-toggle {
    width: 100%;
    padding: 8px 16px;
    background-color: var(--ant-color-fill-tertiary, rgba(0, 0, 0, 0.04));
    border: 1px solid var(--ant-color-border, #d9d9d9);
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    transition: all 0.3s;
  }

  .theme-toggle:hover {
    background-color: var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06));
    border-color: var(--ant-color-primary, #1677ff);
  }

  /* Main content */
  .main-content {
    flex: 1;
    margin-left: 240px;
    padding: 32px;
    min-height: 100vh;
    transition: background-color 0.3s, color 0.3s;
  }
</style>
