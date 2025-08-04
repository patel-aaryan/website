"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LocationOn, BusinessCenter, CalendarToday } from "@mui/icons-material";
import portfolioData from "@/data/portfolio.json";

export function ExperienceTimeline() {
  const experiences = portfolioData.experience;

  return (
    <div className="flex-1 lg:pl-8">
      <div className="relative">
        {/* Timeline Line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 origin-top hidden sm:block"
        />

        {/* Experience Items */}
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              id={`experience-${index}`}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ margin: "-10%" }}
              className="relative pl-0 sm:pl-12"
            >
              {/* Experience Card */}
              <Card className="hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-2">
                <CardContent className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <BusinessCenter
                          className="h-5 w-5"
                          style={{ color: experience.colour }}
                        />
                        <div
                          className="w-2 h-2 rounded-full sm:hidden"
                          style={{ backgroundColor: experience.colour }}
                        />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                        {experience.title}
                      </h2>
                      <p className="text-lg font-semibold text-primary">
                        {experience.company}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <LocationOn className="h-4 w-4" />
                          {experience.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarToday className="h-4 w-4" />
                          {experience.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  {experience.tech && experience.tech.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      viewport={{}}
                      className="mb-6"
                    >
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {experience.tech.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: techIndex * 0.05,
                            }}
                            viewport={{}}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge
                              variant="secondary"
                              className="text-sm px-3 py-1 hover:bg-primary/10 transition-colors"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Key Achievements */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{}}
                    className="space-y-4"
                  >
                    <div className="space-y-3">
                      {experience.description.map((desc, descIndex) => (
                        <motion.div
                          key={descIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: descIndex * 0.1 + 0.4,
                          }}
                          viewport={{}}
                          className="flex items-start gap-3 group"
                        >
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"
                            style={{ backgroundColor: experience.colour }}
                          />
                          <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                            {desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
