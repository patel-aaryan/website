"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Project } from "@/data/types";

interface ProjectsSidebarProps {
  projects: Project[];
  selectedProject: Project;
  onProjectSelect: (project: Project) => void;
}

export function ProjectsSidebar({
  projects,
  selectedProject,
  onProjectSelect,
}: ProjectsSidebarProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">All Projects</h2>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-3 p-1">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedProject.title === project.title
                      ? "ring-2 ring-primary bg-accent"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => onProjectSelect(project)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm leading-tight">
                        {project.title}
                      </h3>
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0 ml-2"
                        style={{ backgroundColor: project.colour }}
                      />
                    </div>

                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {project.mainTech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs px-1.5 py-0.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {(() => {
                        const totalTech = Object.values(project.tech).flat()
                          .length;
                        const remainingTech =
                          totalTech - project.mainTech.length;
                        return (
                          remainingTech > 0 && (
                            <Badge
                              variant="outline"
                              className="text-xs px-1.5 py-0.5"
                            >
                              +{remainingTech}
                            </Badge>
                          )
                        );
                      })()}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
