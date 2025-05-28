
import { BlogPost } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { format, isValid, parseISO } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Safely format the date
  const formatDate = (dateString: string) => {
    try {
      const cleanDate = dateString.trim().replace(/["']/g, '');
      const date = parseISO(cleanDate);
      if (isValid(date)) {
        return format(date, "MMMM dd, yyyy");
      }
      console.warn("Invalid date in BlogCard:", dateString);
      return t('dateUnavailable');
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return t('dateUnavailable');
    }
  };

  const formattedDate = post.date ? formatDate(post.date) : t('dateUnavailable');

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
          <p className="text-foreground font-medium">{t('by')} {post.author}</p>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {post.tags && post.tags.length > 0 ? (
            <>
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
            </>
          ) : (
            <span className="text-xs text-muted-foreground">{t('noTags')}</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
