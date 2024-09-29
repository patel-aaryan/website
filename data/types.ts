export interface CourseInfo {
  code: string;
  name: string;
  desc: string[];
  link: string;
}

export interface School {
  name: string;
  start: string;
  end: string;
  major: string;
  minor?: string;
  location: string;
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
  achievements: string[];
}
