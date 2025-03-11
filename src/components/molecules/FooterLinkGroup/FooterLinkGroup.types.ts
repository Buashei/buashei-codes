import type { ReactNode } from 'react';

interface FooterLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface FooterLinkGroupProps {
  title: string;
  links: FooterLink[];
}

export type TFooterLinkGroup = (props: FooterLinkGroupProps) => ReactNode;
