
import { BlogPost } from "@/lib/types";
import { blogPosts } from "@/data/blogPosts";

// Helper function to load all markdown files from content/blog directory
async function loadMarkdownFiles() {
  try {
    console.log("Attempting to load markdown files...");
    
    // Use import.meta.glob with { eager: true } to load all markdown files
    const modules = import.meta.glob('/src/content/blog/*.md', { eager: true });
    console.log("Found markdown files:", Object.keys(modules).length);
    
    if (Object.keys(modules).length === 0) {
      console.warn("No markdown files found in the content/blog directory");
      return [];
    }
    
    const posts: BlogPost[] = Object.entries(modules).map(([path, module]: [string, any]) => {
      console.log("Processing file:", path);
      
      // Different markdown loaders might have different output formats
      // Try to handle various formats
      const attributes = module.attributes || module.frontmatter || module.meta || {};
      const content = module.html || module.content || module.default || '';
      
      // Extract slug from the file path
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      return {
        id: attributes.id || slug,
        title: attributes.title || 'Untitled',
        slug: attributes.slug || slug,
        date: attributes.date || new Date().toISOString(),
        author: attributes.author || 'Unknown',
        excerpt: attributes.excerpt || '',
        content: content,
        tags: attributes.tags || []
      };
    });

    console.log("Successfully processed markdown posts:", posts.length);
    return posts;
  } catch (error) {
    console.error("Error loading markdown files:", error);
    console.error("Error details:", error instanceof Error ? error.message : String(error));
    // Return empty array on error, we'll combine with static posts later
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    console.log("Getting all blog posts...");
    const markdownPosts = await loadMarkdownFiles();
    console.log("Loaded markdown posts:", markdownPosts.length);
    
    // Always include the static posts as fallback
    const allPosts = [...markdownPosts, ...blogPosts];
    console.log("Total posts:", allPosts.length);
    
    return allPosts;
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    // Return only the static posts if there's an error
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
