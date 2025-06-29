import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "@/components/ui/sonner";
// Removed table imports - using regular HTML table elements instead
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
  const [profileContent, setProfileContent] = useState<string>("");
  const [workContent, setWorkContent] = useState<string>("");
  const [sidebarContent, setSidebarContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Function to split markdown content into profile, main, and sidebar sections
  const splitMarkdownContent = (content: string) => {
    const lines = content.split('\n');
    let profileContent = [];
    let workExperienceContent = [];
    let sidebarContent = [];
    
    let currentSection = 'profile'; // Start with profile
    let currentSectionLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if this is a main heading (# )
      if (line.startsWith('# ')) {
        const sectionTitle = line.toLowerCase();
        
        // Save previous section content
        if (currentSection === 'profile') {
          profileContent = [...profileContent, ...currentSectionLines];
        } else if (currentSection === 'work') {
          workExperienceContent = [...workExperienceContent, ...currentSectionLines];
        } else if (currentSection === 'sidebar') {
          sidebarContent = [...sidebarContent, ...currentSectionLines];
        }
        
        // Determine which section this heading belongs to
        if (sectionTitle.includes('work experience') || 
            sectionTitle.includes('experiencia profesional') || 
            sectionTitle.includes('arbejdserfaring')) {
          currentSection = 'work';
        } else if (currentSection === 'profile') {
          // If we haven't hit work experience yet, everything is still profile
          currentSection = 'profile';
        } else {
          // After work experience, everything goes to sidebar
          currentSection = 'sidebar';
        }
        
        currentSectionLines = [line];
      } else {
        currentSectionLines.push(line);
      }
    }
    
    // Don't forget the last section
    if (currentSection === 'profile') {
      profileContent = [...profileContent, ...currentSectionLines];
    } else if (currentSection === 'work') {
      workExperienceContent = [...workExperienceContent, ...currentSectionLines];
    } else if (currentSection === 'sidebar') {
      sidebarContent = [...sidebarContent, ...currentSectionLines];
    }
    
    return {
      profile: profileContent.join('\n').trim(),
      work: workExperienceContent.join('\n').trim(),
      sidebar: sidebarContent.join('\n').trim()
    };
  };
  
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
        
        // Split content into profile, work, and sidebar
        const { profile, work, sidebar } = splitMarkdownContent(content);
        setProfileContent(profile);
        setWorkContent(work);
        setSidebarContent(sidebar);
        
      } catch (error) {
        console.error("Failed to load resume content:", error);
        setResumeContent(enResume); // Use English as final fallback
        const { profile, work, sidebar } = splitMarkdownContent(enResume);
        setProfileContent(profile);
        setWorkContent(work);
        setSidebarContent(sidebar);
        toast.error("Failed to load resume");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadResumeContent();
  }, [language]);

  const markdownComponents = {
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
        <table {...props} className="w-full border-collapse border border-border" />
      </div>
    ),
    thead: ({node, ...props}) => <thead {...props} />,
    tbody: ({node, ...props}) => <tbody {...props} />,
    tr: ({node, ...props}) => <tr {...props} />,
    th: ({node, ...props}) => <th className="font-semibold text-primary p-2 border border-border bg-muted text-left" {...props} />,
    td: ({node, ...props}) => <td className="p-2 border border-border" {...props} />
  };

  // Sidebar components with smaller headings for better visual hierarchy
  const sidebarMarkdownComponents = {
    // Render headings one level smaller in the sidebar
    h1: ({node, ...props}) => <h2 className="text-primary" {...props} />,
    h2: ({node, ...props}) => <h3 className="text-primary" {...props} />,
    h3: ({node, ...props}) => <h4 className="text-primary" {...props} />,
    h4: ({node, ...props}) => <h5 className="text-primary" {...props} />,
    h5: ({node, ...props}) => <h6 className="text-primary" {...props} />,
    h6: ({node, ...props}) => <h6 className="text-primary" {...props} />,
    
    // Enhanced table components mapping for better table rendering
    table: ({node, ...props}) => (
      <div className="my-6 w-full overflow-auto">
        <table {...props} className="w-full border-collapse border border-border" />
      </div>
    ),
    thead: ({node, ...props}) => <thead {...props} />,
    tbody: ({node, ...props}) => <tbody {...props} />,
    tr: ({node, ...props}) => <tr {...props} />,
    th: ({node, ...props}) => <th className="font-semibold text-primary p-2 border border-border bg-muted text-left" {...props} />,
    td: ({node, ...props}) => <td className="p-2 border border-border" {...props} />
  };

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
      
      {/* Profile Section - Full Width */}
      <div className="mb-6">
        <Card className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {profileContent}
            </ReactMarkdown>
          </div>
        </Card>
      </div>
      
      {/* Responsive Grid Layout for Work Experience and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Work Experience - Takes 3/5 (60%) of the width on large screens */}
        <div className="lg:col-span-3">
          <Card className="p-6 h-fit">
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {workContent}
              </ReactMarkdown>
            </div>
          </Card>
        </div>
        
        {/* Sidebar Content - Takes 2/5 (40%) of the width on large screens */}
        <div className="lg:col-span-2">
          <Card className="p-6 h-fit lg:sticky lg:top-24">
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={sidebarMarkdownComponents}
              >
                {sidebarContent}
              </ReactMarkdown>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resume;