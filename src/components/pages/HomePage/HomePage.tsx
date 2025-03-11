import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Layout as LayoutIcon, Terminal } from 'lucide-react';
import { FeatureCard } from '@molecules';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Tips and tricks for writing maintainable and scalable code',
    },
    {
      icon: LayoutIcon,
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user interfaces',
    },
    {
      icon: Terminal,
      title: 'Dev Tools',
      description: 'Modern development tools and workflow optimization',
    },
  ];

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Frontend Development
            <span className="bg-linear-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              {' '}
              Insights & Tutorials
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Exploring modern web development, best practices, and innovative
            solutions
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Read the Blog
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
