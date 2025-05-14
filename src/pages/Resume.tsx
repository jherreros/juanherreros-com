
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import { toast } from "@/components/ui/sonner";
// Import directly from the resume data instead of trying to load the markdown file
import { resumeData } from "@/data/resume";

const Resume = () => {
  const [resumeContent, setResumeContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load from the static content since we're having issues with markdown imports
    setResumeContent(resumeData.content);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-4"></div>
          <div className="h-4 w-40 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Resume</h1>
      
      <Card className="p-6">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>
            {resumeContent}
          </ReactMarkdown>
        </div>
      </Card>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Download Options</h2>
        <div className="flex gap-4">
          <a 
            href="/JuanHerreros_Resume.pdf" 
            target="_blank"
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Download PDF
          </a>
          <a 
            href="/JuanHerreros_Resume.docx" 
            target="_blank"
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
          >
            Download Word
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resume;
