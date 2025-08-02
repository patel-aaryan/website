import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { OpenInNew, LocationOn, BusinessCenter } from "@mui/icons-material";
import portfolioData from "@/data/portfolio.json";

export function RecentWorkExperience() {
  const recentExperience = portfolioData.experience.slice(0, 3);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Recent Work Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional journey across leading tech companies and innovative
            startups, building scalable solutions and impactful software
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 origin-left hidden lg:block"
          />

          {/* Timeline Items */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 lg:justify-between">
            {recentExperience.map((experience, index) => (
              <motion.div
                key={`${experience.company}-${experience.title}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex-1 lg:max-w-sm relative"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.6 }}
                  className="absolute top-16 left-1/2 transform -translate-x-1/2 lg:block hidden"
                >
                  <div
                    className="w-4 h-4 rounded-full border-4 border-background shadow-lg"
                    style={{ backgroundColor: experience.colour }}
                  />
                </motion.div>

                {/* Experience Card */}
                <Card className="hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-2">
                  <CardContent className="px-6 py-2">
                    {/* Header */}
                    <div className="flex items-center justify-center mb-4">
                      <div
                        className="w-3 h-3 rounded-full lg:hidden"
                        style={{ backgroundColor: experience.colour }}
                      />
                      <BusinessCenter
                        className="h-5 w-5 text-muted-foreground"
                        style={{ color: experience.colour }}
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="text-center">
                        <h3 className="text-lg font-bold leading-tight mb-2">
                          {experience.title}
                        </h3>
                        <p className="text-base font-semibold text-primary mb-1">
                          {experience.company}
                        </p>
                        <div className="flex items-center justify-center text-xs text-muted-foreground mb-1">
                          <LocationOn className="h-3 w-3 mr-1" />
                          {experience.location}
                        </div>
                        <p className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted/50 rounded-full inline-block">
                          {experience.date}
                        </p>
                      </div>

                      {/* Key Highlights */}
                      <div className="pt-2">
                        {/* Accordion for all achievements */}
                        {experience.description.length > 0 && (
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem
                              value="achievements"
                              className="border-none"
                            >
                              <AccordionTrigger className="text-xs text-muted-foreground/80 hover:text-muted-foreground hover:bg-muted/30 hover:scale-110 py-2 px-3 font-medium items-center gap-1 justify-center rounded-xl transition-all duration-200 cursor-pointer" />
                              <AccordionContent className="pt-2 pb-0">
                                <div className="space-y-2">
                                  {experience.description.map((desc, idx) => (
                                    <p
                                      key={idx}
                                      className="text-xs text-muted-foreground leading-relaxed text-left"
                                    >
                                      &bull; {desc}
                                    </p>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Connection Line for Mobile */}
                {index < recentExperience.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                    className="lg:hidden w-0.5 h-8 bg-gradient-to-b from-primary to-primary/50 mx-auto mt-4 origin-top"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="hover:scale-105 transition-transform"
          >
            <Link href="/experience">
              View All Experiences
              <OpenInNew className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
