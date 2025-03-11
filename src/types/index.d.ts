declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*/buashei_nexus/**/*.md' {
  const content: string;
  export default content;
}

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
