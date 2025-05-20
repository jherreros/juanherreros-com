
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { toast } from "@/components/ui/sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Resume = () => {
  const [resumeContent, setResumeContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadResumeContent() {
      try {
        console.log("Loading resume markdown content...");
        
        // Import the resume markdown file as text using ?raw suffix
        const content = await import('/src/content/resume.md?raw').then(module => module.default);
        console.log("Resume content loaded, length:", content.length);
        
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
      <h1 className="text-3xl font-bold mb-6 text-primary">Resume</h1>
      
      <Card className="p-6">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown components={{
            // Make all headings green by applying text-primary class
            h1: ({node, ...props}) => <h1 className="text-primary" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-primary" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-primary" {...props} />,
            h4: ({node, ...props}) => <h4 className="text-primary" {...props} />,
            h5: ({node, ...props}) => <h5 className="text-primary" {...props} />,
            h6: ({node, ...props}) => <h6 className="text-primary" {...props} />,
            
            // Enhanced table components mapping for better table rendering
            table: ({node, ...props}) => (
              <div className="my-6 w-full overflow-auto rounded border border-border">
                <Table className="w-full" {...props} />
              </div>
            ),
            thead: ({node, ...props}) => <TableHeader {...props} />,
            tbody: ({node, ...props}) => <TableBody {...props} />,
            tr: ({node, ...props}) => <TableRow className="hover:bg-muted/50" {...props} />,
            th: ({node, ...props}) => <TableHead className="text-primary font-medium py-3 px-4" {...props} />,
            td: ({node, ...props}) => <TableCell className="py-3 px-4 border-t border-border" {...props} />
          }}>
            {resumeContent}
          </ReactMarkdown>
        </div>
      </Card>
    </div>
  );
};

export default Resume;
