
import { BlogList } from "@/components/blog/BlogList";
import { blogPosts } from "@/data/blogPosts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p className="text-muted-foreground mb-6">
          Thoughts, insights, and experiences from my journey in platform engineering and leadership.
        </p>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search posts by title, tag, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {filteredPosts.length > 0 ? (
        <BlogList posts={filteredPosts} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
