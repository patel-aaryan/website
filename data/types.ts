export interface CourseInfo {
  code: string;
  name: string;
}

export interface Club {
  title: string;
  role: string;
  date: string;
  desc?: string[];
}

export interface Education {
  name: string;
  date: string;
  major: string;
  minor?: string;
  location: string;
  colour: string;
  courses?: CourseInfo[];
  clubs: Club[];
  milestones: string[];
}

export interface Experience {
  label: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  description: string[];
  date: string;
  colour: string;
  tech: string[];
  active?: boolean;
}

export interface Project {
  title: string;
  description: string;
  tech: Record<string, string[]>;
  mainTech: string[];
  colour: string;
  link: string;
  source: string;
  features: string[];
  thumbnail: string;
}
