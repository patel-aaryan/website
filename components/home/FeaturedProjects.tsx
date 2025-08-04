import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { GitHub, ChevronRight } from "@mui/icons-material";
import portfolioData from "@/data/portfolio.json";

export function FeaturedProjects() {
  const featuredProjects = portfolioData.featuredProjects;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work in full-stack development, AI/ML, and
            cloud technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Top section: dot, title, and icons */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: project.colour }}
                      />
                      {project.link ? (
                        <Link href={project.link} target="_blank">
                          <h3 className="text-xl font-semibold underline hover:text-blue-400 transition-colors cursor-pointer">
                            {project.title}
                          </h3>
                        </Link>
                      ) : (
                        <h3 className="text-xl font-semibold">
                          {project.title}
                        </h3>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={project.source} target="_blank">
                          <span className="text-sm">Source</span>
                          <GitHub className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Center section: description */}
                  <div className="flex-1 flex items-center">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom section: tech stack */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/projects">
              View All Projects
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
