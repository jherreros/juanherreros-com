
import { BlogPost } from "@/lib/types";

// Helper function to load all markdown files from content/blog directory
async function loadMarkdownFiles() {
  try {
    console.log("Attempting to load markdown files...");
    
    // Use import.meta.glob to load all markdown files
    const modules = import.meta.glob('/src/content/blog/*.md', { eager: true, as: 'raw' });
    console.log("Found markdown files:", Object.keys(modules).length);
    
    if (Object.keys(modules).length === 0) {
      console.warn("No markdown files found in the content/blog directory");
      return [];
    }
    
    const posts: BlogPost[] = Object.entries(modules).map(([path, content]: [string, string]) => {
      console.log("Processing file:", path);
      
      // Extract the file name for slug
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      // Initialize with default values
      let title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      let author = 'Juan Herreros'; // Default author
      let date = new Date().toISOString(); // Default to current date in ISO format
      let excerpt = '';
      let tags: string[] = [];
      
      // Try to parse frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      
      if (frontmatterMatch) {
        const [_, frontmatterStr, contentBody] = frontmatterMatch;
        
        // Parse frontmatter
        frontmatterStr.split('\n').forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim();
            if (key.trim() === 'title') title = value;
            if (key.trim() === 'author') author = value;
            if (key.trim() === 'date') {
              // Ensure date is in ISO format for consistency
              try {
                // Remove any quotes if present
                const cleanValue = value.replace(/["']/g, '').trim();
                // If it's already a valid date string, use it
                if (/^\d{4}-\d{2}-\d{2}/.test(cleanValue)) {
                  // Add time component if not present
                  date = cleanValue.includes('T') ? cleanValue : `${cleanValue}T00:00:00Z`;
                } else {
                  // Otherwise use current date
                  console.warn("Invalid date format, using current date as fallback:", cleanValue);
                  date = new Date().toISOString();
                }
              } catch (e) {
                console.error("Invalid date format:", value);
                date = new Date().toISOString();
              }
            }
            if (key.trim() === 'excerpt') excerpt = value;
            if (key.trim() === 'tags') {
              // Parse tags from frontmatter in different formats
              try {
                // Log raw tags value for debugging
                console.log(`Raw tags value for ${title}:`, value);
                
                if (value.startsWith('[') && value.endsWith(']')) {
                  // YAML array format: [tag1, tag2, tag3]
                  tags = value
                    .slice(1, -1)
                    .split(',')
                    .map(t => t.trim().replace(/["']/g, '')) // Remove quotes from tags
                    .filter(t => t.length > 0);
                } else {
                  // Simple comma-separated format: tag1, tag2, tag3
                  tags = value
                    .split(',')
                    .map(t => t.trim().replace(/["']/g, '')) // Remove quotes from tags
                    .filter(t => t.length > 0);
                }
                
                // Debug the processed tags
                console.log(`Parsed tags for ${title}:`, tags);
              } catch (e) {
                console.error("Failed to parse tags:", value, e);
                tags = [];
              }
            }
          }
        });
        
        // Use the content after frontmatter
        content = contentBody;
      }
      
      // Extract excerpt from content if not set
      if (!excerpt && content) {
        // Extract the first paragraph that's not empty and not a heading
        const paragraphs = content
          .split('\n\n')
          .filter(p => p.trim() && !p.trim().startsWith('#'));
        
        if (paragraphs.length > 0) {
          excerpt = paragraphs[0].substring(0, 150).trim();
          if (excerpt.length >= 150) excerpt += '...';
        }
      }
      
      const post: BlogPost = {
        id: slug,
        title,
        slug,
        date,
        author,
        excerpt: excerpt || 'No excerpt available',
        content: content || 'No content available',
        tags: tags || []
      };
      
      console.log(`Processed post: ${post.title} (${post.slug}), date: ${post.date}, tags: ${post.tags.length > 0 ? post.tags.join(', ') : 'no tags'}`);
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
    
    // Only load posts from markdown files, don't include the static posts
    const markdownPosts = await loadMarkdownFiles();
    console.log("Loaded markdown posts:", markdownPosts.length);
    
    // Sort posts by date, newest first
    return markdownPosts.sort((a, b) => {
      // Safely compare dates (if invalid, push to the end)
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const isValidA = !isNaN(dateA.getTime());
      const isValidB = !isNaN(dateB.getTime());
      
      if (!isValidA && !isValidB) return 0;
      if (!isValidA) return 1;
      if (!isValidB) return -1;
      
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.slug === slug);
  } catch (error) {
    console.error(`Error finding post with slug ${slug}:`, error);
    return undefined;
  }
}

export async function getRecentPosts(count: number = 3): Promise<BlogPost[]> {
  try {
    const posts = await getAllPosts();
    // Posts are already sorted by date in getAllPosts, so we just need to take the first 'count' posts
    return posts.slice(0, count);
  } catch (error) {
    console.error("Error getting recent posts:", error);
    return [];
  }
}
