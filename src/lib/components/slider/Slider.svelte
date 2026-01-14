<script lang="ts" module>
  import type { SliderProps } from './types';

  export type { SliderProps };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { SliderProps as Props } from './types';

  let {
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    range = false,
    vertical = false,
    reverse = false,
    marks,
    dots = false,
    included = true,
    tooltip,
    prefixCls: customPrefixCls,
    class: className = '',
    style = '',
    classNames = {},
    styles = {},
    onchange,
    onchangecomplete,
    ...restProps
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('slider'));

  // Internal value state
  let internalValue = $state<number | [number, number]>(
    controlledValue !== undefined ? controlledValue : defaultValue
  );

  // Sync with controlled value
  $effect(() => {
    if (controlledValue !== undefined) {
      internalValue = controlledValue;
    }
  });

  // Current value (controlled or internal)
  const currentValue = $derived(controlledValue !== undefined ? controlledValue : internalValue);

  // Is range mode
  const isRange = $derived(!!range);

  // Get values as array for unified handling
  const values = $derived.by(() => {
    if (isRange) {
      return Array.isArray(currentValue) ? currentValue : [min, currentValue as number];
    }
    return [currentValue as number];
  });

  // Dragging state
  let isDragging = $state(false);
  let activeHandle = $state<number | null>(null);
  let showTooltip = $state<number | null>(null);

  // Rail element reference
  let railRef: HTMLDivElement;

  // Calculate percentage from value
  function valueToPercent(val: number): number {
    return ((val - min) / (max - min)) * 100;
  }

  // Calculate value from percentage
  function percentToValue(percent: number): number {
    const raw = (percent / 100) * (max - min) + min;
    if (step === null) {
      // Snap to marks only
      if (marks) {
        const markValues = Object.keys(marks).map(Number);
        return markValues.reduce((prev, curr) =>
          Math.abs(curr - raw) < Math.abs(prev - raw) ? curr : prev
        );
      }
      return raw;
    }
    // Snap to step
    const stepped = Math.round(raw / step) * step;
    return Math.max(min, Math.min(max, stepped));
  }

  // Get position from mouse/touch event
  function getPositionFromEvent(e: MouseEvent | TouchEvent): number {
    if (!railRef) return 0;
    const rect = railRef.getBoundingClientRect();
    const clientPos = 'touches' in e ? e.touches[0] : e;
    
    let percent: number;
    if (vertical) {
      percent = ((rect.bottom - clientPos.clientY) / rect.height) * 100;
    } else {
      percent = ((clientPos.clientX - rect.left) / rect.width) * 100;
    }
    
    if (reverse) {
      percent = 100 - percent;
    }
    
    return Math.max(0, Math.min(100, percent));
  }

  // Update value
  function updateValue(newValue: number | [number, number]) {
    if (controlledValue === undefined) {
      internalValue = newValue;
    }
    onchange?.(newValue);
  }

  // Handle mouse/touch down on rail
  function handleRailDown(e: MouseEvent | TouchEvent) {
    if (disabled) return;
    e.preventDefault();
    
    const percent = getPositionFromEvent(e);
    const newValue = percentToValue(percent);
    
    if (isRange) {
      const [v1, v2] = values as [number, number];
      // Find closest handle
      const d1 = Math.abs(valueToPercent(v1) - percent);
      const d2 = Math.abs(valueToPercent(v2) - percent);
      
      if (d1 <= d2) {
        activeHandle = 0;
        updateValue([newValue, v2]);
      } else {
        activeHandle = 1;
        updateValue([v1, newValue]);
      }
    } else {
      activeHandle = 0;
      updateValue(newValue);
    }
    
    isDragging = true;
    showTooltip = activeHandle;
    
    // Add global listeners
    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalUp);
    window.addEventListener('touchmove', handleGlobalMove);
    window.addEventListener('touchend', handleGlobalUp);
  }

  // Handle mouse/touch down on handle
  function handleHandleDown(e: MouseEvent | TouchEvent, index: number) {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    
    activeHandle = index;
    isDragging = true;
    showTooltip = index;
    
    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalUp);
    window.addEventListener('touchmove', handleGlobalMove);
    window.addEventListener('touchend', handleGlobalUp);
  }

  // Global move handler
  function handleGlobalMove(e: MouseEvent | TouchEvent) {
    if (!isDragging || activeHandle === null) return;
    
    const percent = getPositionFromEvent(e);
    const newValue = percentToValue(percent);
    
    if (isRange) {
      const newValues = [...values] as [number, number];
      newValues[activeHandle] = newValue;
      // Ensure values don't cross
      if (activeHandle === 0 && newValues[0] > newValues[1]) {
        newValues[0] = newValues[1];
      } else if (activeHandle === 1 && newValues[1] < newValues[0]) {
        newValues[1] = newValues[0];
      }
      updateValue(newValues);
    } else {
      updateValue(newValue);
    }
  }

  // Global up handler
  function handleGlobalUp() {
    if (isDragging) {
      onchangecomplete?.(currentValue);
    }
    
    isDragging = false;
    activeHandle = null;
    showTooltip = null;
    
    window.removeEventListener('mousemove', handleGlobalMove);
    window.removeEventListener('mouseup', handleGlobalUp);
    window.removeEventListener('touchmove', handleGlobalMove);
    window.removeEventListener('touchend', handleGlobalUp);
  }

  // Handle keyboard navigation
  function handleKeyDown(e: KeyboardEvent, index: number) {
    if (disabled) return;
    
    const stepSize = step ?? 1;
    let delta = 0;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        delta = stepSize;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -stepSize;
        break;
      case 'Home':
        delta = min - (values[index] ?? 0);
        break;
      case 'End':
        delta = max - (values[index] ?? 0);
        break;
      default:
        return;
    }
    
    if (reverse) delta = -delta;
    
    e.preventDefault();
    
    const newValue = Math.max(min, Math.min(max, (values[index] ?? 0) + delta));
    
    if (isRange) {
      const newValues = [...values] as [number, number];
      newValues[index] = newValue;
      // Ensure values don't cross
      if (index === 0 && newValues[0] > newValues[1]) {
        newValues[0] = newValues[1];
      } else if (index === 1 && newValues[1] < newValues[0]) {
        newValues[1] = newValues[0];
      }
      updateValue(newValues);
    } else {
      updateValue(newValue);
    }
    
    onchangecomplete?.(currentValue);
  }

  // Compute classes
  const classes = $derived.by(() => {
    const cls = [prefixCls];
    
    if (disabled) cls.push(`${prefixCls}-disabled`);
    if (vertical) cls.push(`${prefixCls}-vertical`);
    if (reverse) cls.push(`${prefixCls}-reverse`);
    if (marks) cls.push(`${prefixCls}-with-marks`);
    
    if (className) cls.push(className);
    if (classNames.root) cls.push(classNames.root);
    
    return cls.join(' ');
  });

  // Track style (for range or single value)
  const trackStyle = $derived.by(() => {
    const styleObj: Record<string, string> = {};
    
    if (isRange) {
      const [v1, v2] = values as [number, number];
      const start = valueToPercent(Math.min(v1, v2));
      const end = valueToPercent(Math.max(v1, v2));
      
      if (vertical) {
        styleObj[reverse ? 'top' : 'bottom'] = `${start}%`;
        styleObj.height = `${end - start}%`;
      } else {
        styleObj[reverse ? 'right' : 'left'] = `${start}%`;
        styleObj.width = `${end - start}%`;
      }
    } else {
      const percent = valueToPercent(values[0] ?? 0);
      if (vertical) {
        styleObj[reverse ? 'top' : 'bottom'] = '0%';
        styleObj.height = `${percent}%`;
      } else {
        styleObj[reverse ? 'right' : 'left'] = '0%';
        styleObj.width = `${percent}%`;
      }
    }
    
    return Object.entries(styleObj).map(([k, v]) => `${k}: ${v}`).join('; ');
  });

  // Format tooltip value
  function formatTooltip(val: number): string | null {
    if (tooltip?.formatter === null) return null;
    if (tooltip?.formatter) return tooltip.formatter(val);
    return String(val);
  }

  // Should show tooltip for handle
  function shouldShowTooltip(index: number): boolean {
    if (tooltip?.open === true) return true;
    if (tooltip?.open === false) return false;
    return showTooltip === index || activeHandle === index;
  }
</script>

<div
  class={classes}
  style={[style, styles.root].filter(Boolean).join('; ') || undefined}
  {...restProps}
>
  <!-- Rail -->
  <div
    class="{prefixCls}-rail {classNames.rail ?? ''}"
    style={styles.rail}
    bind:this={railRef}
    onmousedown={handleRailDown}
    ontouchstart={handleRailDown}
    role="presentation"
  ></div>

  <!-- Track -->
  {#if included}
    <div
      class="{prefixCls}-track {classNames.track ?? ''}"
      style={[trackStyle, styles.track].filter(Boolean).join('; ')}
      onmousedown={handleRailDown}
      ontouchstart={handleRailDown}
      role="presentation"
    ></div>
  {/if}

  <!-- Dots (step marks or mark positions) -->
  {#if dots && step}
    <div class="{prefixCls}-step">
      {#each Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step) as dotValue}
        {@const isActive = isRange 
          ? dotValue >= Math.min(...(values as number[])) && dotValue <= Math.max(...(values as number[]))
          : dotValue <= (values[0] ?? 0)}
        {@const positionProp = vertical ? (reverse ? 'top' : 'bottom') : (reverse ? 'right' : 'left')}
        <span
          class="{prefixCls}-dot {isActive ? `${prefixCls}-dot-active` : ''} {classNames.dot ?? ''}"
          style="{positionProp}: {valueToPercent(dotValue)}%; {styles.dot ?? ''}"
        ></span>
      {/each}
    </div>
  {:else if marks}
    <!-- Show dots at mark positions when marks are provided -->
    <div class="{prefixCls}-step">
      {#each Object.keys(marks).map(Number) as dotValue}
        {@const isActive = isRange 
          ? dotValue >= Math.min(...(values as number[])) && dotValue <= Math.max(...(values as number[]))
          : dotValue <= (values[0] ?? 0)}
        {@const positionProp = vertical ? (reverse ? 'top' : 'bottom') : (reverse ? 'right' : 'left')}
        <span
          class="{prefixCls}-dot {isActive ? `${prefixCls}-dot-active` : ''} {classNames.dot ?? ''}"
          style="{positionProp}: {valueToPercent(dotValue)}%; {styles.dot ?? ''}"
        ></span>
      {/each}
    </div>
  {/if}

  <!-- Marks -->
  {#if marks}
    <div class="{prefixCls}-marks">
      {#each Object.entries(marks) as [markValue, markConfig]}
        {@const numValue = Number(markValue)}
        {@const isActive = isRange 
          ? numValue >= Math.min(...(values as number[])) && numValue <= Math.max(...(values as number[]))
          : numValue <= (values[0] ?? 0)}
        {@const label = typeof markConfig === 'string' ? markConfig : markConfig.label}
        {@const markStyle = typeof markConfig === 'object' ? markConfig.style : undefined}
        {@const positionProp = vertical ? (reverse ? 'top' : 'bottom') : (reverse ? 'right' : 'left')}
        <span
          class="{prefixCls}-mark-text {isActive ? `${prefixCls}-mark-text-active` : ''} {classNames.markText ?? ''}"
          style="{positionProp}: {valueToPercent(numValue)}%; {markStyle ?? ''} {styles.markText ?? ''}"
        >
          {#if typeof label === 'function'}
            {@render label()}
          {:else}
            {label}
          {/if}
        </span>
      {/each}
    </div>
  {/if}

  <!-- Handles -->
  {#each values as val, index}
    {@const percent = valueToPercent(val)}
    {@const tooltipContent = formatTooltip(val)}
    {@const positionProp = vertical ? (reverse ? 'top' : 'bottom') : (reverse ? 'right' : 'left')}
    <div
      class="{prefixCls}-handle {activeHandle === index ? `${prefixCls}-handle-dragging` : ''} {classNames.handle ?? ''}"
      style="{positionProp}: {percent}%; {styles.handle ?? ''}"
      role="slider"
      tabindex={disabled ? -1 : 0}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={val}
      aria-disabled={disabled}
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      onmousedown={(e) => handleHandleDown(e, index)}
      ontouchstart={(e) => handleHandleDown(e, index)}
      onkeydown={(e) => handleKeyDown(e, index)}
      onmouseenter={() => showTooltip = index}
      onmouseleave={() => { if (!isDragging) showTooltip = null }}
      onfocus={() => showTooltip = index}
      onblur={() => { if (!isDragging) showTooltip = null }}
    >
      {#if tooltipContent !== null && shouldShowTooltip(index)}
        <div class="{prefixCls}-tooltip">
          <div class="{prefixCls}-tooltip-content">{tooltipContent}</div>
          <div class="{prefixCls}-tooltip-arrow"></div>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style global lang="css">
  /* ==================== Base Slider Styles ==================== */
  :global(.ant-slider) {
    position: relative;
    box-sizing: border-box;
    height: 12px;
    margin: 10px 6px;
    padding: 4px 0;
    cursor: pointer;
    touch-action: none;
  }

  :global(.ant-slider-vertical) {
    width: 12px;
    height: 100%;
    margin: 6px 10px;
    padding: 0 4px;
  }

  /* ==================== Rail ==================== */
  :global(.ant-slider-rail) {
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: var(--ant-color-fill-tertiary, rgba(0, 0, 0, 0.04));
    border-radius: 2px;
    transition: background-color 0.2s;
  }

  :global(.ant-slider:not(.ant-slider-disabled):hover .ant-slider-rail) {
    background-color: var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06));
  }

  :global(.ant-slider-vertical .ant-slider-rail) {
    width: 4px;
    height: 100%;
  }

  /* ==================== Track ==================== */
  :global(.ant-slider-track) {
    position: absolute;
    height: 4px;
    background-color: var(--ant-color-primary-border, #91caff);
    border-radius: 2px;
    transition: background-color 0.2s;
  }

  :global(.ant-slider:not(.ant-slider-disabled):hover .ant-slider-track) {
    background-color: var(--ant-color-primary-border-hover, #69b1ff);
  }

  :global(.ant-slider-vertical .ant-slider-track) {
    width: 4px;
  }

  /* ==================== Handle ==================== */
  :global(.ant-slider-handle) {
    position: absolute;
    width: 10px;
    height: 10px;
    margin-top: -3px;
    background-color: var(--ant-color-bg-container, #fff);
    border: 2px solid var(--ant-color-primary-border, #91caff);
    border-radius: 50%;
    cursor: grab;
    transition: 
      border-color 0.2s,
      box-shadow 0.2s,
      transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    transform: translateX(-50%);
    outline: none;
    user-select: none;
  }

  :global(.ant-slider-handle::after) {
    content: '';
    position: absolute;
    inset: -6px;
  }

  :global(.ant-slider-handle:hover),
  :global(.ant-slider-handle:focus) {
    border-color: var(--ant-color-primary, #1677ff);
    transform: translateX(-50%) scale(1.2);
  }

  :global(.ant-slider-handle-dragging) {
    border-color: var(--ant-color-primary, #1677ff);
    box-shadow: 0 0 0 4px var(--ant-color-primary-bg, rgba(22, 119, 255, 0.2));
    cursor: grabbing;
  }

  :global(.ant-slider-vertical .ant-slider-handle) {
    margin-top: 0;
    margin-left: -3px;
    transform: translateY(50%);
  }

  :global(.ant-slider-vertical .ant-slider-handle:hover),
  :global(.ant-slider-vertical .ant-slider-handle:focus) {
    transform: translateY(50%) scale(1.2);
  }

  /* Reverse horizontal - handle uses right positioning */
  :global(.ant-slider-reverse:not(.ant-slider-vertical) .ant-slider-handle) {
    transform: translateX(50%);
  }

  :global(.ant-slider-reverse:not(.ant-slider-vertical) .ant-slider-handle:hover),
  :global(.ant-slider-reverse:not(.ant-slider-vertical) .ant-slider-handle:focus) {
    transform: translateX(50%) scale(1.2);
  }

  /* Reverse vertical - handle uses top positioning */
  :global(.ant-slider-vertical.ant-slider-reverse .ant-slider-handle) {
    transform: translateY(-50%);
  }

  :global(.ant-slider-vertical.ant-slider-reverse .ant-slider-handle:hover),
  :global(.ant-slider-vertical.ant-slider-reverse .ant-slider-handle:focus) {
    transform: translateY(-50%) scale(1.2);
  }

  /* ==================== Tooltip ==================== */
  :global(.ant-slider-tooltip) {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
    pointer-events: none;
    z-index: 1000;
  }

  :global(.ant-slider-tooltip-content) {
    padding: 4px 8px;
    font-size: 12px;
    line-height: 1.5;
    color: #fff;
    background-color: var(--ant-color-bg-spotlight, rgba(0, 0, 0, 0.85));
    border-radius: var(--ant-border-radius, 6px);
    box-shadow: var(--ant-box-shadow-secondary, 0 6px 16px 0 rgba(0, 0, 0, 0.08));
    white-space: nowrap;
  }

  :global(.ant-slider-tooltip-arrow) {
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    background-color: var(--ant-color-bg-spotlight, rgba(0, 0, 0, 0.85));
    transform: translateX(-50%) rotate(45deg);
  }

  :global(.ant-slider-vertical .ant-slider-tooltip) {
    bottom: auto;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-bottom: 0;
    margin-left: 8px;
  }

  :global(.ant-slider-vertical .ant-slider-tooltip-arrow) {
    bottom: auto;
    left: -4px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  /* ==================== Dots ==================== */
  :global(.ant-slider-step) {
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
    pointer-events: none;
  }

  :global(.ant-slider-vertical .ant-slider-step) {
    width: 4px;
    height: 100%;
  }

  :global(.ant-slider-dot) {
    position: absolute;
    top: 50%;
    width: 8px;
    height: 8px;
    margin-left: -4px;
    background-color: var(--ant-color-bg-container, #fff);
    border: 2px solid var(--ant-color-border-secondary, #f0f0f0);
    border-radius: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  :global(.ant-slider-dot-active) {
    border-color: var(--ant-color-primary-border, #91caff);
  }

  :global(.ant-slider-vertical .ant-slider-dot) {
    top: auto;
    left: 50%;
    margin-left: 0;
    margin-bottom: -4px;
    transform: translateX(-50%);
  }

  /* Reverse horizontal dots */
  :global(.ant-slider-reverse:not(.ant-slider-vertical) .ant-slider-dot) {
    margin-left: 0;
    margin-right: -4px;
    transform: translateY(-50%);
  }

  /* Reverse vertical dots */
  :global(.ant-slider-vertical.ant-slider-reverse .ant-slider-dot) {
    margin-bottom: 0;
    margin-top: -4px;
  }

  /* ==================== Marks ==================== */
  :global(.ant-slider-marks) {
    position: absolute;
    top: 14px;
    left: 0;
    width: 100%;
    font-size: 12px;
  }

  :global(.ant-slider-vertical .ant-slider-marks) {
    top: 0;
    left: 14px;
    width: auto;
    height: 100%;
  }

  :global(.ant-slider-mark-text) {
    position: absolute;
    display: inline-block;
    color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
    text-align: center;
    word-break: keep-all;
    transform: translateX(-50%);
    cursor: pointer;
    user-select: none;
  }

  :global(.ant-slider-mark-text-active) {
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
  }

  :global(.ant-slider-vertical .ant-slider-mark-text) {
    transform: translateY(50%);
  }

  /* Reverse horizontal marks */
  :global(.ant-slider-reverse:not(.ant-slider-vertical) .ant-slider-mark-text) {
    transform: translateX(50%);
  }

  /* Reverse vertical marks */
  :global(.ant-slider-vertical.ant-slider-reverse .ant-slider-mark-text) {
    transform: translateY(-50%);
  }

  /* ==================== With Marks ==================== */
  :global(.ant-slider-with-marks) {
    margin-bottom: 28px;
  }

  :global(.ant-slider-vertical.ant-slider-with-marks) {
    margin-bottom: 10px;
    margin-right: 28px;
  }

  /* ==================== Disabled ==================== */
  :global(.ant-slider-disabled) {
    cursor: not-allowed;
  }

  :global(.ant-slider-disabled .ant-slider-rail) {
    background-color: var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06));
  }

  :global(.ant-slider-disabled .ant-slider-track) {
    background-color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
  }

  :global(.ant-slider-disabled .ant-slider-handle) {
    background-color: var(--ant-color-bg-container, #fff);
    border-color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    cursor: not-allowed;
  }

  :global(.ant-slider-disabled .ant-slider-handle:hover),
  :global(.ant-slider-disabled .ant-slider-handle:focus) {
    border-color: var(--ant-color-text-disabled, rgba(0, 0, 0, 0.25));
    transform: translateX(-50%);
  }

  :global(.ant-slider-disabled .ant-slider-dot) {
    border-color: var(--ant-color-border-secondary, #f0f0f0);
    cursor: not-allowed;
  }

  :global(.ant-slider-disabled .ant-slider-mark-text) {
    cursor: not-allowed;
  }
</style>

