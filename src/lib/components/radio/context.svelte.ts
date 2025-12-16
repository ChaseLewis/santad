import { getContext, setContext } from 'svelte';
import type { RadioChangeEvent } from './types';

const RADIO_GROUP_CONTEXT_KEY = Symbol('radio-group-context');

export interface RadioGroupContextValue {
  name?: string;
  value?: string | number;
  disabled?: boolean;
  onChange?: (event: RadioChangeEvent) => void;
}

export function setRadioGroupContext(value: RadioGroupContextValue) {
  setContext(RADIO_GROUP_CONTEXT_KEY, value);
}

export function getRadioGroupContext(): RadioGroupContextValue | undefined {
  return getContext<RadioGroupContextValue | undefined>(RADIO_GROUP_CONTEXT_KEY);
}

