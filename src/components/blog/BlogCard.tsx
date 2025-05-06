
import { BlogPost } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = format(new Date(post.date), "MMMM dd, yyyy");

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow border-corporate-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">
          <Link
            to={`/blog/${post.slug}`}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            {post.title}
          </Link>
        </CardTitle>
        <div className="flex flex-col space-y-1 text-sm">
          <p className="text-foreground font-medium">By {post.author}</p>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
