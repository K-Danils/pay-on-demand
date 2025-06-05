export const colors = {
  // Primary colors from logo
  primary: {
    white: '#FFFFFF',
    orange: '#FF6B35', // Action, danger, calls-to-action
    blue: '#4A90E2', // Informative text, light accents
    darkBlue: '#1E3A8A', // Titles, friendly, assertive, stable
  },

  // Text colors
  text: {
    primary: '#1A1A1A', // Very dark gray, near black
    secondary: '#4B5563', // Medium gray for secondary text
    muted: '#9CA3AF', // Light gray for muted text
    inverse: '#FFFFFF', // White text for dark backgrounds
  },

  // Semantic colors
  semantic: {
    success: '#10B981', // Green for success states
    warning: '#F59E0B', // Yellow for warnings
    error: '#EF4444', // Red for errors
    info: '#4A90E2', // Blue for informational messages
  },

  // Background colors
  background: {
    primary: '#FFFFFF', // Main background
    secondary: '#F9FAFB', // Secondary background
    tertiary: '#F3F4F6', // Tertiary background for cards, etc.
    dark: '#1F2937', // Dark background for contrast
  },

  // Border colors
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },

  // State colors
  state: {
    hover: 'rgba(74, 144, 226, 0.1)', // Light blue hover
    active: '#1E3A8A', // Dark blue active
    disabled: '#F3F4F6', // Light gray disabled
    focus: '#4A90E2', // Blue focus ring
  },
} as const;

// Export individual color groups for easier access
export const { primary, text, semantic, background, border, state } = colors;

// Tailwind color palette (flattened for tailwind.config)
export const tailwindColors = {
  'primary-white': colors.primary.white,
  'primary-orange': colors.primary.orange,
  'primary-blue': colors.primary.blue,
  'primary-dark-blue': colors.primary.darkBlue,

  'text-primary': colors.text.primary,
  'text-secondary': colors.text.secondary,
  'text-muted': colors.text.muted,
  'text-inverse': colors.text.inverse,

  'bg-primary': colors.background.primary,
  'bg-secondary': colors.background.secondary,
  'bg-tertiary': colors.background.tertiary,
  'bg-dark': colors.background.dark,

  'border-light': colors.border.light,
  'border-medium': colors.border.medium,
  'border-dark': colors.border.dark,

  success: colors.semantic.success,
  warning: colors.semantic.warning,
  error: colors.semantic.error,
  info: colors.semantic.info,
} as const;
