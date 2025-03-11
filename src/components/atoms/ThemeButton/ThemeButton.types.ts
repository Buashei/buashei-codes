import type { ReactNode } from 'react';
import type { ThemeName } from '@types';
import type { LucideIcon } from 'lucide-react';

interface ThemeButtonProps {
  icon: LucideIcon;
  theme: ThemeName;
  currentTheme: ThemeName;
  onClick: () => void;
  label: string;
}

export type TThemeButton = (props: ThemeButtonProps) => ReactNode;
