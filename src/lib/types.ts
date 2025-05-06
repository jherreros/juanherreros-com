
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
}

export interface Talk {
  id: string;
  title: string;
  event: string;
  date: string;
  description: string;
  videoUrl?: string; // YouTube or other video platform URL
  imageUrl?: string; // Fallback image if no video
  slides?: string; // URL to slides
  tags: string[];
}

export interface ResumeSection {
  title: string;
  items: ResumeItem[];
}

export interface ResumeItem {
  id: string;
  title: string;
  organization?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  bullets?: string[];
  skills?: string[];
}
