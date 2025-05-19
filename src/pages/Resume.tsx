
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { toast } from "@/components/ui/sonner";

const Resume = () => {
  const [resumeContent, setResumeContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadResumeContent() {
      try {
        console.log("Loading resume markdown content...");
        // Import the resume markdown file
        const resumeModule = await import('/src/content/resume.md');
        console.log("Resume module:", resumeModule);
        
        // Extract content from the module
        let content = '';
        if (typeof resumeModule.default === 'string') {
          content = resumeModule.default;
        } else if (resumeModule.content) {
          content = resumeModule.content;
        } else if (resumeModule.html) {
          content = resumeModule.html;
        } else if (resumeModule.attributes && resumeModule.body) {
          content = resumeModule.body;
        } else {
          // Fallback to stringify the module if we can't find the content
          content = JSON.stringify(resumeModule);
        }
        
        console.log("Resume content extracted, length:", content.length);
        setResumeContent(content);
      } catch (error) {
        console.error("Failed to load resume content:", error);
        toast.error("Failed to load resume");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadResumeContent();
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
