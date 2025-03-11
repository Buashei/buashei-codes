export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  metadata?: {
    [key: string]: unknown;
  };
}

export type ThemeName = 'light' | 'dark' | 'sepia';

export interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}
