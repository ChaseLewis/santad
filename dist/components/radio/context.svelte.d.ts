import type { RadioChangeEvent } from './types';
export interface RadioGroupContextValue {
    name?: string;
    value?: string | number;
    disabled?: boolean;
    onChange?: (event: RadioChangeEvent) => void;
}
export declare function setRadioGroupContext(value: RadioGroupContextValue): void;
export declare function getRadioGroupContext(): RadioGroupContextValue | undefined;
