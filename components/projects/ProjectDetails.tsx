"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OpenInNew, GitHub } from "@mui/icons-material";
import { Project } from "@/data/types";

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: project.colour }}
              />
              <h1 className="text-xl sm:text-2xl font-bold">{project.title}</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.source && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:scale-105 transition-transform"
                >
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-4 h-4 mr-2" />
                    Source
                  </a>
                </Button>
              )}

              {project.link && (
                <Button
                  size="sm"
                  asChild
                  className="hover:scale-105 transition-transform"
                  style={{ backgroundColor: project.colour }}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <OpenInNew className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-3">About This Project</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          <Separator />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Technologies and Features */}
            <div className="space-y-6">
              {/* Technologies */}
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Technologies Used
                </h2>
                <div className="space-y-4">
                  {Object.entries(project.tech).map(
                    ([category, techs], categoryIndex) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: categoryIndex * 0.1,
                        }}
                      >
                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                          {category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {techs.map((tech, techIndex) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.2,
                                delay:
                                  (categoryIndex * techs.length + techIndex) *
                                  0.05,
                              }}
                            >
                              <Badge
                                variant="secondary"
                                className="px-3 py-1 text-sm font-medium hover:scale-105 transition-transform"
                                style={{ color: project.colour }}
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              </div>

              {/* Project Features/Highlights */}
              <div>
                <h2 className="text-lg font-semibold mb-3">Key Features</h2>
                <div className="space-y-2">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: project.colour }}
                      />
                      <p className="text-sm text-muted-foreground">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Thumbnail/Preview */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Project Preview</h2>
              <Card className="border-dashed">
                <CardContent className="p-4">
                  {project.thumbnail ? (
                    <motion.img
                      src={project.thumbnail}
                      alt={`${project.title} preview`}
                      className="w-full h-64 object-cover rounded-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  ) : (
                    <div className="w-full h-64 bg-muted rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <div
                          className="w-12 h-12 rounded-full mx-auto mb-2"
                          style={{ backgroundColor: project.colour }}
                        />
                        <p className="text-sm text-muted-foreground">
                          Preview Coming Soon
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
