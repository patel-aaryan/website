import {
  Cpp,
  Cs,
  Python,
  Sql,
  Java,
  Ts,
  Html,
  Css,
} from "../../public/languages";

export const languages = [
  {
    name: "C++",
    component: () => <Cpp />,
  },
  {
    name: "C#",
    component: () => <Cs />,
  },
  {
    name: "Python",
    component: () => <Python />,
  },
  {
    name: "SQL",
    component: () => <Sql />,
  },
  {
    name: "Java",
    component: () => <Java />,
  },
  {
    name: "TypeScript",
    component: () => <Ts />,
  },
  {
    name: "HTML",
    component: () => <Html />,
  },
  {
    name: "CSS",
    component: () => <Css />,
  },
];

export const frontend = [
  {
    name: "React/React Native",
    component: () => <Cpp />,
  },
  {
    name: "Angular",
    component: () => <Cs />,
  },
  {
    name: "Next.js",
    component: () => <Python />,
  },
  {
    name: "Tailwind CSS",
    component: () => <Sql />,
  },
  {
    name: "Bootstrap",
    component: () => <Java />,
  },
  {
    name: "TypeScript",
    component: () => <Ts />,
  },
  {
    name: "Redux",
    component: () => <Html />,
  },
  {
    name: "jQuery",
    component: () => <Css />,
  },
];

export const backend = [
  {
    name: "ASP.NET",
    component: () => <Cpp />,
  },
  {
    name: "Django",
    component: () => <Cs />,
  },
  {
    name: "Entity Framework",
    component: () => <Python />,
  },
  {
    name: "Node.js/Express.js",
    component: () => <Sql />,
  },
  {
    name: "Nest.js",
    component: () => <Java />,
  },
  {
    name: "MySQL",
    component: () => <Ts />,
  },
  {
    name: "PostgreSQL",
    component: () => <Html />,
  },
  {
    name: "SQL Server",
    component: () => <Css />,
  },
  {
    name: "MongoDB",
    component: () => <Css />,
  },
];

export const devops = [
  {
    name: "Git",
    component: () => <Cpp />,
  },
  {
    name: "Docker",
    component: () => <Cs />,
  },
  {
    name: "Kuebernetes",
    component: () => <Python />,
  },
  {
    name: "Terraform",
    component: () => <Sql />,
  },
  {
    name: "Google Cloud Platform",
    component: () => <Java />,
  },
  {
    name: "AWS",
    component: () => <Ts />,
  },
  {
    name: "Jenkins",
    component: () => <Html />,
  },
  {
    name: "CSS",
    component: () => <Css />,
  },
];
