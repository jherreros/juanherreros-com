import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Add this import
import { toast } from "@/components/ui/sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

// Import all resume files explicitly
import enResume from "/src/content/resume/en.md?raw";
import esResume from "/src/content/resume/es.md?raw";
import daResume from "/src/content/resume/da.md?raw";

const Resume = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [resumeContent, setResumeContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadResumeContent() {
      try {
        console.log(`Loading resume markdown content for language: ${language}...`);
        
        // Use a map to get the correct content based on language
        const resumeMap = {
          en: enResume,
          es: esResume,
          da: daResume
        };
        
        const content = resumeMap[language] || enResume; // Fallback to English
        console.log("Resume content loaded, length:", content.length);
        
        setResumeContent(content);
      } catch (error) {
        console.error("Failed to load resume content:", error);
        setResumeContent(enResume); // Use English as final fallback
        toast.error("Failed to load resume");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadResumeContent();
  }, [language]);

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
      <h1 className="text-3xl font-bold mb-6 text-primary">{t('resume')}</h1>
      
      <Card className="p-6">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} // Add this line
            components={{
              // Make all headings green by applying text-primary class
              h1: ({node, ...props}) => <h1 className="text-primary" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-primary" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-primary" {...props} />,
              h4: ({node, ...props}) => <h4 className="text-primary" {...props} />,
              h5: ({node, ...props}) => <h5 className="text-primary" {...props} />,
              h6: ({node, ...props}) => <h6 className="text-primary" {...props} />,
              
              // Enhanced table components mapping for better table rendering
              table: ({node, ...props}) => (
                <div className="my-6 w-full overflow-auto">
                  <Table {...props} className="w-full border-collapse" />
                </div>
              ),
              thead: ({node, ...props}) => <TableHeader {...props} />,
              tbody: ({node, ...props}) => <TableBody {...props} />,
              tr: ({node, ...props}) => <TableRow {...props} />,
              th: ({node, ...props}) => <TableHead className="font-semibold text-primary p-2 border border-border bg-muted" {...props} />,
              td: ({node, ...props}) => <TableCell className="p-2 border border-border" {...props} />
            }}
          >
            {resumeContent}
          </ReactMarkdown>
        </div>
      </Card>
    </div>
  );
};

export default Resume;