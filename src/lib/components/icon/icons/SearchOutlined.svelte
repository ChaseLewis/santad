<script lang="ts" module>
  import type { IconProps } from '../types';

  export type { IconProps };
</script>

<script lang="ts">
  import Icon from '../Icon.svelte';
  import type { IconProps as Props } from '../types';

  let { ...props }: Props = $props();
</script>

<Icon aria-label="search" {...props}>
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 714 479 714 410c0-195.3-158.7-354-354-354S6 214.7 6 410s158.7 354 354 354c69 0 133.3-19.8 187.8-53.9l259.7 259.7a8.2 8.2 0 0011.6 0l84.2-84.2c3.3-3.2 3.3-8.5.3-11.6zM360 660c-137 0-250-113-250-250s113-250 250-250 250 113 250 250-113 250-250 250z"/>
  </svg>
</Icon>

