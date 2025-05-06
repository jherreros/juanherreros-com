
import { BlogPost } from "@/lib/types";

// This is a placeholder function that would be replaced with actual file system 
// operations in a Node.js environment, or with fetch requests in a browser environment
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // In a real implementation, this would dynamically import all .md files
    // or fetch them from an API endpoint
    
    const post1 = await import('@/content/blog/evolution-platform-engineering.md');
    const post2 = await import('@/content/blog/leading-technical-teams.md');
    const post3 = await import('@/content/blog/modern-cloud-infrastructure.md');
    
    return [post1.default, post2.default, post3.default] as BlogPost[];
  } catch (error) {
    console.error("Error loading blog posts:", error);
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
