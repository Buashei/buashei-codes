import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

import type { TLogo } from './Logo.types';

export const Logo: TLogo = ({ className }) => {
  const blogTitle = import.meta.env.VITE_BLOG_TITLE;
  return (
    <Link
      to="/"
      className={`flex items-center space-x-3 ${className}`}
      aria-label={`${blogTitle} HomePage`}
    >
      <Code2 className="h-6 w-6 text-primary" aria-hidden="true" />
      <span className="text-xl font-bold text-foreground">{blogTitle}</span>
    </Link>
  );
};
