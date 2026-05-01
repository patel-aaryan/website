"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BarChart, EmojiEvents, GitHub, OpenInNew, ChevronRight } from "@mui/icons-material";
import portfolioData from "@/data/portfolio.json";
import type { FeaturedProject, FeaturedProjectLiveLog } from "@/data/types";

const SMALL_PROJECT_INDICES = [4, 5, 6, 7];

function resolveLiveLog(project: FeaturedProject): FeaturedProjectLiveLog {
  if (project.liveLog) {
    return project.liveLog;
  }
  if (project.stats?.length) {
    return {
      header: "PERFORMANCE_LOG_01",
      metrics: project.stats.map((s) => ({
        key: s.label.replaceAll(/\s+/g, "_").toUpperCase(),
        value: s.value,
      })),
    };
  }
  return {
    header: "LIVE_ENDPOINT_01",
    metrics: [{ key: "STATUS", value: "LIVE" }],
  };
}

export function FeaturedProjects() {
  const [main, side, medium] = portfolioData.featuredProjects as FeaturedProject[];
  const smallProjects = SMALL_PROJECT_INDICES.map((i) => portfolioData.projects[i]);
  const mainLiveLog = resolveLiveLog(main);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-2"
        >
          <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
            FEATURED_PROJECTS
          </h2>

          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            [SELECTED_WORK] — FULL-STACK DEVELOPMENT, AI/ML, AND CLOUD TECHNOLOGIES
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:items-stretch gap-6">
          {/* Featured card — 4 cols */}
          <motion.div
            className="flex h-full min-h-0 flex-col md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="flex min-h-0 flex-1 flex-col gap-0 py-0 justify-between group hover:-translate-y-1 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-[0.06] group-hover:opacity-[0.11] transition-opacity pointer-events-none select-none">
                <Image
                  src="/arkin.png"
                  alt=""
                  width={360}
                  height={360}
                  className="h-28 w-auto object-contain object-right sm:h-36 md:h-40"
                  priority={false}
                />
              </div>
              <CardContent className="flex min-h-0 flex-1 flex-col gap-5 p-7 sm:p-8">
                <div className="flex justify-between items-start">
                  <Badge
                    variant="outline"
                    className="rounded-md text-[10px] uppercase tracking-widest border-primary/30 text-primary bg-primary/5"
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
                  </div>
                </div>

                <div className="min-w-0 w-full max-w-2xl md:max-w-3xl xl:max-w-4xl">
                  <h3 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {main.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{main.description}</p>
                </div>

                {main.stats && main.stats.length >= 2 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                    {main.stats.slice(0, 2).map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-muted/40 p-3.5 rounded-lg border border-border/50"
                      >
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                          {stat.label}
                        </p>
                        <p className="text-lg font-bold font-mono text-primary tabular-nums">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {(main.tech?.length ?? 0) > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {(main.tech ?? []).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="rounded-md text-xs uppercase font-mono"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                ) : null}

                {main.link ? (
                  <div className="w-full min-w-0 max-w-2xl md:max-w-3xl xl:max-w-4xl rounded-xl border border-border/50 bg-neutral-950 px-5 py-4 ring-1 ring-inset ring-white/10 dark:ring-white/5">
                    <div className="flex flex-col gap-2.5 font-mono text-[11px] uppercase tracking-tight sm:text-xs">
                      <div className="flex items-center gap-2 text-primary">
                        <BarChart className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                        <span className="font-semibold tracking-wide">
                          {mainLiveLog.header}
                        </span>
                      </div>
                      <p className="normal-case tracking-normal text-neutral-400 leading-relaxed wrap-anywhere">
                        {mainLiveLog.metrics.map((m) => `${m.key}: ${m.value}`).join(" | ")}
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center gap-3 mt-auto">
                  {main.link && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={main.link} target="_blank">
                        <OpenInNew className="h-4 w-4 mr-2" />
                        Check it out
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Side card — 2 cols */}
          <motion.div
            className="flex h-full min-h-0 flex-col md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="flex min-h-0 flex-1 flex-col gap-0 py-0 justify-between group hover:-translate-y-1 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)]">
              <CardContent className="flex min-h-0 flex-1 flex-col gap-4 p-6 sm:p-7">
                <div className="flex justify-between items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <EmojiEvents className="h-7 w-7 text-primary" aria-hidden />
                  </div>
                  {side.source && (
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <Link href={side.source} target="_blank">
                        <GitHub className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                      </Link>
                    </Button>
                  )}
                </div>

                <div className="min-w-0 w-full max-w-2xl md:max-w-3xl xl:max-w-4xl">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {side.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {side.description}
                  </p>
                </div>

                {side.stats && side.stats.length >= 2 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {side.stats.slice(0, 2).map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-muted/40 p-3 rounded-lg border border-border/50"
                      >
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                          {stat.label}
                        </p>
                        <p className="text-base font-bold font-mono text-primary tabular-nums leading-tight">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-2">
                  {(side.tech ?? []).map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="rounded-md text-[10px] uppercase font-mono"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 mt-auto">
                  {side.link && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground px-0 hover:bg-transparent hover:text-foreground"
                    >
                      <Link href={side.link} target="_blank">
                        Check it out
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
            <Card className="h-full gap-0 py-0 group hover:-translate-y-1 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)]">
              <CardContent className="flex flex-col gap-4 p-6 sm:p-7 h-full">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    Service Healthy
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-bold min-w-0 pr-2 leading-tight group-hover:text-primary transition-colors">
                    {medium.title}
                  </h3>
                  <div className="flex shrink-0 gap-1">
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
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {medium.description}
                </p>

                {(medium.stats && medium.stats.length >= 2) ||
                (medium.tech?.length ?? 0) > 0 ? (
                  <div className="mt-auto flex flex-col gap-4">
                    {medium.stats && medium.stats.length >= 2 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {medium.stats.slice(0, 2).map((stat) => (
                          <div
                            key={stat.label}
                            className="bg-muted/40 p-3.5 rounded-lg border border-border/50"
                          >
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                              {stat.label}
                            </p>
                            <p className="text-lg font-bold font-mono text-primary tabular-nums">
                              {stat.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {(medium.tech?.length ?? 0) > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {(medium.tech ?? []).map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="rounded-md text-[10px] uppercase font-mono"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
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
                <Card className="h-full gap-0 py-0 group hover:-translate-y-1 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.08)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <CardContent className="flex min-h-0 flex-col gap-3 px-6 py-4 sm:py-5 h-full">
                    <h4 className="font-bold text-sm shrink-0">{project.title}</h4>
                    <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-3 min-h-0 min-w-0 overflow-hidden wrap-anywhere">
                      {project.description}
                    </p>
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
