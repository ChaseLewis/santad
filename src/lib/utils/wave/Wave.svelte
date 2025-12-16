<!--
  Wave wrapper component
  Alternative to the wave action for cases where you need a wrapper component
  
  Usage:
  <Wave>
    <button>Click me</button>
  </Wave>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { wave, type WaveOptions } from './wave';

  interface Props extends WaveOptions {
    children: Snippet;
    /** Element type for the wrapper (default: span) */
    as?: 'span' | 'div';
  }

  let {
    children,
    as = 'span',
    disabled = false,
    color,
    duration = 400,
  }: Props = $props();

  const waveOptions = $derived({ disabled, color, duration });
</script>

{#if as === 'div'}
  <div use:wave={waveOptions} class="ant-wave-wrapper">
    {@render children()}
  </div>
{:else}
  <span use:wave={waveOptions} class="ant-wave-wrapper">
    {@render children()}
  </span>
{/if}

<style>
  .ant-wave-wrapper {
    display: inline-block;
    position: relative;
  }
</style>

