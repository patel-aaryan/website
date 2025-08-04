"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectsSidebar } from "@/components/projects/ProjectsSidebar";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "@mui/icons-material";
import portfolioData from "@/data/portfolio.json";
import { Project } from "@/data/types";

export default function ProjectsPage() {
  const projects = portfolioData.projects as unknown as Project[];
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setIsSheetOpen(false); // Close mobile sheet when project is selected
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-foreground">Projects</h1>

            {/* Mobile Menu Button */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden hover:scale-105 transition-transform"
                >
                  <Menu className="h-4 w-4 mr-2" />
                  Browse Projects
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>All Projects</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <ProjectsSidebar
                    projects={projects}
                    selectedProject={selectedProject}
                    onProjectSelect={handleProjectSelect}
                    isMobile={true}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <p className="text-muted-foreground text-lg">
            Explore my collection of projects spanning web development, AI,
            mobile apps, and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <ProjectsSidebar
              projects={projects}
              selectedProject={selectedProject}
              onProjectSelect={setSelectedProject}
            />
          </div>

          {/* Project Details - Full width on mobile, 3/4 width on desktop */}
          <div className="lg:col-span-3">
            <ProjectDetails project={selectedProject} />
          </div>
        </div>
      </div>
    </div>
  );
}
