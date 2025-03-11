import type { ReactNode } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  keywords?: string[];
  noindex?: boolean;
  canonicalPath?: string;
  lang?: string;
  children?: React.ReactNode;
}

export type TSEO = (props: SEOProps) => ReactNode;
