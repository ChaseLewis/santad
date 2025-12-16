<script lang="ts" module>
  import type { RadioProps, RadioClassNames, RadioStyles, RadioChangeEvent } from './types';

  export type { RadioProps, RadioClassNames, RadioStyles, RadioChangeEvent };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import { getRadioGroupContext } from './context.svelte';
  import type { RadioProps as Props } from './types';

  let {
    checked: checkedProp,
    disabled: disabledProp = false,
    name: nameProp,
    value,
    tabIndex = 0,
    autoFocus = false,
    prefixCls: customPrefixCls,
    class: className = '',
    classNames = {},
    style: customStyle = '',
    styles = {},
    children,
    onchange,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Get group context
  const group = getRadioGroupContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('radio'));

  // Merge props from group context
  const name = $derived(group?.name ?? nameProp);
  const disabled = $derived(group?.disabled ?? disabledProp);
  const isChecked = $derived(group ? group.value === value : checkedProp ?? false);

  // Handle change
  function handleChange(e: Event) {
    if (disabled) return;

    const changeEvent: RadioChangeEvent = {
      value: value ?? '',
      nativeEvent: e,
    };

    onchange?.(changeEvent);
    group?.onChange?.(changeEvent);
  }

  // Compute class names
  const wrapperClasses = $derived.by(() => {
    const cls = [`${prefixCls}-wrapper`];

    if (isChecked) cls.push(`${prefixCls}-wrapper-checked`);
    if (disabled) cls.push(`${prefixCls}-wrapper-disabled`);
    if (config.direction === 'rtl') cls.push(`${prefixCls}-wrapper-rtl`);
    if (className) cls.push(className);
    if (classNames.root) cls.push(classNames.root);

    return cls.join(' ');
  });

  const radioClasses = $derived.by(() => {
    const cls = [prefixCls];

    if (isChecked) cls.push(`${prefixCls}-checked`);
    if (disabled) cls.push(`${prefixCls}-disabled`);
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
  <span class={radioClasses} style={styles.input}>
    <input
      type="radio"
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
  :global(.ant-radio-wrapper) {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    line-height: 1.5714285714285714;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  :global(.ant-radio-wrapper-disabled) {
    cursor: not-allowed;
    color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-radio) {
    position: relative;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    outline: none;
    cursor: pointer;
  }

  :global(.ant-radio-disabled) {
    cursor: not-allowed;
  }

  :global(.ant-radio-input) {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    margin: 0;
  }

  :global(.ant-radio-disabled .ant-radio-input) {
    cursor: not-allowed;
  }

  :global(.ant-radio-inner) {
    position: relative;
    display: block;
    width: 16px;
    height: 16px;
    background-color: var(--ant-color-bg-container, #ffffff);
    border: 1px solid var(--ant-color-border, #d9d9d9);
    border-radius: 50%;
    transition: all 0.2s;
  }

  :global(.ant-radio-inner::after) {
    content: '';
    position: absolute;
    top: 50%;
    inset-inline-start: 50%;
    display: block;
    width: 16px;
    height: 16px;
    margin-top: -8px;
    margin-inline-start: -8px;
    background-color: var(--ant-color-primary, #1677ff);
    border-radius: 50%;
    transform: scale(0);
    opacity: 0;
    transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  }

  :global(.ant-radio-checked .ant-radio-inner) {
    border-color: var(--ant-color-primary, #1677ff);
  }

  :global(.ant-radio-checked .ant-radio-inner::after) {
    transform: scale(0.375);
    opacity: 1;
  }

  :global(.ant-radio-disabled .ant-radio-inner) {
    background-color: var(--ant-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
    border-color: var(--ant-color-border, #d9d9d9);
  }

  :global(.ant-radio-disabled.ant-radio-checked .ant-radio-inner::after) {
    background-color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-radio:not(.ant-radio-disabled):hover .ant-radio-inner) {
    border-color: var(--ant-color-primary, #1677ff);
  }

  :global(.ant-radio-label) {
    padding-inline-start: 8px;
    padding-inline-end: 8px;
  }

  /* Wave effect */
  :global(.ant-radio-wrapper:not(.ant-radio-wrapper-disabled):active .ant-radio-inner) {
    border-color: var(--ant-color-primary, #1677ff);
  }
</style>

