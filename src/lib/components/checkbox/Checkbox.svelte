<script lang="ts" module>
  import type { CheckboxProps, CheckboxClassNames, CheckboxStyles, CheckboxChangeEvent } from './types';

  export type { CheckboxProps, CheckboxClassNames, CheckboxStyles, CheckboxChangeEvent };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { CheckboxProps as Props } from './types';

  let {
    checked: checkedProp,
    defaultChecked = false,
    disabled = false,
    indeterminate = false,
    name,
    value,
    tabIndex = 0,
    autoFocus = false,
    prefixCls: customPrefixCls,
    class: className = '',
    classNames = {},
    style: customStyle = '',
    styles = {},
    label: children,
    onchange,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('checkbox'));

  // Internal checked state (for uncontrolled mode)
  let internalChecked = $state(defaultChecked);

  // Actual checked state
  const isChecked = $derived(checkedProp !== undefined ? checkedProp : internalChecked);

  // Wave animation state
  let showWave = $state(false);

  // Handle change
  function handleChange(e: Event) {
    if (disabled) return;

    const target = e.target as HTMLInputElement;
    const newChecked = target.checked;

    // Trigger wave animation
    showWave = true;
    setTimeout(() => {
      showWave = false;
    }, 400);

    // Update internal state if uncontrolled
    if (checkedProp === undefined) {
      internalChecked = newChecked;
    }

    onchange?.({
      checked: newChecked,
      indeterminate: false,
      nativeEvent: e,
    });
  }

  // Compute class names
  const wrapperClasses = $derived.by(() => {
    const cls = [`${prefixCls}-wrapper`];

    if (isChecked) cls.push(`${prefixCls}-wrapper-checked`);
    if (disabled) cls.push(`${prefixCls}-wrapper-disabled`);
    if (indeterminate) cls.push(`${prefixCls}-wrapper-indeterminate`);
    if (config.direction === 'rtl') cls.push(`${prefixCls}-wrapper-rtl`);
    if (className) cls.push(className);
    if (classNames.root) cls.push(classNames.root);

    return cls.join(' ');
  });

  const checkboxClasses = $derived.by(() => {
    const cls = [prefixCls];

    if (isChecked) cls.push(`${prefixCls}-checked`);
    if (disabled) cls.push(`${prefixCls}-disabled`);
    if (indeterminate) cls.push(`${prefixCls}-indeterminate`);
    if (showWave) cls.push(`${prefixCls}-wave`);
    if (classNames.input) cls.push(classNames.input);

    return cls.join(' ');
  });

  // Root style
  const rootStyle = $derived.by(() => {
    const styleList: string[] = [];
    if (customStyle) styleList.push(customStyle);
    if (styles.root) styleList.push(styles.root);
    return styleList.join('; ');
  });
</script>

<label 
  class={wrapperClasses}
  style={rootStyle}
  {...restProps}
>
  <span class={checkboxClasses} style={styles.input}>
    <input
      type="checkbox"
      class="{prefixCls}-input"
      checked={isChecked}
      {disabled}
      {name}
      {value}
      tabindex={tabIndex}
      onchange={handleChange}
    />
    <span class="{prefixCls}-inner"></span>
  </span>
  {#if children}
    <span class="{prefixCls}-label {classNames.label ?? ''}" style={styles.label}>
      {@render children()}
    </span>
  {/if}
</label>

<style>
  :global(.ant-checkbox-wrapper) {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    line-height: 1.5714285714285714;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  :global(.ant-checkbox-wrapper-disabled) {
    cursor: not-allowed;
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-checkbox) {
    position: relative;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    outline: none;
    cursor: pointer;
  }

  :global(.ant-checkbox-disabled) {
    cursor: not-allowed;
  }

  :global(.ant-checkbox-input) {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    margin: 0;
  }

  :global(.ant-checkbox-disabled .ant-checkbox-input) {
    cursor: not-allowed;
  }

  /* 
   * Custom properties for checkbox styling via styles.input:
   * --checkbox-color: checked background & border color
   * --checkbox-border-color: unchecked border color  
   * --checkbox-check-color: checkmark color
   */
  :global(.ant-checkbox-inner) {
    position: relative;
    display: block;
    width: 16px;
    height: 16px;
    background-color: var(--ant-color-bg-container, #ffffff);
    border: 1px solid var(--checkbox-border-color, var(--ant-color-border, #d9d9d9));
    border-radius: 4px;
    transition: all 0.2s;
  }

  :global(.ant-checkbox-inner::after) {
    content: '';
    position: absolute;
    top: 50%;
    inset-inline-start: 25%;
    display: table;
    width: 5px;
    height: 9px;
    border: 2px solid var(--checkbox-check-color, #fff);
    border-top: 0;
    border-inline-start: 0;
    transform: rotate(45deg) scale(0) translate(-50%, -50%);
    opacity: 0;
    transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
  }

  :global(.ant-checkbox-checked .ant-checkbox-inner) {
    background-color: var(--checkbox-color, var(--ant-color-primary, #1677ff));
    border-color: var(--checkbox-color, var(--ant-color-primary, #1677ff));
  }

  :global(.ant-checkbox-checked .ant-checkbox-inner::after) {
    transform: rotate(45deg) scale(1) translate(-50%, -50%);
    opacity: 1;
    transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  }

  :global(.ant-checkbox-indeterminate .ant-checkbox-inner) {
    background-color: var(--ant-color-bg-container, #ffffff);
    border-color: var(--checkbox-color, var(--ant-color-primary, #1677ff));
  }

  :global(.ant-checkbox-indeterminate .ant-checkbox-inner::after) {
    top: 50%;
    inset-inline-start: 50%;
    width: 8px;
    height: 8px;
    background-color: var(--checkbox-color, var(--ant-color-primary, #1677ff));
    border: 0;
    border-radius: 2px;
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  :global(.ant-checkbox-disabled .ant-checkbox-inner) {
    background-color: var(--ant-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
    border-color: var(--ant-color-border, #d9d9d9);
  }

  :global(.ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner) {
    background-color: var(--ant-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
    border-color: var(--ant-color-border, #d9d9d9);
  }

  :global(.ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner::after) {
    border-color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-checkbox:not(.ant-checkbox-disabled):hover .ant-checkbox-inner) {
    border-color: var(--checkbox-color, var(--ant-color-primary, #1677ff));
  }

  :global(.ant-checkbox-label) {
    padding-inline-start: 8px;
    padding-inline-end: 8px;
  }

  /* Wave effect on active */
  :global(.ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):active .ant-checkbox-inner) {
    border-color: var(--checkbox-color, var(--ant-color-primary, #1677ff));
  }

  /* Wave animation on toggle */
  :global(.ant-checkbox-wave .ant-checkbox-inner::before) {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    border: 0 solid var(--checkbox-color, var(--ant-color-primary, #1677ff));
    opacity: 0.2;
    animation: ant-checkbox-wave-effect 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
    animation-fill-mode: forwards;
    pointer-events: none;
  }

  @keyframes ant-checkbox-wave-effect {
    0% {
      inset: -1px;
      border-width: 0;
      opacity: 0.2;
    }
    100% {
      inset: -6px;
      border-width: 5px;
      opacity: 0;
    }
  }
</style>

