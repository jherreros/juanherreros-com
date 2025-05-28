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
              {t('hiImJuan')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('heroDescription')}
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
            <div className="bg-gradient-to-br from-green-200 to-green-400 dark:from-green-700 dark:to-green-900 p-1 rounded-lg shadow-lg">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-background">
                <Avatar className="h-full w-full rounded-md">
                  <AvatarImage 
                    src="/Juan.jpg" 
                    alt="Juan Herreros" 
                    className="object-cover h-full w-full" 
                  />
                  <AvatarFallback className="text-4xl h-full w-full">JH</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}