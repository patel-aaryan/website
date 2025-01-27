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
import {
  Angular,
  Bootstrap,
  Figma,
  Jquery,
  Next,
  React,
  Redux,
  Tailwind,
} from "../../public/frontend";
import {
  Djgnao,
  DotNet,
  Mongodb,
  Mysql,
  Nest,
  Node,
  Postgres,
  Sqlserver,
} from "../../public/backend";
import {
  Aws,
  Docker,
  Gcp,
  Git,
  Jenkins,
  Kube,
  Linux,
  Terraform,
} from "../../public/devops";

export const languages = [
  {
    name: "C++",
    component: () => <Cpp />,
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
    name: "C#",
    component: () => <Cs />,
  },
  {
    name: "TypeScript",
    component: () => <Ts />,
  },
  {
    name: "Java",
    component: () => <Java />,
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
    name: "React",
    component: () => <React />,
  },
  {
    name: "Angular",
    component: () => <Angular />,
  },
  {
    name: "Next.js",
    component: () => <Next />,
  },
  {
    name: "Tailwind CSS",
    component: () => <Tailwind />,
  },
  {
    name: "Bootstrap",
    component: () => <Bootstrap />,
  },
  {
    name: "Figma",
    component: () => <Figma />,
  },
  {
    name: "Redux",
    component: () => <Redux />,
  },
  {
    name: "jQuery",
    component: () => <Jquery />,
  },
];

export const backend = [
  {
    name: "ASP.NET",
    component: () => <DotNet />,
  },
  {
    name: "Django",
    component: () => <Djgnao />,
  },
  {
    name: "Node.js",
    component: () => <Node />,
  },
  {
    name: "Nest.js",
    component: () => <Nest />,
  },
  {
    name: "MySQL",
    component: () => <Mysql />,
  },
  {
    name: "PostgreSQL",
    component: () => <Postgres />,
  },
  {
    name: "SQL Server",
    component: () => <Sqlserver />,
  },
  {
    name: "MongoDB",
    component: () => <Mongodb />,
  },
];

export const devops = [
  {
    name: "Git",
    component: () => <Git />,
  },
  {
    name: "Docker",
    component: () => <Docker />,
  },
  {
    name: "Kuebernetes",
    component: () => <Kube />,
  },
  {
    name: "Terraform",
    component: () => <Terraform />,
  },
  {
    name: "Google Cloud Platform",
    component: () => <Gcp />,
  },
  {
    name: "Linux",
    component: () => <Linux />,
  },
  {
    name: "AWS",
    component: () => <Aws />,
  },
  {
    name: "Jenkins",
    component: () => <Jenkins />,
  },
];
