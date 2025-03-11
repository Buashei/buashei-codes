import type { TSocialIcon } from './SocialIcon.types';
import type { LucideIcon } from 'lucide-react';

export const SocialIcon: TSocialIcon = ({ href, icon: Icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-primary transition-colors"
      aria-label={label}
    >
      <Icon className="h-5 w-5 mr-2" />
      {label && <span>{label}</span>}
    </a>
  );
};
