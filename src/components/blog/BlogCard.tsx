
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
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">
          <Link
            to={`/blog/${post.slug}`}
            className="hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{post.excerpt}</p>
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
