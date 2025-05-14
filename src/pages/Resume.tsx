
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

// Import the resume markdown content
import resumeMarkdown from "@/content/resume.md";

const Resume = () => {
  const [resumeContent, setResumeContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadResumeContent() {
      try {
        // According to our type declaration, resumeMarkdown is a BlogPost
        // We need to access the content property for the markdown string
        setResumeContent(resumeMarkdown.content);
      } catch (error) {
        console.error("Failed to load resume content:", error);
        toast.error("Failed to load resume content");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadResumeContent();
  }, []);

  const handleDownloadPDF = () => {
    // In a real scenario, this would be implemented to generate/download a PDF
    alert("PDF download functionality would be implemented here.");
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-4"></div>
          <div className="h-4 w-40 bg-muted rounded mb-12"></div>
          <div className="h-4 w-full bg-muted rounded mb-2"></div>
          <div className="h-4 w-full bg-muted rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-muted rounded mb-8"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-primary">Juan Herreros</h1>
          <p className="text-foreground">Engineering Manager & Platform Engineer</p>
        </div>
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h2 className="text-xl font-bold mb-6 pb-2 border-b text-primary" {...props} />,
            h2: ({node, ...props}) => <h3 className="text-lg font-semibold text-primary mb-2" {...props} />,
            strong: ({node, ...props}) => <span className="font-medium" {...props} />,
            em: ({node, ...props}) => <span className="text-muted-foreground text-sm" {...props} />,
            p: ({node, ...props}) => <p className="mb-3 text-foreground" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 text-sm space-y-1" {...props} />,
            li: ({node, ...props}) => <li className="text-foreground" {...props} />,
          }}
        >
          {resumeContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Resume;
