
import { TalkList } from "@/components/talks/TalkList";
import { talks } from "@/data/talks";
import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

const Talks = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Sort talks by date, newest first
  const sortedTalks = useMemo(() => {
    return [...talks].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-6 text-primary">{t('talksAndPresentations')}</h1>
        <p className="text-foreground">
          {t('talksDescription')}
        </p>
      </div>
      
      <TalkList talks={sortedTalks} />
    </div>
  );
};

export default Talks;
