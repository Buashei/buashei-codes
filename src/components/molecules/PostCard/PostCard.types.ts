import type { ReactNode } from 'react';
import type { IPost } from '@types';

interface PostCardProps {
  post: IPost;
}

export type TPostCard = (props: PostCardProps) => ReactNode;
