
import { resumeSections } from "@/data/resume";
import { ResumeItem as ResumeItemType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function ResumeItem({ item }: { item: ResumeItemType }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <div className="text-muted-foreground text-sm">
          {new Date(item.startDate).getFullYear()} - 
          {item.current ? " Present" : item.endDate ? ` ${new Date(item.endDate).getFullYear()}` : ""}
        </div>
      </div>
      
      {(item.organization || item.location) && (
        <div className="mb-2 text-sm">
          {item.organization && <span className="font-medium">{item.organization}</span>}
          {item.organization && item.location && <span> · </span>}
          {item.location && <span>{item.location}</span>}
        </div>
      )}
      
      <p className="mb-3 text-muted-foreground">{item.description}</p>
      
      {item.bullets && item.bullets.length > 0 && (
        <ul className="list-disc pl-5 mb-4 text-sm space-y-1">
          {item.bullets.map((bullet, index) => (
            <li key={index} className="text-muted-foreground">{bullet}</li>
          ))}
        </ul>
      )}
      
      {item.skills && item.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {item.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

const Resume = () => {
  const handleDownloadPDF = () => {
    // In a real scenario, this would be implemented to generate/download a PDF
    alert("PDF download functionality would be implemented here.");
  };
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Juan Herreros</h1>
          <p className="text-muted-foreground">Engineering Manager & Platform Engineer</p>
        </div>
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
      </div>
      
      {resumeSections.map((section, index) => (
        <section key={index} className="mb-12">
          <h2 className="text-xl font-bold mb-6 pb-2 border-b">{section.title}</h2>
          {section.items.map((item) => (
            <ResumeItem key={item.id} item={item} />
          ))}
        </section>
      ))}
    </div>
  );
};

export default Resume;
