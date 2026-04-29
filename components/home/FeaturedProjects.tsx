"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { GitHub, OpenInNew, ChevronRight } from "@mui/icons-material";
import portfolioData from "@/data/portfolio.json";

const SMALL_PROJECT_INDICES = [4, 5, 6, 7];

export function FeaturedProjects() {
  const [main, side, medium] = portfolioData.featuredProjects;
  const smallProjects = SMALL_PROJECT_INDICES.map((i) => portfolioData.projects[i]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-3 uppercase">
            Featured Projects
          </h2>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            [SELECTED_WORK] — FULL-STACK DEVELOPMENT, AI/ML, AND CLOUD TECHNOLOGIES
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Featured card — 4 cols */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none select-none">
                <span className="text-9xl font-bold text-foreground">AI</span>
              </div>
              <CardContent className="p-8 flex flex-col gap-6 h-full">
                <div className="flex justify-between items-start">
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase tracking-widest border-primary/30 text-primary bg-primary/5"
                  >
                    Active Node
                  </Badge>
                  <div className="flex gap-2">
                    {main.source && (
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                        <Link href={main.source} target="_blank">
                          <GitHub className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </Link>
                      </Button>
                    )}
                    {main.link && (
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                        <Link href={main.link} target="_blank">
                          <OpenInNew className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {main.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-lg">
                    {main.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {main.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs uppercase font-mono"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="bg-muted/40 rounded-lg p-4 font-mono text-[11px] text-muted-foreground border border-border/50">
                  <p className="text-primary/70 mb-1 text-[10px] uppercase tracking-wider">
                    // system_log
                  </p>
                  <p>
                    FEATURES: {main.features.length} modules &nbsp;|&nbsp; STACK:{" "}
                    {main.tech.slice(0, 2).join(" + ")} &nbsp;|&nbsp; STATUS: Open Source
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  {main.source && (
                    <Button asChild size="sm">
                      <Link href={main.source} target="_blank">
                        <GitHub className="h-4 w-4 mr-2" />
                        View Source
                      </Link>
                    </Button>
                  )}
                  {main.link && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={main.link} target="_blank">
                        <OpenInNew className="h-4 w-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Side card — 2 cols */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)]">
              <CardContent className="p-6 flex flex-col gap-4 h-full">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="font-bold text-primary text-sm font-mono">
                    {side.title.slice(0, 2).toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">{side.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {side.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {side.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-[10px] uppercase font-mono"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 mt-auto">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Key Features</span>
                    <span className="text-primary font-mono">
                      {side.features.length} modules
                    </span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(side.features.length / 6) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {side.source && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-xs text-primary px-0 hover:bg-transparent hover:underline"
                    >
                      <Link href={side.source} target="_blank">
                        Explore Source
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  )}
                  {side.link && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground px-0 hover:bg-transparent hover:text-foreground"
                    >
                      <Link href={side.link} target="_blank">
                        Live Demo
                        <OpenInNew className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Medium card — 3 cols */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full group hover:-translate-y-1 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)]">
              <CardContent className="p-8 flex flex-col gap-4 h-full">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    Service Healthy
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3">{medium.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {medium.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/40 p-3 rounded border border-border/50">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1 tracking-wider">
                      Tech Stack
                    </p>
                    <p className="text-lg font-bold font-mono text-foreground">
                      {medium.tech.length} libs
                    </p>
                  </div>
                  <div className="bg-muted/40 p-3 rounded border border-border/50">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1 tracking-wider">
                      Features
                    </p>
                    <p className="text-lg font-bold font-mono text-foreground">
                      {medium.features.length} core
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {medium.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-[10px] uppercase font-mono"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  {medium.source && (
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                      <Link href={medium.source} target="_blank">
                        <GitHub className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </Link>
                    </Button>
                  )}
                  {medium.link && (
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                      <Link href={medium.link} target="_blank">
                        <OpenInNew className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Small cards 2×2 — 3 cols */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {smallProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
              >
                <Card className="h-full group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.08)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <CardContent className="p-6 flex flex-col gap-3 h-full">
                    <h4 className="font-bold text-sm">{project.title}</h4>
                    <p className="text-[12px] text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.mainTech.slice(0, 2).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-[10px] uppercase font-mono px-1.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
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
