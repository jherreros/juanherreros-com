
import { BlogPost } from "@/lib/types";
import { blogPosts } from "@/data/blogPosts";

// Helper function to load all markdown files from content/blog directory
async function loadMarkdownFiles() {
  try {
    console.log("Attempting to load markdown files...");
    // Use dynamic imports with a different approach
    const modules = import.meta.glob('/src/content/blog/*.md', { eager: true });
    console.log("Markdown modules:", Object.keys(modules));
    
    const posts: BlogPost[] = Object.entries(modules).map(([path, module]: [string, any]) => {
      console.log("Processing markdown file:", path, module);
      const { attributes, html } = module;
      
      // Extract slug from the file path
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      // Create a blog post object
      return {
        id: attributes?.id || slug,
        title: attributes?.title || 'Untitled',
        slug: attributes?.slug || slug,
        date: attributes?.date || new Date().toISOString(),
        author: attributes?.author || 'Unknown',
        excerpt: attributes?.excerpt || '',
        content: html || module.default || '',
        tags: attributes?.tags || []
      };
    });

    console.log("Processed markdown posts:", posts.length);
    return posts;
  } catch (error) {
    console.error("Error loading markdown files:", error);
    // Fallback to static data
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    console.log("Getting all blog posts...");
    const markdownPosts = await loadMarkdownFiles();
    const allPosts = [...markdownPosts, ...blogPosts];
    console.log("Total posts:", allPosts.length, "Markdown posts:", markdownPosts.length, "Static posts:", blogPosts.length);
    return allPosts;
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
