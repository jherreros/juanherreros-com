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
      let date = new Date().toISOString();
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
            if (key.trim() === 'date') date = value;
            if (key.trim() === 'excerpt') excerpt = value;
            if (key.trim() === 'tags') tags = value.split(',').map(t => t.trim());
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
    
    // Only load posts from markdown files, don't include the static posts
    const markdownPosts = await loadMarkdownFiles();
    console.log("Loaded markdown posts:", markdownPosts.length);
    
    return markdownPosts;
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
    // Sort by date, newest first
    return posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  } catch (error) {
    console.error("Error getting recent posts:", error);
    return [];
  }
}
