
import { BlogPost } from "@/lib/types";

// This is a placeholder function that would be replaced with actual file system 
// operations in a Node.js environment, or with fetch requests in a browser environment
export async function getAllPosts(): Promise<BlogPost[]> {
  // In a real implementation, this would dynamically import all .md files
  // or fetch them from an API endpoint
  
  // For now, we'll return the same posts from our data file
  const post1 = await import('@/content/blog/evolution-platform-engineering.md');
  const post2 = await import('@/content/blog/leading-technical-teams.md');
  const post3 = await import('@/content/blog/modern-cloud-infrastructure.md');
  
  return [post1.default, post2.default, post3.default] as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug);
}

export async function getRecentPosts(count: number = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  // Sort by date, newest first
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
