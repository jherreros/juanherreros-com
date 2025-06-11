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
  | 'by'
  | 'latestBlogPosts'
  | 'viewAllPosts'
  | 'recentTalks'
  | 'viewAllTalks'
  | 'readMyBlog'
  | 'viewMyResume'
  | 'hiImJuan'
  | 'heroDescription'
  | 'thoughtsAndInsights'
  | 'searchPlaceholder'
  | 'noPostsFound'
  | 'loadingPosts';

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
    latestBlogPosts: 'Latest Blog Posts',
    viewAllPosts: 'View all posts',
    recentTalks: 'Recent Talks',
    viewAllTalks: 'View all talks',
    readMyBlog: 'Read My Blog',
    viewMyResume: 'View My Resume',
    hiImJuan: "Hi, I'm Juan",
    heroDescription: 'Platform Engineering Manager with a passion for building high-performing teams and scalable, developer-friendly infrastructure.',
    thoughtsAndInsights: 'Thoughts, insights, and experiences from my journey in platform engineering and leadership.',
    searchPlaceholder: 'Search posts by title, tag, content, or author...',
    noPostsFound: 'No posts found matching your search criteria.',
    loadingPosts: 'Loading posts...',
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
    latestBlogPosts: 'Últimas Entradas del Blog',
    viewAllPosts: 'Ver todas las entradas',
    recentTalks: 'Charlas Recientes',
    viewAllTalks: 'Ver todas las charlas',
    readMyBlog: 'Lee Mi Blog',
    viewMyResume: 'Ver Mi CV',
    hiImJuan: 'Hola, soy Juan',
    heroDescription: 'Manager de Platform Engineering con pasión por construir equipos de alto rendimiento e infraestructura escalable y fácil de usar.',
    thoughtsAndInsights: 'Pensamientos, ideas y experiencias sobre Platform Engineering y liderazgo.',
    searchPlaceholder: 'Buscar entradas por título, etiqueta, contenido o autor...',
    noPostsFound: 'No se encontraron entradas que coincidan con tus criterios de búsqueda.',
    loadingPosts: 'Cargando entradas...',
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
    latestBlogPosts: 'Seneste Blogindlæg',
    viewAllPosts: 'Se alle indlæg',
    recentTalks: 'Seneste Foredrag',
    viewAllTalks: 'Se alle foredrag',
    readMyBlog: 'Læs Min Blog',
    viewMyResume: 'Se Mit CV',
    hiImJuan: 'Hej, jeg er Juan',
    heroDescription: 'Platform Engineering Manager med passion for at bygge højtydende teams og skalerbar, udviklervenlig infrastruktur.',
    thoughtsAndInsights: 'Tanker, indsigter og oplevelser fra min rejse inden for platform engineering og ledelse.',
    searchPlaceholder: 'Søg indlæg efter titel, tag, indhold eller forfatter...',
    noPostsFound: 'Ingen indlæg fundet, der matcher dine søgekriterier.',
    loadingPosts: 'Indlæser indlæg...',
  },
};

export function useTranslation(language: Language) {
  return (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key];
  };
}

// Export the translation keys type for better TypeScript support
export type { TranslationKey };