import type { ReactNode } from 'react';

interface SocialIconProps {
  href: string;
  icon: LucideIcon;
  label?: string;
}

export type TSocialIcon = (props: SocialIconProps) => ReactNode;
