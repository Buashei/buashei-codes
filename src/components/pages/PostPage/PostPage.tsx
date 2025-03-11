import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

import { PostService } from '@services';

import { SEO } from '@atoms';

import type { IPost } from '@types';

const postService = PostService.getInstance();

export const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<IPost | undefined>();

  useEffect(() => {
    const loadPost = async () => {
      await postService.start();
      if (slug) {
        setPost(postService.getPostBySlug(slug));
      }
    };
    loadPost();
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-pulse bg-muted rounded-lg h-8 w-32 mx-auto mb-4"></div>
          <div className="animate-pulse bg-muted rounded-lg h-4 w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        // description={post.description}
        // image={post.image}
        article={true}
        // keywords={post.keywords}
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/blog"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to blog
        </Link>
        <article className="bg-card rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-8">
              {post.title}
            </h1>
            <div className="prose dark:prose-invert prose-primary max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};
