import React from 'react';
import type { LucideIcon } from 'lucide-react';

import type { TThemeButton } from './ThemeButton.types';

export const ThemeButton: TThemeButton = ({
  icon: Icon,
  theme,
  currentTheme,
  onClick,
  label,
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-all ${
        currentTheme === theme
          ? 'bg-primary text-primary-foreground shadow-xs'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary-foreground/10'
      }`}
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
};
