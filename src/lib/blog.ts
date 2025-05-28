
import { BlogPost } from "@/lib/types";
import { Language } from "@/contexts/LanguageContext";

// Helper function to load all markdown files from content/blog directory
async function loadMarkdownFiles(language: Language = 'en') {
  try {
    console.log(`Attempting to load markdown files for language: ${language}...`);
    
    // Use import.meta.glob to load all markdown files
    const modules = import.meta.glob('/src/content/blog/**/*.md', { eager: true, as: 'raw' });
    console.log("Found markdown files:", Object.keys(modules).length);
    
    if (Object.keys(modules).length === 0) {
      console.warn("No markdown files found in the content/blog directory");
      return [];
    }
    
    const posts: BlogPost[] = Object.entries(modules)
      .filter(([path]) => path.endsWith(`/${language}.md`))
      .map(([path, content]: [string, string]) => {
        console.log("Processing file:", path);
        
        // Extract the folder name for slug (e.g., /src/content/blog/automating-the-deployment/en.md -> automating-the-deployment)
        const pathParts = path.split('/');
        const slug = pathParts[pathParts.length - 2]; // Get the folder name
        
        // Initialize with default values
        let title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        let author = 'Juan Herreros Elorza'; // Default author
        let date = new Date().toISOString(); // Default to current date in ISO format
        let excerpt = '';
        let tags: string[] = [];
        let actualContent = content;
        
        // Try to parse frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        
        if (frontmatterMatch) {
          const [_, frontmatterStr, contentBody] = frontmatterMatch;
          
          // Parse frontmatter line by line
          frontmatterStr.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
              const key = line.substring(0, colonIndex).trim();
              const value = line.substring(colonIndex + 1).trim();
              
              if (key === 'title') title = value.replace(/^["']|["']$/g, '');
              if (key === 'author') author = value.replace(/^["']|["']$/g, '');
              if (key === 'date') {
                try {
                  const cleanValue = value.replace(/^["']|["']$/g, '').trim();
                  if (/^\d{4}-\d{2}-\d{2}/.test(cleanValue)) {
                    date = cleanValue.includes('T') ? cleanValue : `${cleanValue}T00:00:00Z`;
                  }
                } catch (e) {
                  console.error("Invalid date format:", value);
                  date = new Date().toISOString();
                }
              }
              if (key === 'excerpt') excerpt = value.replace(/^["']|["']$/g, '');
              if (key === 'tags') {
                try {
                  if (value.trim().startsWith('[') && value.trim().endsWith(']')) {
                    const tagsString = value.trim().slice(1, -1);
                    tags = tagsString
                      .split(',')
                      .map(tag => tag.trim().replace(/^["']|["']$/g, ''))
                      .filter(tag => tag);
                  } else {
                    tags = value
                      .split(',')
                      .map(tag => tag.trim().replace(/^["']|["']$/g, ''))
                      .filter(tag => tag);
                  }
                } catch (e) {
                  console.error("Failed to parse tags:", value, e);
                  tags = [];
                }
              }
            }
          });
          
          // Use the content after frontmatter
          actualContent = contentBody.trim();
        }
        
        // Extract excerpt from content if not set
        if (!excerpt && actualContent) {
          const paragraphs = actualContent
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
          content: actualContent || 'No content available',
          tags: tags
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

export async function getAllPosts(language: Language = 'en'): Promise<BlogPost[]> {
  try {
    console.log("Getting all blog posts...");
    
    // Load posts from markdown files for the specified language
    const markdownPosts = await loadMarkdownFiles(language);
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

export async function getPostBySlug(slug: string, language: Language = 'en'): Promise<BlogPost | undefined> {
  try {
    const posts = await getAllPosts(language);
    return posts.find(post => post.slug === slug);
  } catch (error) {
    console.error(`Error finding post with slug ${slug}:`, error);
    return undefined;
  }
}

export async function getRecentPosts(count: number = 3, language: Language = 'en'): Promise<BlogPost[]> {
  try {
    const posts = await getAllPosts(language);
    // Posts are already sorted by date in getAllPosts, so we just need to take the first 'count' posts
    return posts.slice(0, count);
  } catch (error) {
    console.error("Error getting recent posts:", error);
    return [];
  }
}
