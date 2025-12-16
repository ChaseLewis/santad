<script lang="ts" module>
  import type { PasswordProps, PasswordClassNames, PasswordStyles } from './types';

  export type { PasswordProps, PasswordClassNames, PasswordStyles };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { PasswordProps as Props } from './types';
  import Input from './Input.svelte';

  let {
    visibilityToggle = true,
    iconRender,
    disabled = false,
    size,
    status,
    variant = 'outlined',
    prefix,
    suffix,
    prefixCls: customPrefixCls,
    class: className = '',
    classNames = {},
    styles = {},
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('input'));
  const passwordPrefixCls = $derived(`${prefixCls}-password`);

  // Visibility state
  let internalVisible = $state(false);

  // Controlled visibility check
  const isVisibilityControlled = $derived(
    typeof visibilityToggle === 'object' && visibilityToggle.visible !== undefined
  );

  // Actual visibility state
  const isVisible = $derived(
    isVisibilityControlled 
      ? (visibilityToggle as { visible: boolean }).visible 
      : internalVisible
  );

  // Toggle visibility
  function toggleVisibility(e: MouseEvent) {
    if (disabled) return;
    
    e.preventDefault();
    e.stopPropagation();

    const newVisible = !isVisible;

    if (!isVisibilityControlled) {
      internalVisible = newVisible;
    }

    if (typeof visibilityToggle === 'object' && visibilityToggle.onVisibleChange) {
      visibilityToggle.onVisibleChange(newVisible);
    }
  }

  // Prevent focus loss on icon click
  function handleMouseDown(e: MouseEvent) {
    e.preventDefault();
  }

  // Password class
  const passwordClasses = $derived.by(() => {
    const cls = [passwordPrefixCls];
    if (className) cls.push(className);
    return cls.join(' ');
  });
</script>

{#snippet passwordSuffix()}
  {#if visibilityToggle}
    <span
      class="{passwordPrefixCls}-icon {classNames.icon ?? ''}"
      style={styles.icon}
      role="button"
      tabindex="-1"
      onclick={toggleVisibility}
      onmousedown={handleMouseDown}
    >
      {#if iconRender}
        {@render iconRender(isVisible)}
      {:else if isVisible}
        <!-- Eye open icon -->
        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
        </svg>
      {:else}
        <!-- Eye closed icon -->
        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" />
          <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" />
        </svg>
      {/if}
    </span>
  {/if}
  {#if suffix}
    {@render suffix()}
  {/if}
{/snippet}

<Input
  type={isVisible ? 'text' : 'password'}
  {size}
  {disabled}
  {status}
  {variant}
  {prefix}
  suffix={passwordSuffix}
  class={passwordClasses}
  classNames={{
    root: classNames.root,
    input: classNames.input,
    prefix: classNames.prefix,
    suffix: classNames.suffix,
    clearIcon: classNames.clearIcon,
    count: classNames.count,
  }}
  styles={{
    root: styles.root,
    input: styles.input,
    prefix: styles.prefix,
    suffix: styles.suffix,
    clearIcon: styles.clearIcon,
    count: styles.count,
  }}
  {...restProps}
/>

<style>
  :global(.ant-input-password-icon) {
    color: var(--ant-color-icon, rgba(0, 0, 0, 0.45));
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  :global(.ant-input-password-icon):hover {
    color: var(--ant-color-icon-hover, rgba(0, 0, 0, 0.88));
  }

  :global(.ant-input-affix-wrapper-disabled .ant-input-password-icon) {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
  }

  :global(.ant-input-affix-wrapper-disabled .ant-input-password-icon):hover {
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }
</style>

