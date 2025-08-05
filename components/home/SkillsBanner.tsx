"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Code, Web, Storage, Cloud } from "@mui/icons-material";
import portfolioData from "@/data/portfolio.json";
import Image from "next/image";

// SVG Icon component for loading icons from public folder
const SvgIcon = ({ src, className }: { src: string; className?: string }) => {
  return (
    <Image src={src} alt="" width={16} height={16} className={className} />
  );
};

// Skill name to icon path mapping
const skillIcons: Record<string, string> = {
  // Languages
  "C++": "/icons/languages/cpp.svg",
  "C#": "/icons/languages/cs.svg",
  Python: "/icons/languages/python.svg",
  SQL: "/icons/languages/sql.svg",
  Java: "/icons/languages/java.svg",
  TypeScript: "/icons/languages/ts.svg",
  HTML: "/icons/languages/html.svg",
  CSS: "/icons/languages/css.svg",

  // Frontend
  React: "/icons/frontend/react.svg",
  Angular: "/icons/frontend/angular.svg",
  "Next.js": "/icons/frontend/next.svg",
  "Tailwind CSS": "/icons/frontend/tailwind.svg",
  Vitest: "/icons/frontend/vitest.svg",
  Figma: "/icons/frontend/figma.svg",
  Redux: "/icons/frontend/redux.svg",
  jQuery: "/icons/frontend/jquery.svg",

  // Backend
  "ASP.NET": "/icons/backend/dotNet.svg",
  Django: "/icons/backend/django.svg",
  "Node.js": "/icons/backend/node.svg",
  "Nest.js": "/icons/backend/nest.svg",
  MySQL: "/icons/backend/mysql.svg",
  PostgreSQL: "/icons/backend/postgres.svg",
  Fastify: "/icons/backend/fastify.svg",
  MongoDB: "/icons/backend/mongodb.svg",

  // DevOps
  Git: "/icons/devops/git.svg",
  Docker: "/icons/devops/docker.svg",
  Kubernetes: "/icons/devops/kube.svg",
  Terraform: "/icons/devops/terraform.svg",
  "Google Cloud": "/icons/devops/gcp.svg",
  CircleCI: "/icons/devops/circleci.svg",
  AWS: "/icons/devops/aws.svg",
  Jenkins: "/icons/devops/jenkins.svg",
};

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    skills: portfolioData.skills.languages,
    color: "bg-blue-500/10 text-blue-600",
    iconColor: "text-blue-500",
  },
  {
    title: "Frontend",
    icon: Web,
    skills: portfolioData.skills.frontend,
    color: "bg-green-500/10 text-green-600",
    iconColor: "text-green-500",
  },
  {
    title: "Backend",
    icon: Storage,
    skills: portfolioData.skills.backend,
    color: "bg-purple-500/10 text-purple-600",
    iconColor: "text-purple-500",
  },
  {
    title: "DevOps",
    icon: Cloud,
    skills: portfolioData.skills.devops,
    color: "bg-orange-500/10 text-orange-600",
    iconColor: "text-orange-500",
  },
];

export function SkillsBanner() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
          <p className="text-muted-foreground text-lg">
            Tools and technologies I work with
          </p>
        </motion.div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {skillCategories.map((category, categoryIndex) => (
              <CarouselItem key={category.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="p-1"
                >
                  <div className="bg-card rounded-xl p-8 shadow-lg border h-full">
                    <div className="flex items-center gap-4 mb-8">
                      <div
                        className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}
                      >
                        <category.icon
                          className={`h-6 w-6 ${category.iconColor}`}
                        />
                      </div>
                      <h3 className="text-2xl font-bold">{category.title}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {category.skills.map((skill, skillIndex) => {
                        const iconPath = skillIcons[skill];
                        return (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: skillIndex * 0.05,
                            }}
                            whileHover={{ scale: 1.05 }}
                            className="cursor-default"
                          >
                            <Badge
                              variant="secondary"
                              className={`${category.color} hover:shadow-md transition-all duration-200 px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-medium flex items-center gap-2 sm:gap-4 w-full justify-start`}
                            >
                              {iconPath && (
                                <SvgIcon
                                  src={iconPath}
                                  className="h-6 w-6 sm:h-8 sm:w-8"
                                />
                              )}
                              {skill}
                            </Badge>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>

        {/* Dot indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-2 mt-8 mb-4"
        >
          {skillCategories.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to ${skillCategories[index].title} skills`}
            />
          ))}
        </motion.div>

        {/* Optional: Add a subtle animation for continuous engagement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            Always learning • Always evolving • Always building
          </p>
        </motion.div>
      </div>
    </section>
  );
}
