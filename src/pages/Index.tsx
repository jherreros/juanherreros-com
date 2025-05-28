import { Hero } from "@/components/home/Hero";
import { talks } from "@/data/talks";
import { Separator } from "@/components/ui/separator";
import { BlogCard } from "@/components/blog/BlogCard";
import { TalkCard } from "@/components/talks/TalkCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import { BlogPost } from "@/lib/types";
import { getRecentPosts } from "@/lib/blog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

const Index = () => {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  // Sort talks by date and get the 2 most recent ones
  const latestTalks = useMemo(() => {
    return [...talks]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2);
  }, []);

  useEffect(() => {
    async function loadPosts() {
      try {
        console.log("Loading recent posts for homepage...");
        // Load posts for the current language
        const posts = await getRecentPosts(3, language);
        console.log("Recent posts loaded:", posts.length);
        setLatestPosts(posts);
      } catch (error) {
        console.error("Failed to load recent posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPosts();
  }, [language]); // Re-load posts when language changes

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t('latestBlogPosts')}</h2>
          <Button variant="ghost" asChild>
            <Link to="/blog">{t('viewAllPosts')}</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {isLoading ? (
            // Loading skeleton for posts
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/4 mb-6"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ))
          ) : (
            latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          )}
        </div>
      </section>
      
      <Separator className="max-w-6xl mx-auto" />
      
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t('recentTalks')}</h2>
          <Button variant="ghost" asChild>
            <Link to="/talks">{t('viewAllTalks')}</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {latestTalks.map((talk) => (
            <TalkCard key={talk.id} talk={talk} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;