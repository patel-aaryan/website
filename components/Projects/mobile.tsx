import React from "react";

interface ProjectMobileProps {
  projectList: {
    title: string;
    description: string;
    tech: string[];
    colour: string;
    link: string;
  }[];
}

function ProjectsMobile({ projectList }: ProjectMobileProps) {
  return <div></div>;
}

export default ProjectsMobile;
