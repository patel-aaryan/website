export interface CourseInfo {
  code: string;
  name: string;
  desc: string[];
  link: string;
}

export interface School {
  name: string;
  date: string;
  major: string;
  minor?: string;
  location: string;
  colour: string;
  courses?: {
    code: string;
    name: string;
    desc: string[];
    link: string;
  }[];
  clubs: {
    title: string;
    role: string;
  }[];
  milestones: string[];
}
