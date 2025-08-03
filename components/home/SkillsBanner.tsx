"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Code, Web, Storage, Cloud } from "@mui/icons-material";
import portfolioData from "@/data/portfolio.json";

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
            Technologies I use to build scalable, high-performance systems
          </p>
        </motion.div>

        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-sm border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}
                >
                  <category.icon className={`h-5 w-5 ${category.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-default"
                  >
                    <Badge
                      variant="secondary"
                      className={`${category.color} hover:shadow-md transition-all duration-200 px-3 py-1.5 text-sm font-medium`}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional: Add a subtle animation for continuous engagement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            Always learning • Always evolving • Always building
          </p>
        </motion.div>
      </div>
    </section>
  );
}
