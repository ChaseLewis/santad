/**
 * Button types matching Ant Design
 */
export const ButtonTypes = ['default', 'primary', 'dashed', 'link', 'text'];
/**
 * Button shapes
 */
export const ButtonShapes = ['default', 'circle', 'round'];
/**
 * Button HTML types
 */
export const ButtonHTMLTypes = ['submit', 'button', 'reset'];
/**
 * Button variant types (new API)
 */
export const ButtonVariants = ['outlined', 'dashed', 'solid', 'filled', 'text', 'link'];
/**
 * Button color types
 */
export const ButtonColors = ['default', 'primary', 'danger'];
/**
 * Maps legacy button types to color/variant pairs
 */
export function getColorVariantFromType(type, danger) {
    const typeMap = {
        default: ['default', 'outlined'],
        primary: ['primary', 'solid'],
        dashed: ['default', 'dashed'],
        link: ['primary', 'link'],
        text: ['default', 'text'],
    };
    if (type && type in typeMap) {
        const [color, variant] = typeMap[type];
        return [danger ? 'danger' : color, variant];
    }
    return [danger ? 'danger' : undefined, undefined];
}
