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
  /** Current academic term label, e.g. 4A */
  term: string;
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

export interface FeaturedProjectLiveLog {
  /** Uppercase terminal-style label, e.g. PRODUCTION_SURFACE_01 */
  header: string;
  metrics: { key: string; value: string }[];
}

export interface FeaturedProject {
  title: string;
  description: string;
  tech?: string[];
  link: string;
  source: string;
  stats?: { label: string; value: string }[];
  /** Terminal-style live strip on the featured card when `link` is set */
  liveLog?: FeaturedProjectLiveLog;
  /** Short bullets shown next to the live-site callout on the featured card */
  linkHighlights?: string[];
}
