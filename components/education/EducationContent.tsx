import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LocationOn,
  CalendarToday,
  School,
  Code,
  Groups,
  EmojiEvents,
  Link as LinkIcon,
} from "@mui/icons-material";
import portfolioData from "@/data/portfolio.json";

export function EducationContent() {
  const education = portfolioData.education[0];

  return (
    <div className="flex-1">
      <div className="space-y-12">
        {/* Overview Section */}
        <motion.section
          id="overview"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ margin: "-10%" }}
        >
          <Card className="hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <School className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">University Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className="h-2 rounded-full"
                style={{ backgroundColor: education.colour }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{education.name}</h3>
                    <p className="text-primary font-medium">
                      {education.major}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <LocationOn className="h-4 w-4" />
                      {education.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarToday className="h-4 w-4" />
                      {education.date}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Quick Stats</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Courses</p>
                        <p className="font-semibold">
                          {education.courses.length}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Activities</p>
                        <p className="font-semibold">
                          {education.clubs.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Courses Section */}
        <motion.section
          id="courses"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ margin: "-10%" }}
        >
          <Card className="hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Code className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">
                  Computer Science Coursework
                </CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Core computer science courses with detailed learning outcomes
              </p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {education.courses.map((course) => (
                  <AccordionItem key={course.code} value={course.code}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-4 text-left">
                        <div
                          className="w-2 h-8 rounded-full flex-shrink-0"
                          style={{ backgroundColor: education.colour }}
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant="outline"
                              className="font-mono text-xs"
                            >
                              {course.code}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-base">
                            {course.name}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="ml-6 space-y-3"
                      >
                        {course.desc.map((description, descIndex) => (
                          <motion.div
                            key={descIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: descIndex * 0.05,
                            }}
                            className="flex items-start gap-3 group"
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: education.colour }}
                            />
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {description}
                            </p>
                          </motion.div>
                        ))}

                        {course.link && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="mt-4"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="text-xs"
                            >
                              <a
                                href={course.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                <LinkIcon className="h-3 w-3" />
                                Course Details
                              </a>
                            </Button>
                          </motion.div>
                        )}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.section>

        {/* Activities Section */}
        <motion.section
          id="activities"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ margin: "-10%" }}
        >
          <Card className="hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Groups className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">
                  Extracurricular Activities
                </CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Campus involvement and leadership experiences
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {education.clubs.map((club, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ margin: "-10%" }}
                    className="p-4 rounded-lg border hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-8 rounded-full"
                          style={{ backgroundColor: education.colour }}
                        />
                        <div>
                          <h3 className="font-semibold text-lg">
                            {club.title}
                          </h3>
                          <p className="text-primary font-medium">
                            {club.role}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {club.date}
                      </Badge>
                    </div>

                    {club.desc && club.desc.length > 0 && (
                      <div className="space-y-2">
                        {club.desc.map((description, descIndex) => (
                          <div
                            key={descIndex}
                            className="flex items-start gap-3"
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: education.colour }}
                            />
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          id="achievements"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ margin: "-10%" }}
        >
          <Card className="hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <EmojiEvents className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">
                  Academic Achievements
                </CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Recognition and honors received during studies
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {education.milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ margin: "-10%" }}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-md transition-all duration-200 group"
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: education.colour }}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{milestone}</p>
                    </div>
                    <EmojiEvents className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
