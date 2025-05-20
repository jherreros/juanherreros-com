
import { useParams, Link } from "react-router-dom";
import { format, isValid, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Tag } from "lucide-react";
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
          console.log("Loading post with slug:", slug);
          const foundPost = await getPostBySlug(slug);
          console.log("Post found:", foundPost?.title);
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

  // Safely format the date
  const getFormattedDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, "MMMM dd, yyyy");
      }
      return "Unknown date";
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Unknown date";
    }
  };

  const formattedDate = post.date ? getFormattedDate(post.date) : 'Unknown date';

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
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <span className="font-medium text-foreground">By {post.author}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag, i) => (
                <Badge key={i} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </header>
        
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown components={{
            h1: ({node, ...props}) => <h1 className="text-primary" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-primary" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-primary" {...props} />,
            h4: ({node, ...props}) => <h4 className="text-primary" {...props} />,
            h5: ({node, ...props}) => <h5 className="text-primary" {...props} />,
            h6: ({node, ...props}) => <h6 className="text-primary" {...props} />
          }}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
