import type { ReactNode, JSX } from 'react';
import { Layout } from '@templates';

import { HomePage, BlogList, BlogPost, AboutPage } from '@pages';

type RouteConfig = {
  path: string;
  element: ReactNode;
  layout?: (children: ReactNode) => JSX.Element;
};

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <HomePage />,
    layout: (children) => <Layout>{children}</Layout>,
  },
  {
    path: '/blog',
    element: <BlogList />,
    layout: (children) => <Layout>{children}</Layout>,
  },
  {
    path: '/blog/:slug',
    element: <BlogPost />,
    layout: (children) => <Layout>{children}</Layout>,
  },
  {
    path: '/about',
    element: <AboutPage />,
    layout: (children) => <Layout>{children}</Layout>,
  },
];
