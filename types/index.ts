export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags?: string[];
}

export interface ResumeExperience {
  title: string;
  organization: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  period: string;
}

export interface ResumeData {
  summary: string;
  experience: ResumeExperience[];
  skills: Record<string, string[]>;
  education: ResumeEducation[];
}
