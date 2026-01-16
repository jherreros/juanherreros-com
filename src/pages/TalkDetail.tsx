import { useParams, useNavigate } from "react-router-dom";
import { talks } from "@/data/talks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { format, isValid, parseISO } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";
import { useState, useEffect } from "react";

const TalkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [slidesEmbed, setSlidesEmbed] = useState<string>("");
  const [isLoadingSlides, setIsLoadingSlides] = useState<boolean>(false);

  const talk = talks.find(t => t.id === id);

  useEffect(() => {
    const fetchSlidesEmbed = async () => {
      if (!talk || !talk.slides || !talk.slides.includes('speakerdeck.com')) return;

      setIsLoadingSlides(true);
      try {
        // If we have the speakerdeck ID, use it directly
        if (talk.speakerdeckId) {
          const embedHtml = `<iframe class="speakerdeck-iframe" src="//speakerdeck.com/player/${talk.speakerdeckId}" width="710" height="399" style="aspect-ratio:710/399; border:0; padding:0; margin:0; background:transparent;" frameborder="0" allowtransparency="true" allowfullscreen="allowfullscreen"></iframe>`;
          setSlidesEmbed(embedHtml);
        } else {
          // Fallback: try oEmbed API (works locally with proxy, not in production)
          const oembedUrl = `https://speakerdeck.com/oembed.json?url=${encodeURIComponent(talk.slides)}`;

          const response = await fetch(oembedUrl);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.html) {
            setSlidesEmbed(data.html);
          }
        }
      } catch (error) {
        console.error("Error fetching Speakerdeck embed:", error);
      } finally {
        setIsLoadingSlides(false);
      }
    };

    fetchSlidesEmbed();
  }, [talk]);

  if (!talk) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Talk not found</h1>
          <Button onClick={() => navigate("/talks")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Talks
          </Button>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate("/talks")}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t('backToTalks')}
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">{talk.title}</h1>
          <p className="text-lg text-muted-foreground">
            {talk.event} | {formattedDate}
          </p>
        </div>

        {(talk.videoUrl || talk.imageUrl) && (
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
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

        {talk.slides && talk.slides.includes('speakerdeck.com') && (
          <div className="w-full bg-muted rounded-lg overflow-hidden">
            {isLoadingSlides ? (
              <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">Loading slides...</p>
              </div>
            ) : slidesEmbed ? (
              <div
                className="w-full [&_iframe]:w-full [&_iframe]:h-auto [&_iframe]:aspect-[710/399]"
                dangerouslySetInnerHTML={{ __html: slidesEmbed }}
              />
            ) : null}
          </div>
        )}

        <div className="prose prose-foreground max-w-none">
          <p className="text-lg">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {talk.tags && talk.tags.length > 0 && (
            talk.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TalkDetail;