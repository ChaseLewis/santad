import { getContext, setContext } from 'svelte';
const RADIO_GROUP_CONTEXT_KEY = Symbol('radio-group-context');
export function setRadioGroupContext(value) {
    setContext(RADIO_GROUP_CONTEXT_KEY, value);
}
export function getRadioGroupContext() {
    return getContext(RADIO_GROUP_CONTEXT_KEY);
}
