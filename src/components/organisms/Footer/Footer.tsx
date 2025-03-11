import React from 'react';
import { Heart } from 'lucide-react';
import { FooterLinkGroup } from '@molecules';
import { Logo } from '@atoms';
import { footerLinks } from '@config/footerLinks';

export const Footer: React.FC = () => {
  const blogAuthor = import.meta.env.VITE_BLOG_AUTHOR;
  const currentYear = new Date().getFullYear();
  const { quickLinks, connectLinks } = footerLinks;

  return (
    <footer
      className="bg-card border-t border-border"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-muted-foreground">
              Exploring the frontiers of web development with practical insights
              and tutorials.
            </p>
          </div>

          <FooterLinkGroup title="Quick Links" links={quickLinks} />
          <FooterLinkGroup title="Connect" links={connectLinks} />
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {blogAuthor}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center mt-4 md:mt-0">
            Made with
            <Heart className="h-4 w-4 text-red-500 mx-1" aria-hidden="true" />
            <span className="sr-only">love</span>
            by {blogAuthor}
          </p>
        </div>
      </div>
    </footer>
  );
};
