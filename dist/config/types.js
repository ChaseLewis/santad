export const defaultConfig = {
    prefixCls: 'ant',
    iconPrefixCls: 'anticon',
    size: 'middle',
    direction: 'ltr',
    disabled: false,
    autoInsertSpaceInButton: true,
    cssVarPrefix: 'ant',
    getPrefixCls: (suffixCls, customizePrefixCls) => {
        if (customizePrefixCls)
            return customizePrefixCls;
        return suffixCls ? `ant-${suffixCls}` : 'ant';
    },
};
