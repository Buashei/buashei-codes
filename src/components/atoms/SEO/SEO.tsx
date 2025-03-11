import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import type { TSEO } from './SEO.types';

export const SEO: TSEO = ({
  title,
  description,
  image,
  article = false,
  keywords = [],
  noindex = false,
  canonicalPath,
  lang = 'pl',
  children,
}) => {
  const { pathname } = useLocation();
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://buashei.github.io';

  // Default values
  const seo = {
    title: title || 'Buashei.Codes - Frontend Development Blog',
    description:
      description ||
      'Blog o programowaniu frontendowym, nowoczesnych technologiach web i dobrych praktykach w kodzie.',
    image: `${siteUrl}${image || '/images/buashei-social-card.jpg'}`,
    url: `${siteUrl}${canonicalPath || pathname}`,
  };

  // Format keywords as a string
  const keywordsString =
    keywords.length > 0
      ? keywords.join(', ')
      : 'frontend, development, react, typescript, javascript, web development';

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={seo.title}
      defaultTitle="Buashei.Codes - Frontend Development Blog"
      titleTemplate="%s | Buashei.Codes"
    >
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={keywordsString} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Additional meta tags */}
      {children}
    </Helmet>
  );
};
