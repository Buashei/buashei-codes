import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Github, Twitter, Menu, X } from 'lucide-react';
import { ThemeSwitcher } from '@molecules';
import { NavLink } from '@atoms';

export const Header: React.FC = () => {
  const blogTitle = import.meta.env.VITE_BLOG_TITLE;
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
  ];

  const socialLinks = [
    { href: 'https://github.com', icon: Github, label: 'GitHub' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  ];

  return (
    <header
      className={`bg-card/80 backdrop-blur-md border-b border-border sticky top-0 left-0 right-0 z-50 md:h-auto ${isMenuOpen ? 'h-screen' : 'h-16'} overflow-hidden`}
    >
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3 z-10">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              {blogTitle}
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden text-muted-foreground hover:text-foreground z-50"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  isActive={isActive(item.path)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center space-x-4 pl-6 border-l border-border">
              <ThemeSwitcher />
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Mobile navigation */}
          <div
            className={`fixed inset-0 bg-background/95 backdrop-blur-md md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? 'opacity-100 visible'
                : 'opacity-0 invisible translate-x-full'
            }`}
          >
            <nav className="flex flex-col items-center justify-center h-full space-y-6">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  isActive={isActive(item.path)}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-medium"
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="flex items-center space-x-4 mt-8">
                <ThemeSwitcher />
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full"
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
