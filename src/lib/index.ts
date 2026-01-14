/**
 * Santad - Svelte Ant Design
 * A Svelte 5 component library inspired by Ant Design
 */

// Theme
export {
  seedTokens,
  defaultPresetColors,
  createDefaultTheme,
  setThemeContext,
  getThemeContext,
  themeToCSSVars,
  applyCSSVars,
} from './theme';
export type {
  SeedTokens,
  PresetColorKey,
  ThemeMode,
  ThemeConfig,
  ResolvedTheme,
  SizeType,
  DirectionType,
  ComponentsConfig,
  ButtonComponentToken,
  FlexComponentToken,
} from './theme';

// Config
export {
  ConfigProvider,
  defaultConfig,
  getConfigContext,
  setConfigContext,
  createGetPrefixCls,
} from './config';
export type { ConfigProviderProps, ResolvedConfig } from './config';

// Components - Button
export { Button, ButtonGroup } from './components/button';
export type {
  ButtonProps,
  ButtonGroupProps,
  ButtonType,
  ButtonShape,
  ButtonHTMLType,
  ButtonVariant,
  ButtonColor,
  IconPlacement,
  LoadingConfig,
  ButtonClassNames,
  ButtonStyles,
} from './components/button';
export {
  ButtonTypes,
  ButtonShapes,
  ButtonHTMLTypes,
  ButtonVariants,
  ButtonColors,
  getColorVariantFromType,
} from './components/button';

// Components - Flex
export { Flex } from './components/flex';
export type {
  FlexProps,
  FlexWrap,
  FlexJustify,
  FlexAlign,
  GapSize,
  FlexClassNames,
  FlexStyles,
} from './components/flex';
export { GapSizes, isPresetGap, getGapValue } from './components/flex';

// Components - Card
export { Card } from './components/card';
export type {
  CardProps,
  CardSize,
  CardVariant,
  CardClassNames,
  CardStyles,
} from './components/card';

// Components - Checkbox
export { Checkbox } from './components/checkbox';
export type {
  CheckboxProps,
  CheckboxClassNames,
  CheckboxStyles,
  CheckboxChangeEvent,
  CheckboxGroupProps,
  CheckboxOption,
} from './components/checkbox';

// Components - Switch
export { Switch } from './components/switch';
export type {
  SwitchProps,
  SwitchSize,
  SwitchClassNames,
  SwitchStyles,
} from './components/switch';

// Components - Radio
export { Radio, RadioGroup } from './components/radio';
export type {
  RadioProps,
  RadioClassNames,
  RadioStyles,
  RadioChangeEvent,
  RadioGroupProps,
  RadioOption,
  RadioButtonStyle,
  RadioOptionType,
} from './components/radio';

// Components - Input
export { Input, Password, TextArea, Search } from './components/input';
export type {
  InputProps,
  InputClassNames,
  InputStyles,
  InputStatus,
  InputVariant,
  PasswordProps,
  PasswordClassNames,
  PasswordStyles,
  PasswordVisibilityToggle,
  TextAreaProps,
  TextAreaClassNames,
  TextAreaStyles,
  TextAreaAutoSize,
  SearchProps,
  SearchClassNames,
  SearchStyles,
} from './components/input';

// Components - Tabs
export { Tabs, TabPane } from './components/tabs';
export type {
  TabsProps,
  TabPaneProps,
  TabsType,
  TabPosition,
  TabPlacement,
  TabsClassNames,
  TabsStyles,
} from './components/tabs';

// Components - Tag
export { Tag, CheckableTag } from './components/tag';
export type {
  TagProps,
  TagClassNames,
  TagStyles,
  TagVariant,
  PresetColorKey,
  PresetStatusColorType,
  CheckableTagProps,
} from './components/tag';
export {
  PresetColors,
  PresetStatusColors,
  TagVariants,
  isPresetColor,
  isPresetStatusColor,
} from './components/tag';

// Components - Typography
export { Text, Title, Paragraph, Link } from './components/typography';
export type {
  TextProps,
  TitleProps,
  ParagraphProps,
  LinkProps,
  TextType,
  TitleLevel,
  BaseTypographyProps,
} from './components/typography';
export {
  TextTypes,
  TitleLevels,
} from './components/typography';

// Semantic Styling Utilities (Ant Design 6.0 style)
export type { SemanticClassNames, SemanticStyles } from './utils/semantic';
export { combineClasses, getSemanticStyle } from './utils/semantic';

// Wave Animation Utility
export { wave, Wave } from './utils/wave';
export type { WaveOptions } from './utils/wave';

// Components - VirtualList
export { VirtualList } from './components/virtual-list';
export type {
  VirtualListProps,
  VirtualListItemContext,
  VirtualListClassNames,
  VirtualListStyles,
  VirtualListScrollInfo,
} from './components/virtual-list';

// Components - VirtualGrid
export { VirtualGrid } from './components/virtual-grid';
export type {
  VirtualGridProps,
  VirtualGridCellContext,
  VirtualGridClassNames,
  VirtualGridStyles,
  VirtualGridScrollInfo,
} from './components/virtual-grid';

// Components - Icon
export {
  Icon,
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  EditOutlined,
  EnterOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  LoadingOutlined,
  SearchOutlined,
} from './components/icon';
export type {
  IconProps,
  CustomIconProps,
  IconTheme,
  IconDefinition,
  IconClassNames,
  IconStyles,
} from './components/icon';

// Components - Slider
export { Slider } from './components/slider';
export type {
  SliderProps,
  SliderMark,
  SliderMarks,
  SliderTooltipConfig,
  SliderRangeConfig,
  SliderClassNames,
  SliderStyles,
} from './components/slider';

// Components - AutoComplete
export { AutoComplete } from './components/auto-complete';
export type {
  AutoCompleteProps,
  AutoCompleteOption,
  AutoCompleteOptionGroup,
  AutoCompleteOptions,
  AutoCompleteSize,
  AutoCompleteStatus,
  AutoCompleteFilterOption,
  AutoCompleteClassNames,
  AutoCompleteStyles,
} from './components/auto-complete';

// Components - Progress
export { Progress } from './components/progress';
export type {
  ProgressProps,
  ProgressType,
  ProgressStatus,
  ProgressSize,
  ProgressStrokeLinecap,
} from './components/progress';

