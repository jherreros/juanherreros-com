
import { BlogPost } from "@/lib/types";
import { Language } from "@/contexts/LanguageContext";

// Helper function to load all markdown files from content/blog directory
async function loadMarkdownFiles(language: Language = 'en') {
  try {
    console.log(`Attempting to load markdown files for language: ${language}...`);
    
    // Use import.meta.glob to load all markdown files for the specific language
    const modules = import.meta.glob('/src/content/blog/**/*.md', { eager: true, as: 'raw' });
    console.log("Found markdown files:", Object.keys(modules));
    
    if (Object.keys(modules).length === 0) {
      console.warn("No markdown files found in the content/blog directory");
      return [];
    }
    
    const posts: BlogPost[] = Object.entries(modules)
      .filter(([path]) => {
        // Filter for files that match the language pattern: /folder/language.md
        const pathParts = path.split('/');
        const fileName = pathParts[pathParts.length - 1];
        return fileName === `${language}.md`;
      })
      .map(([path, content]: [string, string]) => {
        console.log("Processing file:", path);
        
        // Extract the folder name for slug (e.g., /src/content/blog/automating-the-deployment/en.md -> automating-the-deployment)
        const pathParts = path.split('/');
        const slug = pathParts[pathParts.length - 2]; // Get the folder name
        
        // Initialize with default values
        let title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        let author = 'Juan Herreros Elorza';
        let date = new Date().toISOString();
        let excerpt = '';
        let tags: string[] = [];
        let actualContent = content;
        
        // Parse frontmatter using a more robust approach
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const frontmatterMatch = content.match(frontmatterRegex);
        
        if (frontmatterMatch) {
          const [_, frontmatterStr, contentBody] = frontmatterMatch;
          console.log("Found frontmatter for:", slug);
          
          // Parse frontmatter line by line
          frontmatterStr.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
              const key = line.substring(0, colonIndex).trim();
              let value = line.substring(colonIndex + 1).trim();
              
              // Remove quotes from values
              value = value.replace(/^["']|["']$/g, '');
              
              switch (key) {
                case 'title':
                  title = value;
                  break;
                case 'author':
                  author = value;
                  break;
                case 'date':
                  date = value.includes('T') ? value : `${value}T00:00:00Z`;
                  break;
                case 'excerpt':
                  excerpt = value;
                  break;
                case 'tags':
                  try {
                    // Handle array format [tag1, tag2] or simple comma-separated
                    if (value.startsWith('[') && value.endsWith(']')) {
                      const tagsString = value.slice(1, -1);
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
                  break;
              }
            }
          });
          
          actualContent = contentBody.trim();
        } else {
          console.warn("No frontmatter found for:", slug);
        }
        
        // Generate excerpt from content if not provided
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
          tags
        };
        
        console.log(`Processed post: ${post.title}, date: ${post.date}, tags: ${post.tags.join(', ')}`);
        return post;
      });

    console.log("Successfully processed markdown posts:", posts.length);
    return posts;
  } catch (error) {
    console.error("Error loading markdown files:", error);
    return [];
  }
}

export async function getAllPosts(language: Language = 'en'): Promise<BlogPost[]> {
  try {
    console.log(`Getting all blog posts for language: ${language}...`);
    
    const markdownPosts = await loadMarkdownFiles(language);
    console.log("Loaded markdown posts:", markdownPosts.length);
    
    // Sort posts by date, newest first
    return markdownPosts.sort((a, b) => {
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
    return posts.slice(0, count);
  } catch (error) {
    console.error("Error getting recent posts:", error);
    return [];
  }
}
