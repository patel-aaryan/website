"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectsSidebar } from "@/components/projects/ProjectsSidebar";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import portfolioData from "@/data/portfolio.json";
import { Project } from "@/data/types";

export default function ProjectsPage() {
  const projects = portfolioData.projects as unknown as Project[];
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Projects</h1>
          <p className="text-muted-foreground text-lg">
            Explore my collection of projects spanning web development, AI,
            mobile apps, and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ProjectsSidebar
              projects={projects}
              selectedProject={selectedProject}
              onProjectSelect={setSelectedProject}
            />
          </div>

          <div className="lg:col-span-3">
            <ProjectDetails project={selectedProject} />
          </div>
        </div>
      </div>
    </div>
  );
}
