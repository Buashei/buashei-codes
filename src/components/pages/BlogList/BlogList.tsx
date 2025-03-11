import React, { useEffect, useState } from 'react';

import { BlogService } from '@services';

import { BlogCard } from '@molecules';

import type { Post } from '@types';

export const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const blogService = BlogService.getInstance();

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      await blogService.start();
      setPosts(blogService.getPosts(1));
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-card/50 h-40 w-72 md:w-96 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
};
