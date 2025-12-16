import type { SeedTokens, PresetColorKey } from './tokens';

/** Theme mode that can be configured - includes 'system' for OS preference */
export type ThemeMode = 'light' | 'dark' | 'system';

/** Resolved theme mode after 'system' is evaluated */
export type ResolvedThemeMode = 'light' | 'dark';

export type SizeType = 'small' | 'middle' | 'large';

export type DirectionType = 'ltr' | 'rtl';

/**
 * Theme configuration that users can provide
 */
export interface ThemeConfig {
  /** Light or dark mode */
  mode?: ThemeMode;
  /** Override seed tokens */
  token?: Partial<SeedTokens>;
  /** Enable CSS variables mode */
  cssVar?: boolean | { prefix?: string };
  /** Component-specific token overrides */
  components?: ComponentsConfig;
}

export interface ComponentsConfig {
  Button?: Partial<ButtonComponentToken>;
  Flex?: Partial<FlexComponentToken>;
}

/**
 * Button-specific design tokens
 */
export interface ButtonComponentToken {
  fontWeight: number;
  defaultBg: string;
  defaultColor: string;
  defaultBorderColor: string;
  defaultHoverBg: string;
  defaultHoverColor: string;
  defaultHoverBorderColor: string;
  defaultActiveBg: string;
  defaultActiveColor: string;
  defaultActiveBorderColor: string;
  primaryColor: string;
  dangerColor: string;
  borderColorDisabled: string;
  colorDisabled: string;
  bgDisabled: string;
  paddingInline: number;
  paddingInlineLG: number;
  paddingInlineSM: number;
  paddingBlock: number;
  paddingBlockLG: number;
  paddingBlockSM: number;
  onlyIconSize: number;
  onlyIconSizeLG: number;
  onlyIconSizeSM: number;
  groupBorderColor: string;
  contentFontSize: number;
  contentFontSizeLG: number;
  contentFontSizeSM: number;
  contentLineHeight: number;
  contentLineHeightLG: number;
  contentLineHeightSM: number;
}

/**
 * Flex-specific design tokens
 */
export interface FlexComponentToken {
  // No additional tokens needed for Flex
}

/**
 * Resolved theme with all derived tokens computed
 */
export interface ResolvedTheme extends SeedTokens {
  mode: ResolvedThemeMode;

  // Derived color tokens
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  colorPrimaryBg: string;
  colorPrimaryBgHover: string;
  colorPrimaryBorder: string;
  colorPrimaryBorderHover: string;
  colorPrimaryText: string;
  colorPrimaryTextHover: string;
  colorPrimaryTextActive: string;

  colorSuccessHover: string;
  colorSuccessActive: string;
  colorSuccessBg: string;
  colorSuccessBorder: string;

  colorWarningHover: string;
  colorWarningActive: string;
  colorWarningBg: string;
  colorWarningBorder: string;

  colorErrorHover: string;
  colorErrorActive: string;
  colorErrorBg: string;
  colorErrorBorder: string;

  // Background colors
  colorBgContainer: string;
  colorBgElevated: string;
  colorBgLayout: string;
  colorBgSpotlight: string;
  colorBgMask: string;

  // Border colors
  colorBorder: string;
  colorBorderSecondary: string;

  // Text colors
  colorText: string;
  colorTextSecondary: string;
  colorTextTertiary: string;
  colorTextQuaternary: string;
  colorTextDisabled: string;
  colorTextPlaceholder: string;
  colorTextHeading: string;
  colorTextLabel: string;
  colorTextDescription: string;
  colorTextLightSolid: string;

  // Fill colors
  colorFill: string;
  colorFillSecondary: string;
  colorFillTertiary: string;
  colorFillQuaternary: string;

  // Split color (dividers)
  colorSplit: string;

  // Icon color
  colorIcon: string;
  colorIconHover: string;

  // Control colors
  colorBgContainerDisabled: string;
  colorBorderBg: string;

  // Link
  colorLinkHover: string;
  colorLinkActive: string;
}

export type { SeedTokens, PresetColorKey };

