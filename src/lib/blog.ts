
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
      console.log("Module content:", module);
      
      // Extract the file name for slug
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      // Initialize with default values
      let title = 'Unknown Title';
      let author = 'Unknown Author';
      let date = new Date().toISOString();
      let excerpt = '';
      let tags: string[] = [];
      let content = '';
      
      // Extract frontmatter data depending on the module structure
      if (module.default && typeof module.default === 'object') {
        // For vite-plugin-md structure
        const frontmatter = module.frontmatter || module.attributes || {};
        title = frontmatter.title || title;
        author = frontmatter.author || author;
        date = frontmatter.date || date;
        excerpt = frontmatter.excerpt || excerpt;
        tags = frontmatter.tags || tags;
        
        // Try to get content
        if (typeof module.default === 'string') {
          content = module.default;
        } else if (module.html) {
          content = module.html;
        } else if (module.content) {
          content = module.content;
        }
      } else if (module.attributes) {
        // For some markdown plugins
        title = module.attributes.title || title;
        author = module.attributes.author || author;
        date = module.attributes.date || date;
        excerpt = module.attributes.excerpt || excerpt;
        tags = module.attributes.tags || tags;
        
        // Try to extract content from the component
        if (module.default) {
          content = excerpt; // Use excerpt as fallback
        }
      }
      
      // Fallback to the file name as title if nothing else works
      if (title === 'Unknown Title') {
        title = slug.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      }
      
      const post: BlogPost = {
        id: slug,
        title: title,
        slug: slug,
        date: date,
        author: author,
        excerpt: excerpt || 'No excerpt available',
        content: content || excerpt || 'No content available',
        tags: tags || []
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
      
      // Filter out any posts with missing titles
      const validMarkdownPosts = markdownPosts.filter(
        post => post && post.title && post.title !== 'Unknown Title'
      );
      
      console.log("Valid markdown posts after filtering:", validMarkdownPosts.length);
      allPosts = [...validMarkdownPosts, ...allPosts];
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
      .filter(post => post && post.title && post.title !== 'Unknown Title' && post.title !== 'Untitled')
      .slice(0, count);
  } catch (error) {
    console.error("Error getting recent posts:", error);
    // Return the first 'count' posts from static data
    return blogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  }
}
