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
  location: string;
  colour: string;
  courses?: CourseInfo[];
  clubs: Club[];
  milestones: string[];
}

export type ExperienceKind = "work" | "club" | "dance";

export interface Experience {
  label: string;
  labelDate: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  description: string[];
  date: string;
  colour: string;
  tech: string[];
  active?: boolean;
  type?: ExperienceKind;
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
}
