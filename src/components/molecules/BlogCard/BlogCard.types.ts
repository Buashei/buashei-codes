import type { ReactNode } from 'react';
import type { Post } from '@types';

interface BlogCardProps {
  post: Post;
}

export type TBlogCard = (props: BlogCardProps) => ReactNode;
