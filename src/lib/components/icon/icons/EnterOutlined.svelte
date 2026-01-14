<script lang="ts" module>
  import type { IconProps } from '../types';

  export type { IconProps };
</script>

<script lang="ts">
  import Icon from '../Icon.svelte';
  import type { IconProps as Props } from '../types';

  let { ...props }: Props = $props();
</script>

<Icon aria-label="enter" {...props}>
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M864 170h-60c-4.4 0-8 3.6-8 8v232H212V179c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v570c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V610h584v239c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V178c0-4.4-3.6-8-8-8zM212 450h200v-76H212v76zm584 0v-76H442v76h354z"/>
  </svg>
</Icon>

