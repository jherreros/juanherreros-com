
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

export function Hero() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-10 md:mb-0 md:max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('heroSubtitle')}
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild>
                <Link to="/blog">{t('readMyBlog')}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/resume">{t('viewMyResume')}</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-2/5">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
              alt="Juan Herreros" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
