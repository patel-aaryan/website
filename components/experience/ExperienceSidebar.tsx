"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import portfolioData from "@/data/portfolio.json";

interface ExperienceSidebarProps {
  activeExperience: string;
  onExperienceClick: (index: number) => void;
}

export function ExperienceSidebar({
  activeExperience,
  onExperienceClick,
}: ExperienceSidebarProps) {
  const experiences = portfolioData.experience;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="hidden lg:block w-64 sticky top-24 h-fit"
    >
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">
          Timeline Navigation
        </h3>
        {experiences.map((experience, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => onExperienceClick(index)}
            className={`w-full text-left p-3 rounded-lg duration-200 group h-auto justify-start ${
              activeExperience === `experience-${index}`
                ? "bg-primary/10 border-l-4 border-primary hover:bg-primary/15"
                : "hover:bg-muted/50 border-l-4 border-transparent"
            }`}
          >
            <div className="space-y-1">
              <p className="text-sm font-medium leading-tight">
                {experience.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {experience.company}
              </p>
              <p className="text-xs text-muted-foreground">{experience.date}</p>
            </div>
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
