import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight, Calendar } from 'lucide-react';
import type { TPostCard } from './PostCard.types';

export const PostCard: TPostCard = ({ post }) => {
  return (
    <article className="bg-card rounded-xl shadow-md dark:shadow-accent overflow-hidden hover:shadow-lg transition-all group">
      <div className="p-6">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <time dateTime={post.date}>
            {format(new Date(post.date), 'MMMM d, yyyy')}
          </time>
        </div>
        <Link to={`/blog/${post.slug}`} className="block">
          <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center text-primary font-medium">
            Read more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </article>
  );
};
