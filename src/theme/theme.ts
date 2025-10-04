import { MD3LightTheme, MD3Theme } from 'react-native-paper';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
} as const;

declare global {
  // Augment Paper theme to include our tokens
  namespace ReactNativePaper {
    interface Theme {
      spacing: typeof spacing;
      radius: typeof radius;
    }
  }
}

export const appTheme: MD3Theme & {
  spacing: typeof spacing;
  radius: typeof radius;
} = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0e74f1',
    secondary: '#496f9c',
    background: '#f8fafc',
    surface: '#ffffff',
    onSurfaceVariant: '#64748b', 
  },
  spacing,
  radius,
};
