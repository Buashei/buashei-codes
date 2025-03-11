import React from 'react';
import { Github, Mail, Twitter } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-card rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4"
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover"
            />
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                John Doe
              </h1>
              <h2 className="text-xl text-primary mb-6">
                Senior Frontend Developer
              </h2>
              <p className="text-muted-foreground mb-6">
                With over 8 years of experience in frontend development, I
                specialize in creating performant and accessible web
                applications. I'm passionate about sharing knowledge and helping
                others grow in their development journey.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5 mr-2" />
                  Twitter
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Skills & Expertise
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'React',
                'TypeScript',
                'Next.js',
                'TailwindCSS',
                'Node.js',
                'GraphQL',
              ].map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-center"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
