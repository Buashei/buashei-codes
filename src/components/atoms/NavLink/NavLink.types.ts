import type { ReactNode } from 'react';

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export type TNavLink = (props: NavLinkProps) => ReactNode;
