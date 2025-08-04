"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { EducationSidebar, EducationContent } from "@/components/education";
import portfolioData from "@/data/portfolio.json";

export default function EducationPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const education = portfolioData.education[0]; // University of Waterloo

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
    );

    const sections = ["overview", "courses", "activities", "achievements"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
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
            <h1 className="text-2xl sm:text-3xl font-bold">Education</h1>
            <p className="text-sm text-muted-foreground">
              Academic journey and achievements at {education.name}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          <EducationSidebar
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />

          <EducationContent />
        </div>
      </div>
    </div>
  );
}
