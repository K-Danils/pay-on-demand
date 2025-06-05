import type { ThemeConfig } from 'antd';
import { colors } from './colors';

export const antdTheme: ThemeConfig = {
  token: {
    // Primary brand colors
    colorPrimary: colors.primary.darkBlue,
    colorPrimaryHover: colors.primary.blue,
    colorPrimaryActive: colors.primary.darkBlue,

    // Success/Error/Warning colors
    colorSuccess: colors.semantic.success,
    colorWarning: colors.semantic.warning,
    colorError: colors.semantic.error,
    colorInfo: colors.semantic.info,

    // Text colors
    colorText: colors.text.primary,
    colorTextSecondary: colors.text.secondary,
    colorTextTertiary: colors.text.muted,
    colorTextQuaternary: colors.text.muted,

    // Background colors
    colorBgContainer: colors.background.primary,
    colorBgElevated: colors.background.primary,
    colorBgLayout: colors.background.secondary,
    colorBgSpotlight: colors.background.tertiary,

    // Border colors
    colorBorder: colors.border.light,
    colorBorderSecondary: colors.border.medium,

    // Border radius for modern look
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    borderRadiusXS: 4,

    // Font settings
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 18,
    fontSizeHeading5: 16,

    // Line height for better readability
    lineHeight: 1.5,
    lineHeightHeading1: 1.2,
    lineHeightHeading2: 1.3,
    lineHeightHeading3: 1.4,

    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,
    paddingXXS: 4,

    margin: 16,
    marginLG: 24,
    marginSM: 12,
    marginXS: 8,
    marginXXS: 4,

    // Shadows for depth
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    boxShadowSecondary: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    boxShadowTertiary: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

    // Control heights
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 32,
    controlHeightXS: 28,
  },
  components: {
    // Button customizations
    Button: {
      colorPrimary: colors.primary.darkBlue,
      colorPrimaryHover: colors.primary.blue,
      colorPrimaryActive: colors.primary.darkBlue,
      primaryShadow: `0 2px 4px ${colors.primary.darkBlue}20`,
      defaultShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      dangerShadow: `0 2px 4px ${colors.primary.orange}20`,
      fontWeight: 500,
    },

    // Card customizations for dashboard
    Card: {
      colorBgContainer: colors.background.primary,
      boxShadowTertiary: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      headerBg: colors.background.primary,
      headerHeight: 56,
      headerHeightSM: 48,
    },

    // Table customizations
    Table: {
      colorBgContainer: colors.background.primary,
      headerBg: colors.background.secondary,
      headerColor: colors.text.primary,
      rowHoverBg: colors.state.hover,
    },

    // Form customizations
    Input: {
      activeBorderColor: colors.primary.darkBlue,
      hoverBorderColor: colors.primary.blue,
    },

    // Select customizations
    Select: {
      colorPrimary: colors.primary.darkBlue,
      colorPrimaryHover: colors.primary.blue,
    },

    // Layout customizations
    Layout: {
      bodyBg: colors.background.secondary,
      headerBg: colors.background.primary,
      siderBg: colors.background.primary,
      footerBg: colors.background.primary,
    },

    // Menu customizations
    Menu: {
      colorBgContainer: colors.background.primary,
      colorItemText: colors.text.primary,
      colorItemTextSelected: colors.primary.darkBlue,
      colorItemBgSelected: `${colors.primary.darkBlue}10`,
      colorItemTextHover: colors.primary.darkBlue,
      colorItemBgHover: colors.state.hover,
    },

    // Typography customizations
    Typography: {
      titleMarginBottom: 16,
      titleMarginTop: 0,
      colorText: colors.text.primary,
      colorTextHeading: colors.primary.darkBlue,
      colorTextDescription: colors.text.secondary,
    },

    // Notification/Alert customizations
    Alert: {
      colorText: colors.text.primary,
      colorTextHeading: colors.text.primary,
    },

    // Modal customizations
    Modal: {
      contentBg: colors.background.primary,
      headerBg: colors.background.primary,
    },

    // Tag customizations
    Tag: {
      colorBorder: colors.border.light,
      colorText: colors.text.primary,
    },
  },
  algorithm: undefined, // Using default algorithm for clean look
};

export default antdTheme;
