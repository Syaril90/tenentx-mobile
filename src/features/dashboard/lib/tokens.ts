export const ds = {
  color: {
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0D141C',
    textSubtle: '#64748B', 
    link: '#0E74F1',
    tile: '#E6F2FF',
    label: '#496F9C',
  },
  radius: {
    md: 16,
    lg: 20,
  },
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
  },
} as const;

export const shadowSoft = {
  elevation: 3,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },
} as const;
