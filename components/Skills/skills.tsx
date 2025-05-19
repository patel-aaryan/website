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
  Figma,
  Jquery,
  Next,
  React,
  Redux,
  Tailwind,
  Vitest,
} from "../../public/frontend";
import {
  Djgnao,
  DotNet,
  Fastify,
  Mongodb,
  Mysql,
  Nest,
  Node,
  Postgres,
} from "../../public/backend";
import {
  Aws,
  Docker,
  Gcp,
  Git,
  Jenkins,
  Kube,
  CircleCI,
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
    name: "Vitest",
    component: () => <Vitest />,
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
    name: "Fastify",
    component: () => <Fastify />,
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
    name: "CircleCI",
    component: () => <CircleCI />,
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
