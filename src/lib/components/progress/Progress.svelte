<script lang="ts" module>
  import type { ProgressProps, ProgressType, ProgressStatus } from './types';

  export type { ProgressProps, ProgressType, ProgressStatus };
</script>

<script lang="ts">
  import { getConfigContext } from '../../config/context.svelte';
  import type { ProgressProps as Props } from './types';

  let {
    percent = 0,
    type = 'line',
    status,
    showInfo = true,
    strokeColor,
    strokeLinecap = 'round',
    strokeWidth,
    trailColor,
    width = 120,
    gapDegree = 75,
    gapPosition = 'bottom',
    size = 'default',
    steps,
    format,
    info,
    prefixCls: customPrefixCls,
    class: className = '',
    style = '',
    classNames = {},
    styles = {},
  }: Props = $props();

  // Get config from context
  const config = getConfigContext();

  // Compute prefix class
  const prefixCls = $derived(customPrefixCls ?? config.getPrefixCls('progress'));

  // Clamp percent to 0-100
  const validPercent = $derived(Math.min(100, Math.max(0, percent)));

  // Compute status - auto set to success at 100%
  const computedStatus = $derived.by((): ProgressStatus => {
    if (status) return status;
    if (validPercent >= 100) return 'success';
    return 'normal';
  });

  // Compute stroke width based on size
  const computedStrokeWidth = $derived.by(() => {
    if (strokeWidth !== undefined) return strokeWidth;
    if (type === 'line') {
      if (size === 'small') return 6;
      return 8;
    }
    return 6;
  });

  // Compute line height based on size
  const lineHeight = $derived.by(() => {
    if (typeof size === 'number') return size;
    if (Array.isArray(size)) return size[1] ?? size[0];
    if (size === 'small') return 6;
    return 8;
  });

  // Compute circle width based on size
  const circleWidth = $derived.by(() => {
    if (typeof size === 'number') return size;
    if (Array.isArray(size)) return size[0];
    if (size === 'small') return 80;
    return width;
  });

  // Compute stroke color
  const computedStrokeColor = $derived.by(() => {
    if (strokeColor) {
      if (typeof strokeColor === 'string') return strokeColor;
      if ('from' in strokeColor) {
        return `linear-gradient(to right, ${strokeColor.from}, ${strokeColor.to})`;
      }
      if (Array.isArray(strokeColor)) {
        return `linear-gradient(to right, ${strokeColor.join(', ')})`;
      }
    }
    // Default colors based on status
    switch (computedStatus) {
      case 'success': return 'var(--ant-color-success, #52c41a)';
      case 'exception': return 'var(--ant-color-error, #ff4d4f)';
      default: return 'var(--ant-color-primary, #1677ff)';
    }
  });

  // Format percentage display
  const displayText = $derived.by(() => {
    if (format) return format(validPercent);
    return `${validPercent}%`;
  });

  // Circle calculations
  const circleRadius = $derived((circleWidth - computedStrokeWidth) / 2);
  const circleCircumference = $derived(2 * Math.PI * circleRadius);
  
  // Dashboard gap calculations
  const dashGapDegree = $derived(type === 'dashboard' ? gapDegree : 0);
  const totalDegrees = $derived(360 - dashGapDegree);
  const dashOffset = $derived(circleCircumference * (1 - (validPercent / 100) * (totalDegrees / 360)));
  const trailDashOffset = $derived(circleCircumference * (dashGapDegree / 360));

  // Rotation based on gap position
  const rotationDegrees = $derived.by(() => {
    const baseRotation = 90 + dashGapDegree / 2;
    switch (gapPosition) {
      case 'left': return baseRotation + 90;
      case 'right': return baseRotation - 90;
      case 'top': return baseRotation + 180;
      default: return baseRotation; // bottom
    }
  });

  // Root classes
  const rootClasses = $derived.by(() => {
    const cls = [prefixCls, `${prefixCls}-${type}`];
    
    cls.push(`${prefixCls}-status-${computedStatus}`);
    if (showInfo) cls.push(`${prefixCls}-show-info`);
    if (size === 'small') cls.push(`${prefixCls}-small`);
    if (steps) cls.push(`${prefixCls}-steps`);
    
    if (className) cls.push(className);
    if (classNames.root) cls.push(classNames.root);
    
    return cls.join(' ');
  });

  // Root styles
  const rootStyles = $derived.by(() => {
    const parts: string[] = [];
    if (style) parts.push(style);
    if (styles.root) parts.push(styles.root);
    return parts.join('; ') || undefined;
  });

  // Steps calculation
  const stepsArray = $derived.by(() => {
    if (!steps) return [];
    const stepPercent = 100 / steps;
    return Array.from({ length: steps }, (_, i) => {
      const stepStart = i * stepPercent;
      const stepEnd = (i + 1) * stepPercent;
      if (validPercent >= stepEnd) return 100;
      if (validPercent <= stepStart) return 0;
      return ((validPercent - stepStart) / stepPercent) * 100;
    });
  });

  // Circle steps calculations
  const circleStepsData = $derived.by(() => {
    if (!steps || type === 'line') return null;
    
    // Gap between segments - larger for round linecap to avoid overlap
    const baseGap = strokeLinecap === 'round' ? 6 : 3;
    const gapPercent = strokeLinecap === 'round' ? 0.15 : 0.08;
    const gapAngle = Math.max(baseGap, 360 / steps * gapPercent);
    const availableDegrees = totalDegrees - (gapAngle * steps);
    const stepDegrees = availableDegrees / steps;
    const stepArcLength = (stepDegrees / 360) * circleCircumference;
    const gapArcLength = (gapAngle / 360) * circleCircumference;
    
    // Trail pattern: arc, gap, arc, gap, ...
    const trailPattern: number[] = [];
    for (let i = 0; i < steps; i++) {
      trailPattern.push(stepArcLength, gapArcLength);
    }
    
    // Center first gap at top (12 o'clock), first segment starts just after
    const startAngle = -90 + gapAngle / 2;
    const dashOffset = -(startAngle / 360) * circleCircumference;
    
    // Calculate individual arc segments for progress (no dasharray needed)
    const cx = circleWidth / 2;
    const cy = circleWidth / 2;
    const r = circleRadius;
    
    const progressArcs: Array<{ path: string; fillAmount: number }> = [];
    
    for (let i = 0; i < steps; i++) {
      const stepStart = (i / steps) * 100;
      const fillAmount = validPercent > stepStart 
        ? Math.min(1, (validPercent - stepStart) / (100 / steps)) 
        : 0;
      
      if (fillAmount <= 0) continue;
      
      // Calculate arc start and end angles for this step
      const stepStartAngle = startAngle + i * (stepDegrees + gapAngle);
      const arcDegrees = stepDegrees * fillAmount;
      const stepEndAngle = stepStartAngle + arcDegrees;
      
      // Convert to radians
      const startRad = (stepStartAngle * Math.PI) / 180;
      const endRad = (stepEndAngle * Math.PI) / 180;
      
      // Calculate arc points
      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);
      
      // Large arc flag (1 if arc > 180 degrees)
      const largeArc = arcDegrees > 180 ? 1 : 0;
      
      // SVG arc path
      const path = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
      
      progressArcs.push({ path, fillAmount });
    }
    
    return {
      trailDashArray: trailPattern.join(' '),
      dashOffset,
      progressArcs,
    };
  });
</script>

<div class={rootClasses} style={rootStyles}>
  {#if type === 'line'}
    <!-- Line Progress -->
    <div class="{prefixCls}-outer {classNames.outer ?? ''}">
      <div 
        class="{prefixCls}-inner {steps ? '' : classNames.trail ?? ''}" 
        style="height: {lineHeight}px; {styles.progress ? 'overflow: visible;' : ''} {steps ? '' : `background-color: ${trailColor ?? 'var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06))'}; ${styles.trail ?? ''}`}"
      >
        {#if steps}
          <!-- Steps Progress - each step has trail with progress overlay -->
          <div class="{prefixCls}-steps-outer">
            {#each stepsArray as stepFillPercent, i}
              <div 
                class="{prefixCls}-steps-item {classNames.trail ?? ''}"
                style="
                  position: relative;
                  width: calc({100 / steps}% - 2px);
                  height: 100%;
                  background-color: {trailColor ?? 'var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06))'};
                  border-radius: {strokeLinecap === 'round' ? `${lineHeight / 2}px` : '0'};
                  overflow: hidden;
                  {styles.trail ?? ''}
                "
              >
                {#if stepFillPercent > 0}
                  <div 
                    class="{prefixCls}-steps-item-progress {classNames.progress ?? ''}"
                    style="
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: {stepFillPercent}%;
                      height: 100%;
                      background-color: {computedStrokeColor};
                      border-radius: {strokeLinecap === 'round' ? `${lineHeight / 2}px` : '0'};
                      {styles.progress ?? ''}
                    "
                  ></div>
                {/if}
              </div>
            {/each}
          </div>
        {:else}
          <!-- Regular Progress Bar -->
          <div 
            class="{prefixCls}-bg {computedStatus === 'active' ? `${prefixCls}-bg-active` : ''} {classNames.progress ?? ''}"
            style="
              width: {validPercent}%;
              height: 100%;
              background: {computedStrokeColor};
              border-radius: {strokeLinecap === 'round' ? `${lineHeight / 2}px` : '0'};
              {styles.progress ?? ''}
            "
          ></div>
        {/if}
      </div>
    </div>
    
    {#if showInfo}
      <span class="{prefixCls}-text {classNames.text ?? ''}" style={styles.text ?? undefined}>
        {#if info}
          {@render info()}
        {:else if computedStatus === 'success'}
          <svg viewBox="64 64 896 896" width="2em" height="2em" fill="currentColor">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/>
          </svg>
        {:else if computedStatus === 'exception'}
          <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
          </svg>
        {:else}
          {displayText}
        {/if}
      </span>
    {/if}

  {:else}
    <!-- Circle / Dashboard Progress -->
    <div class="{prefixCls}-inner {classNames.inner ?? ''}" style="width: {circleWidth}px; height: {circleWidth}px; {styles.inner ?? ''}">
      <svg viewBox="0 0 {circleWidth} {circleWidth}">
        {#if steps && circleStepsData}
          <!-- Stepped circle progress - trail with segmented dash pattern -->
          <circle
            class="{prefixCls}-circle-trail {classNames.trail ?? ''}"
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            r={circleRadius}
            stroke={trailColor ?? 'var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06))'}
            stroke-width={computedStrokeWidth}
            fill="none"
            stroke-dasharray={circleStepsData.trailDashArray}
            stroke-dashoffset={circleStepsData.dashOffset}
            stroke-linecap={strokeLinecap}
          />
          <!-- Progress arcs - individual paths for each filled segment -->
          {#each circleStepsData.progressArcs as arc}
            <path
              class="{prefixCls}-circle-path {classNames.progress ?? ''}"
              d={arc.path}
              stroke={computedStrokeColor}
              stroke-width={computedStrokeWidth}
              fill="none"
              stroke-linecap={strokeLinecap}
            />
          {/each}
        {:else}
          <!-- Regular circle progress -->
          <!-- Trail (background circle) -->
          <circle
            class="{prefixCls}-circle-trail {classNames.trail ?? ''}"
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            r={circleRadius}
            stroke={trailColor ?? 'var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06))'}
            stroke-width={computedStrokeWidth}
            fill="none"
            stroke-dasharray="{circleCircumference - trailDashOffset} {trailDashOffset}"
            stroke-linecap={strokeLinecap}
            style="transform: rotate({rotationDegrees}deg); transform-origin: center; {styles.trail ?? ''}"
          />
          <!-- Progress circle -->
          <circle
            class="{prefixCls}-circle-path {classNames.progress ?? ''}"
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            r={circleRadius}
            stroke={computedStrokeColor}
            stroke-width={computedStrokeWidth}
            fill="none"
            stroke-dasharray={circleCircumference}
            stroke-dashoffset={dashOffset + trailDashOffset}
            stroke-linecap={strokeLinecap}
            style="transform: rotate({rotationDegrees}deg); transform-origin: center; transition: stroke-dashoffset 0.3s ease; {styles.progress ?? ''}"
          />
        {/if}
      </svg>
      
      {#if showInfo}
        <span class="{prefixCls}-text {classNames.text ?? ''}" style={styles.text ?? undefined}>
          {#if info}
            {@render info()}
          {:else if computedStatus === 'success'}
            <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
              <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.8-5.3 0-12.7-6.4-12.7z"/>
            </svg>
          {:else if computedStatus === 'exception'}
            <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/>
            </svg>
          {:else}
            {displayText}
          {/if}
        </span>
      {/if}
    </div>
  {/if}
</div>

<style>
  :global(.ant-progress) {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 1;
    box-sizing: border-box;
  }

  :global(.ant-progress-line) {
    width: 100%;
  }

  :global(.ant-progress-outer) {
    flex: 1;
    display: inline-block;
    width: 100%;
  }

  :global(.ant-progress-inner) {
    position: relative;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    vertical-align: middle;
    border-radius: 100px;
  }

  :global(.ant-progress-bg) {
    position: relative;
    transition: all 0.3s ease;
  }

  :global(.ant-progress-bg-active::before) {
    content: '';
    position: absolute;
    inset: 0;
    background: #fff;
    border-radius: inherit;
    opacity: 0;
    animation: ant-progress-active 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;
  }

  @keyframes ant-progress-active {
    0% {
      transform: translateX(-100%) scaleX(0);
      opacity: 0.1;
    }
    20% {
      transform: translateX(-100%) scaleX(0);
      opacity: 0.5;
    }
    100% {
      transform: translateX(0) scaleX(1);
      opacity: 0;
    }
  }

  :global(.ant-progress-text) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    min-width: 2em;
    color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
    font-size: 1em;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
  }

  :global(.ant-progress-status-success .ant-progress-text) {
    color: var(--ant-color-success, #52c41a);
  }

  :global(.ant-progress-status-exception .ant-progress-text) {
    color: var(--ant-color-error, #ff4d4f);
  }

  :global(.ant-progress-small .ant-progress-text) {
    font-size: 12px;
  }

  /* Circle / Dashboard */
  :global(.ant-progress-circle),
  :global(.ant-progress-dashboard) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  :global(.ant-progress-circle .ant-progress-inner),
  :global(.ant-progress-dashboard .ant-progress-inner) {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: visible;
  }

  :global(.ant-progress-circle .ant-progress-text),
  :global(.ant-progress-dashboard .ant-progress-text) {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
  }

  :global(.ant-progress-circle .ant-progress-text svg),
  :global(.ant-progress-dashboard .ant-progress-text svg) {
    width: 1.8em;
    height: 1.8em;
  }

  :global(.ant-progress-small.ant-progress-circle .ant-progress-text),
  :global(.ant-progress-small.ant-progress-dashboard .ant-progress-text) {
    font-size: 1em;
  }

  :global(.ant-progress-circle svg),
  :global(.ant-progress-dashboard svg) {
    display: block;
  }

  /* Steps */
  :global(.ant-progress-steps .ant-progress-steps-outer) {
    display: flex;
    gap: 2px;
    width: 100%;
    height: 100%;
  }

  :global(.ant-progress-steps .ant-progress-steps-item) {
    flex-shrink: 0;
    transition: background-color 0.3s;
  }
</style>

