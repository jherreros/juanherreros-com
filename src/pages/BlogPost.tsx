
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { BlogPost as BlogPostType } from "@/lib/types";
import { getPostBySlug } from "@/lib/blog";
import { toast } from "@/components/ui/sonner";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadPost() {
      if (slug) {
        try {
          const foundPost = await getPostBySlug(slug);
          setPost(foundPost || null);
        } catch (error) {
          console.error("Failed to load post:", error);
          toast.error("Failed to load blog post");
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    loadPost();
  }, [slug]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-4"></div>
          <div className="h-4 w-40 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  // Redirect if post not found
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, the post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const formattedDate = format(new Date(post.date), "MMMM dd, yyyy");

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>
        </Button>
      </div>
      
      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <span className="font-medium text-foreground">By {post.author}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <time dateTime={post.date}>{formattedDate}</time>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <Badge key={i} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </header>
        
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
