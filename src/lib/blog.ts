
import { BlogPost } from "@/lib/types";

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
      console.log("Module structure:", Object.keys(module));
      
      // Extract the file name for slug
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      // Initialize with default values
      let title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      let author = 'Juan Herreros'; // Default author
      let date = new Date().toISOString();
      let excerpt = '';
      let tags: string[] = [];
      let content = '';
      
      try {
        // Try different module structures to extract content
        if (typeof module.default === 'string') {
          // Raw content as string
          content = module.default;
          
          // Try to extract frontmatter-like info from the content
          const titleMatch = content.match(/# (.*?)(\n|$)/);
          if (titleMatch) {
            title = titleMatch[1].trim();
            // Remove the title from content to avoid duplication
            content = content.replace(/# (.*?)(\n|$)/, '');
          }
          
          // Extract first paragraph as excerpt if not set
          if (!excerpt) {
            const paragraphMatch = content.match(/\n\n(.*?)(\n\n|$)/);
            if (paragraphMatch) {
              excerpt = paragraphMatch[1].trim();
            }
          }
        } else if (module.frontmatter) {
          // vite-plugin-markdown structure with frontmatter
          title = module.frontmatter.title || title;
          author = module.frontmatter.author || author;
          date = module.frontmatter.date || date;
          excerpt = module.frontmatter.excerpt || excerpt;
          tags = module.frontmatter.tags || [];
          content = module.html || module.content || '';
        } else if (module.attributes) {
          // Some other markdown plugin structure
          title = module.attributes.title || title;
          author = module.attributes.author || author;
          date = module.attributes.date || date;
          excerpt = module.attributes.excerpt || excerpt;
          tags = module.attributes.tags || [];
          
          // Try to get content from different properties
          if (module.html) {
            content = module.html;
          } else if (module.content) {
            content = module.content;
          } else if (typeof module.default === 'function') {
            // For React components generated from markdown
            content = module.body || '';
          }
        } else if (module.metadata) {
          // Another possible structure
          title = module.metadata.title || title;
          author = module.metadata.author || author;
          date = module.metadata.date || date;
          excerpt = module.metadata.excerpt || excerpt;
          tags = module.metadata.tags || [];
          content = module.content || '';
        } else {
          // Last attempt - try to access raw content
          const rawContent = module.default?.toString() || '';
          content = rawContent;
          
          // Try to parse frontmatter-like content
          const frontmatterMatch = rawContent.match(/---\n([\s\S]*?)\n---\n([\s\S]*)/);
          if (frontmatterMatch) {
            const frontmatterStr = frontmatterMatch[1];
            const contentStr = frontmatterMatch[2];
            
            // Parse frontmatter
            frontmatterStr.split('\n').forEach(line => {
              const [key, ...valueParts] = line.split(':');
              const value = valueParts.join(':').trim();
              if (key && value) {
                if (key.trim() === 'title') title = value;
                if (key.trim() === 'author') author = value;
                if (key.trim() === 'date') date = value;
                if (key.trim() === 'excerpt') excerpt = value;
                if (key.trim() === 'tags') tags = value.split(',').map(t => t.trim());
              }
            });
            
            content = contentStr;
          }
        }
      } catch (parseError) {
        console.error(`Error parsing markdown file ${path}:`, parseError);
      }
      
      // Final fallback for content: use the full raw content if we couldn't extract it properly
      if (!content && module.default) {
        content = typeof module.default === 'string' ? module.default : JSON.stringify(module.default);
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
