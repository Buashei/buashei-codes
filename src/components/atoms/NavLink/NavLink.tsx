import type { TNavLink } from './NavLink.types';
import { Link } from 'react-router-dom';

export const NavLink: TNavLink = ({
  to,
  isActive,
  children,
  onClick,
  className = '',
}) => {
  const baseClasses = 'relative py-2 transition-colors';
  const activeClasses =
    'text-primary font-medium before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-primary';
  const inactiveClasses = 'text-muted-foreground hover:text-foreground';

  return (
    <Link
      to={to}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
