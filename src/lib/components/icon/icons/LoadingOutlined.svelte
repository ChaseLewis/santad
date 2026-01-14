<script lang="ts" module>
  import type { IconProps } from '../types';

  export type { IconProps };
</script>

<script lang="ts">
  import Icon from '../Icon.svelte';
  import type { IconProps as Props } from '../types';

  let { spin = true, ...props }: Props = $props();
</script>

<Icon aria-label="loading" {spin} {...props}>
  <svg viewBox="0 0 50 50" width="1em" height="1em" aria-hidden="true" focusable="false">
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="currentColor"
      stroke-width="4"
      stroke-linecap="square"
      stroke-dasharray="80 150"
      stroke-dashoffset="0"
    />
  </svg>
</Icon>

