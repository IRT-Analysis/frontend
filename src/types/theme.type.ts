export const ThemeValues = {
  dark: 'dark',
  light: 'light',
  system: 'system',
} as const

export type Theme = keyof typeof ThemeValues

export type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}
