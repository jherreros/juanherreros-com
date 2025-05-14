
import { BlogPost } from "@/lib/types";
import { blogPosts } from "@/data/blogPosts";

// Helper function to load all markdown files from content/blog directory
async function loadMarkdownFiles() {
  try {
    console.log("Attempting to load markdown files...");
    
    // Use import.meta.glob to load all markdown files
    const modules = import.meta.glob('/src/content/blog/*.md', { eager: true });
    console.log("Found markdown files:", Object.keys(modules).length);
    
    if (Object.keys(modules).length === 0) {
      console.warn("No markdown files found in the content/blog directory");
      return [];
    }
    
    const posts: BlogPost[] = Object.entries(modules).map(([path, module]: [string, any]) => {
      console.log("Processing file:", path);
      
      // Debug the module structure
      console.log("Module structure:", Object.keys(module));
      
      // Handle various markdown module structures that could be returned
      // by different markdown plugins
      let attributes = {};
      let content = '';
      
      // Try to extract frontmatter and content based on common patterns
      if (module.attributes) {
        attributes = module.attributes;
      } else if (module.frontmatter) {
        attributes = module.frontmatter;
      } else if (module.meta) {
        attributes = module.meta;
      } else if (typeof module === 'object') {
        // Try to find attributes in the module
        attributes = module;
      }
      
      // Try to extract content
      if (typeof module.default === 'string') {
        content = module.default;
      } else if (module.html) {
        content = module.html;
      } else if (module.content) {
        content = module.content;
      } else if (typeof module.default === 'object' && module.default.html) {
        content = module.default.html;
      }
      
      // Extract slug from the file path
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      const post: BlogPost = {
        id: attributes.id || slug,
        title: attributes.title || 'Untitled',
        slug: attributes.slug || slug,
        date: attributes.date || new Date().toISOString(),
        author: attributes.author || 'Unknown',
        excerpt: attributes.excerpt || '',
        content: content,
        tags: attributes.tags || []
      };
      
      console.log(`Processed post: ${post.title} (${post.slug})`);
      return post;
    });

    console.log("Successfully processed markdown posts:", posts.length);
    return posts;
  } catch (error) {
    console.error("Error loading markdown files:", error);
    console.error("Error details:", error instanceof Error ? error.message : String(error));
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    console.log("Getting all blog posts...");
    
    // Always include the static posts even if markdown loading fails
    let allPosts = [...blogPosts];
    
    try {
      const markdownPosts = await loadMarkdownFiles();
      console.log("Loaded markdown posts:", markdownPosts.length);
      allPosts = [...markdownPosts, ...allPosts];
    } catch (mdError) {
      console.error("Error loading markdown posts:", mdError);
      // Continue with just the static posts
    }
    
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
