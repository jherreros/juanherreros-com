
import { Talk } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, isValid, parseISO } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

interface TalkCardProps {
  talk: Talk;
}

export function TalkCard({ talk }: TalkCardProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Safely parse and format the date
  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, "MMMM dd, yyyy");
      }
      return t('dateUnavailable');
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return t('dateUnavailable');
    }
  };

  const formattedDate = talk.date ? formatDate(talk.date) : t('dateUnavailable');
  const description = talk.description[language] || talk.description.en;

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-primary">{talk.title}</CardTitle>
        <CardDescription>
          {talk.event} | {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {(talk.videoUrl || talk.imageUrl) && (
          <div className="mb-4 aspect-video bg-muted rounded-md overflow-hidden">
            {talk.videoUrl ? (
              <iframe
                src={talk.videoUrl.replace("watch?v=", "embed/")}
                title={talk.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : talk.imageUrl ? (
              <img
                src={talk.imageUrl}
                alt={talk.title}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
        )}
        <p className="text-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex flex-wrap gap-2">
          {talk.tags && talk.tags.length > 0 ? (
            <>
              {talk.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {talk.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{talk.tags.length - 3}
                </Badge>
              )}
            </>
          ) : (
            <span className="text-xs text-muted-foreground">{t('noTags')}</span>
          )}
        </div>
        {talk.slides && (
          <Button variant="secondary" size="sm" asChild>
            <a href={talk.slides} target="_blank" rel="noopener noreferrer">
              {t('viewSlides')}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
