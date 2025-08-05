"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ExperienceSidebar, ExperienceTimeline } from "@/components/experience";
import portfolioData from "@/data/portfolio.json";

export default function ExperiencePage() {
  const [activeExperience, setActiveExperience] = useState<string>("");
  const experiences = portfolioData.experience;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveExperience(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
    );

    experiences.forEach((_, index) => {
      const element = document.getElementById(`experience-${index}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [experiences]);

  const scrollToExperience = (index: number) => {
    const element = document.getElementById(`experience-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold">Work Experience</h1>
            <p className="text-sm text-muted-foreground">
              Professional journey across {experiences.length} companies
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 min-w-0">
          <ExperienceSidebar
            activeExperience={activeExperience}
            onExperienceClick={scrollToExperience}
          />

          <div className="flex-1 min-w-0">
            <ExperienceTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}
