import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';

import { useTheme } from '@context';
import { ThemeButton } from '@atoms';

import type { ThemeName } from '@types';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themeOptions: Array<{
    theme: ThemeName;
    icon: typeof Sun;
    label: string;
  }> = [
    { theme: 'light', icon: Sun, label: 'Light theme' },
    { theme: 'dark', icon: Moon, label: 'Dark theme' },
    { theme: 'sepia', icon: Palette, label: 'Sepia theme' },
  ];

  return (
    <div className="bg-secondary rounded-full p-1 flex space-x-1">
      {themeOptions.map((option) => (
        <ThemeButton
          key={option.theme}
          theme={option.theme}
          icon={option.icon}
          currentTheme={theme}
          onClick={() => setTheme(option.theme)}
          label={option.label}
        />
      ))}
    </div>
  );
};
