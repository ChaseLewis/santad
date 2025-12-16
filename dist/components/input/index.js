// Input components
import Input from './Input.svelte';
import Password from './Password.svelte';
import TextArea from './TextArea.svelte';
import Search from './Search.svelte';
// Export components
export { Input, Password, TextArea, Search };
// Default export with sub-components attached
export default Object.assign(Input, {
    Password,
    TextArea,
    Search,
});
