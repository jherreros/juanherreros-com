
import { Hero } from "@/components/home/Hero";
import { blogPosts } from "@/data/blogPosts";
import { talks } from "@/data/talks";
import { Separator } from "@/components/ui/separator";
import { BlogCard } from "@/components/blog/BlogCard";
import { TalkCard } from "@/components/talks/TalkCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Get latest blog posts and talks
  const latestPosts = blogPosts.slice(0, 3);
  const latestTalks = talks.slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
          <Button variant="ghost" asChild>
            <Link to="/blog">View all posts</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      
      <Separator className="max-w-6xl mx-auto" />
      
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Talks</h2>
          <Button variant="ghost" asChild>
            <Link to="/talks">View all talks</Link>
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
