
import { BlogPost } from "@/lib/types";
import { blogPosts } from "@/data/blogPosts";

// Helper function to load all markdown files from content/blog directory
async function loadMarkdownFiles() {
  try {
    // In a browser environment, use dynamic imports to load markdown files
    const modules = import.meta.glob('/src/content/blog/*.md', { eager: true });
    const posts: BlogPost[] = Object.entries(modules).map(([path, module]: [string, any]) => {
      const { attributes, default: content } = module;
      
      // Extract slug from the file path
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      // Create a blog post object
      return {
        id: attributes.id || slug,
        title: attributes.title || 'Untitled',
        slug: attributes.slug || slug,
        date: attributes.date || new Date().toISOString(),
        author: attributes.author || 'Unknown',
        excerpt: attributes.excerpt || '',
        content: content || '',
        tags: attributes.tags || []
      };
    });

    return posts;
  } catch (error) {
    console.error("Error loading markdown files:", error);
    // Fallback to static data
    return blogPosts;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const markdownPosts = await loadMarkdownFiles();
    return [...markdownPosts, ...blogPosts];
  } catch (error) {
    console.error("Error loading blog posts:", error);
    // Return the fallback static data if imports fail
    return blogPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.slug === slug);
  } catch (error) {
    console.error(`Error finding post with slug ${slug}:`, error);
    // Try fallback to static data
    return blogPosts.find(post => post.slug === slug);
  }
}

export async function getRecentPosts(count: number = 3): Promise<BlogPost[]> {
  try {
    const posts = await getAllPosts();
    // Sort by date, newest first
    return posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  } catch (error) {
    console.error("Error getting recent posts:", error);
    // Return the first 'count' posts from static data
    return blogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  }
}
