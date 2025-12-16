// Input components
import Input from './Input.svelte';
import Password from './Password.svelte';
import TextArea from './TextArea.svelte';
import Search from './Search.svelte';

// Re-export types
export type {
  InputProps,
  InputClassNames,
  InputStyles,
  InputStatus,
  InputVariant,
} from './types';

export type {
  PasswordProps,
  PasswordClassNames,
  PasswordStyles,
  PasswordVisibilityToggle,
} from './types';

export type {
  TextAreaProps,
  TextAreaClassNames,
  TextAreaStyles,
  TextAreaAutoSize,
} from './types';

export type {
  SearchProps,
  SearchClassNames,
  SearchStyles,
} from './types';

// Export components
export { Input, Password, TextArea, Search };

// Default export with sub-components attached
export default Object.assign(Input, {
  Password,
  TextArea,
  Search,
});

