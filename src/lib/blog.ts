
import { BlogPost } from "@/lib/types";
import { blogPosts } from "@/data/blogPosts";

// This is a placeholder function that would be replaced with actual file system 
// operations in a Node.js environment, or with fetch requests in a browser environment
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // In a real implementation, this would dynamically import all .md files
    // or fetch them from an API endpoint
    
    // Use the static blogPosts data if the imports fail
    return blogPosts;
    
    /* Commented out as this approach may not work in the current environment
    const post1 = await import('@/content/blog/evolution-platform-engineering.md');
    const post2 = await import('@/content/blog/leading-technical-teams.md');
    const post3 = await import('@/content/blog/modern-cloud-infrastructure.md');
    
    return [post1.default, post2.default, post3.default] as BlogPost[];
    */
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
