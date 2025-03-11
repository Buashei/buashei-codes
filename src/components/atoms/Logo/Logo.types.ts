import type { ReactNode } from 'react';

interface LogoProps {
  className?: string;
}

export type TLogo = (props: LogoProps) => ReactNode;
