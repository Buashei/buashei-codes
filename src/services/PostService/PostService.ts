import type { IPost } from '@types';

type FrontMatterData = Record<string, string | string[] | number | boolean>;

export class PostService {
  private static instance: PostService;
  private posts: Map<string, IPost> = new Map();
  private postsLoaded = false;
  private postsPerPage = 10;

  private constructor() {}

  public static getInstance(): PostService {
    if (!PostService.instance) {
      PostService.instance = new PostService();
    }
    return PostService.instance;
  }

  // Parse frontmatter from markdown content
  private parseFrontMatter(content: string): {
    frontMatter: FrontMatterData | null;
    content: string;
  } {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n/;
    const match = content.match(frontMatterRegex);

    if (!match) {
      return { frontMatter: null, content };
    }

    const frontMatterText = match[1];
    const mainContent = content.slice(match[0].length);
    const frontMatter: FrontMatterData = {};

    const lines = frontMatterText.split('\n');
    for (const line of lines) {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const value = valueParts.join(':').trim();

        // Handle arrays in frontmatter
        if (value.startsWith('[') && value.endsWith(']')) {
          frontMatter[key.trim()] = value
            .slice(1, -1)
            .split(',')
            .map((item) => item.trim());
        } else {
          frontMatter[key.trim()] = value;
        }
      }
    }

    return { frontMatter, content: mainContent };
  }

  private parseToSlug(id: string) {
    return id.replace(/ /g, '-').toLowerCase();
  }

  // Parse markdown content into a structured Post object
  private parseMarkdownToPost(filename: string, markdown: string): IPost {
    try {
      // Extract frontmatter and content
      const { frontMatter, content } = this.parseFrontMatter(markdown);

      if (frontMatter) {
        // Extract data from frontmatter or use defaults
        const id = (frontMatter.id as string) || filename.replace('.md', '');
        const slug = (frontMatter.slug as string) || this.parseToSlug(id);
        const title = (frontMatter.title as string) || 'Untitled';
        const excerpt =
          (frontMatter.excerpt as string) || content.substring(0, 100) + '...';
        const date = frontMatter.date
          ? new Date(frontMatter.date as string).toISOString()
          : new Date().toISOString();

        return {
          id,
          slug,
          title,
          content,
          excerpt,
          date,
        };
      }

      throw new Error('No frontmatter found');
    } catch (error) {
      console.error(`Error parsing content for ${filename}:`, error);
      throw new Error('Failed to parse post');
    }
  }

  /**
   * Initializes the blog service by loading posts
   */
  public async start(): Promise<void> {
    if (!this.postsLoaded) {
      await this.loadPosts();
      this.postsLoaded = true;
    }
  }

  /**
   * Loads all blog posts from the specified directory
   * @private
   */
  private async loadPosts(): Promise<void> {
    try {
      // Updated to use new import.meta.glob syntax
      const imports = import.meta.glob(
        '/src/posts/*.md',
        // '/buashei_nexus/01 - Blog Posts/01 - Published/*.md',
        {
          query: '?raw',
          import: 'default',
          eager: true,
        },
      );

      // Process each post
      for (const path in imports) {
        try {
          const filename = path.split('/').pop() || '';
          // Skip files that start with a dot or are in subdirectories with a dot
          if (path.includes('/.')) continue;

          const content = imports[path] as string;
          const post = this.parseMarkdownToPost(filename, content);
          this.posts.set(post.slug, post);
        } catch (error) {
          console.error(`Error processing post at ${path}:`, error);
        }
      }
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      // Fallback method if the first approach fails
      this.loadPostsFallback();
    }
  }

  /**
   * Fallback method for loading posts if the primary method fails
   * @private
   */
  private async loadPostsFallback(): Promise<void> {
    try {
      // Create some sample posts for development/testing
      const dummyPost: IPost = {
        id: 'sample-post',
        slug: 'sample-post',
        title: 'Sample Post',
        content:
          '## This is a sample post\n\nThis is created when actual posts cannot be loaded.',
        excerpt:
          'This is a sample post created when actual posts cannot be loaded.',
        date: new Date().toISOString(),
      };

      this.posts.set(dummyPost.slug, dummyPost);
      console.log('Created fallback sample post');
    } catch (error) {
      console.error('Failed to create fallback posts:', error);
    }
  }

  /**
   * Gets blog posts with pagination
   * @param page - The page number (starting from 1)
   * @returns Array of posts for the requested page
   */
  public getPosts(page = 1): IPost[] {
    // Ensure posts are loaded
    if (!this.postsLoaded) {
      this.start();
    }

    // Get all posts as an array
    const allPosts = Array.from(this.posts.values());

    // Sort posts by date (newest first)
    const sortedPosts = allPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    // Calculate pagination
    const startIndex = (page - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;

    // Return the paginated subset
    return sortedPosts.slice(startIndex, endIndex);
  }

  /**
   * Gets a specific post by its slug
   * @param slug - The post slug to find
   * @returns The post if found, undefined otherwise
   */
  public getPostBySlug(slug: string): IPost | undefined {
    // Ensure posts are loaded
    if (!this.postsLoaded) {
      this.start();
    }

    return this.posts.get(slug);
  }
}
