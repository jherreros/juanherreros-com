
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const post = useMemo(() => {
    return blogPosts.find(post => post.slug === slug);
  }, [slug]);

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
