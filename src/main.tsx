import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import { PostService } from '@services';
import { PostListPage, PostPage, HomePage, AboutPage } from '@pages';
import { ThemeProvider } from '@context';
import { Layout } from '@templates';

const postService = PostService.getInstance();
postService.start();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout component={<HomePage />} />}
          />
          <Route
            path="/blog"
            element={<Layout variant="grow" component={<PostListPage  />} />}
          />
          <Route
            path="/blog/:slug"
            element={<Layout component={<PostPage />} />}
          />
          <Route
            path="/about"
            element={<Layout component={<AboutPage />} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);

