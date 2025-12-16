<script lang="ts" module>
  import type { RadioGroupProps } from './types';

  export type { RadioGroupProps };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import { setRadioGroupContext } from './context.svelte';
  import type { RadioGroupProps as Props, RadioChangeEvent } from './types';

  let {
    value: valueProp,
    defaultValue,
    disabled = false,
    name,
    buttonStyle = 'outline',
    optionType = 'default',
    options,
    class: className = '',
    style: customStyle = '',
    children,
    onchange,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(config.getPrefixCls('radio'));

  // Internal value state (for uncontrolled mode)
  let internalValue = $state(defaultValue);

  // Actual value
  const currentValue = $derived(valueProp !== undefined ? valueProp : internalValue);

  // Handle change from child radios
  function handleChange(event: RadioChangeEvent) {
    const newValue = event.value;

    // Update internal state if uncontrolled
    if (valueProp === undefined) {
      internalValue = newValue;
    }

    onchange?.(newValue);
  }

  // Set context for child Radio components
  setRadioGroupContext({
    get name() { return name; },
    get value() { return currentValue; },
    get disabled() { return disabled; },
    onChange: handleChange,
  });

  // Compute class names
  const classes = $derived.by(() => {
    const cls = [`${prefixCls}-group`];

    if (config.direction === 'rtl') cls.push(`${prefixCls}-group-rtl`);
    if (className) cls.push(className);

    return cls.join(' ');
  });
</script>

<div
  class={classes}
  style={customStyle}
  role="radiogroup"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  :global(.ant-radio-group) {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 14px;
    line-height: 1.5714285714285714;
  }

  :global(.ant-radio-group-rtl) {
    direction: rtl;
  }
</style>
