
import { Language } from '@/contexts/LanguageContext';

type TranslationKey = 
  | 'home' 
  | 'blog' 
  | 'talks' 
  | 'resume'
  | 'talksAndPresentations'
  | 'talksDescription'
  | 'backToAllPosts'
  | 'postNotFound'
  | 'postNotFoundDescription'
  | 'backToBlog'
  | 'noTags'
  | 'dateUnavailable'
  | 'viewSlides'
  | 'unknownDate'
  | 'by';

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    home: 'Home',
    blog: 'Blog',
    talks: 'Talks',
    resume: 'Resume',
    talksAndPresentations: 'Talks & Presentations',
    talksDescription: 'A collection of my talks, presentations, and workshops at conferences and meetups.',
    backToAllPosts: 'Back to all posts',
    postNotFound: 'Post Not Found',
    postNotFoundDescription: "Sorry, the post you're looking for doesn't exist or has been removed.",
    backToBlog: 'Back to Blog',
    noTags: 'No tags',
    dateUnavailable: 'Date unavailable',
    viewSlides: 'View Slides',
    unknownDate: 'Unknown date',
    by: 'By',
  },
  es: {
    home: 'Inicio',
    blog: 'Blog',
    talks: 'Charlas',
    resume: 'CV',
    talksAndPresentations: 'Charlas y Presentaciones',
    talksDescription: 'Una colección de mis charlas, presentaciones y talleres en conferencias y meetups.',
    backToAllPosts: 'Volver a todas las entradas',
    postNotFound: 'Entrada No Encontrada',
    postNotFoundDescription: 'Lo siento, la entrada que buscas no existe o ha sido eliminada.',
    backToBlog: 'Volver al Blog',
    noTags: 'Sin etiquetas',
    dateUnavailable: 'Fecha no disponible',
    viewSlides: 'Ver Diapositivas',
    unknownDate: 'Fecha desconocida',
    by: 'Por',
  },
  da: {
    home: 'Hjem',
    blog: 'Blog',
    talks: 'Foredrag',
    resume: 'CV',
    talksAndPresentations: 'Foredrag & Præsentationer',
    talksDescription: 'En samling af mine foredrag, præsentationer og workshops på konferencer og meetups.',
    backToAllPosts: 'Tilbage til alle indlæg',
    postNotFound: 'Indlæg Ikke Fundet',
    postNotFoundDescription: 'Beklager, det indlæg du leder efter findes ikke eller er blevet fjernet.',
    backToBlog: 'Tilbage til Blog',
    noTags: 'Ingen tags',
    dateUnavailable: 'Dato ikke tilgængelig',
    viewSlides: 'Se Slides',
    unknownDate: 'Ukendt dato',
    by: 'Af',
  },
};

export function useTranslation(language: Language) {
  return (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key];
  };
}
