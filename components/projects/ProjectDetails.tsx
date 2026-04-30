"use client";

import { motion } from "framer-motion";
import { GitHub, OpenInNew } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Project } from "@/data/types";
import { cn } from "@/lib/utils";

interface ProjectDetailsProps {
  project: Project;
  index: number;
  total: number;
}

function SectionLabel({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Broadcast-style live dot: staggered ripples + core “breathing” pulse (primary only). */
function LiveStatusDot() {
  const rippleEase = [0.22, 1, 0.36, 1] as const;
  const rippleTransition = {
    duration: 1.35,
    repeat: Infinity,
    ease: rippleEase,
    repeatDelay: 0.15,
  };

  return (
    <span className="relative grid h-3 w-3 shrink-0 place-items-center" aria-hidden>
      <motion.span
        className="absolute aspect-square w-[7px] rounded-full bg-primary"
        initial={false}
        animate={{ scale: [1, 3.2], opacity: [0.85, 0] }}
        transition={{ ...rippleTransition, delay: 0 }}
      />
      <motion.span
        className="absolute aspect-square w-[7px] rounded-full bg-primary"
        initial={false}
        animate={{ scale: [1, 3.2], opacity: [0.85, 0] }}
        transition={{ ...rippleTransition, delay: 0.55 }}
      />
      <motion.span
        className="relative z-1 block h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.95)] ring-2 ring-primary/35"
        initial={false}
        animate={{ opacity: [1, 0.35, 1], scale: [1, 0.82, 1] }}
        transition={{
          duration: 0.85,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0.05,
        }}
      />
    </span>
  );
}

export function ProjectDetails({ project, index, total }: Readonly<ProjectDetailsProps>) {
  const ref = String(total - index).padStart(3, "0");
  const totalLabel = String(total).padStart(3, "0");
  const techCategories = Object.entries(project.tech);
  const techCount = techCategories.reduce((sum, [, techs]) => sum + techs.length, 0);
  const isLive = Boolean(project.link);

  return (
    <motion.article
      key={project.title}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
      className="group/widget relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)]"
    >
      {/* Color glow tied to project */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: project.colour }}
      />

      <div className="relative flex flex-col gap-7 p-6 md:p-8">
        {/* Top meta strip */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full ring-2 ring-background"
              style={{ backgroundColor: project.colour }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              proj_ref: #{ref} <span className="opacity-50">/ {totalLabel}</span>
            </span>
          </div>

          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ring-1 ring-inset",
              isLive
                ? "border-primary/40 bg-primary/5 text-primary ring-primary/15"
                : "border-border text-muted-foreground ring-transparent",
            )}
          >
            {isLive ? (
              <LiveStatusDot />
            ) : (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
            )}
            <span className={cn(isLive && "font-semibold tracking-[0.12em]")}>
              {isLive ? "Live" : "Source available"}
            </span>
          </span>
        </div>

        {/* Title + actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 space-y-2">
            <SectionLabel>[build_id]</SectionLabel>
            <h2
              className="text-3xl font-bold uppercase leading-tight tracking-tighter md:text-4xl lg:text-5xl"
              style={{ color: project.colour }}
            >
              {project.title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.source && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="font-mono text-[11px] uppercase tracking-[0.2em]"
              >
                <a href={project.source} target="_blank" rel="noopener noreferrer">
                  <GitHub className="mr-2 h-3.5 w-3.5" />
                  Source
                </a>
              </Button>
            )}
            {project.link && (
              <Button
                size="sm"
                asChild
                className="font-mono text-[11px] uppercase tracking-[0.2em]"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <OpenInNew className="mr-2 h-3.5 w-3.5" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Op log meta strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border border-border/60 bg-muted/30 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="text-primary/70">{"// build_log"}</span>
          <span>{techCount} libs</span>
          <span>{techCategories.length} stacks</span>
          <span>{project.features.length} capabilities</span>
        </div>

        {/* Overview */}
        <section className="space-y-3">
          <SectionLabel>[overview]</SectionLabel>
          <p className="text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </section>

        {/* Stack matrix */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <SectionLabel>[runtime_stack]</SectionLabel>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {techCount} units
            </span>
          </div>

          <div className="space-y-3">
            {techCategories.map(([category, techs], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 + categoryIndex * 0.05,
                }}
                className="grid gap-2 rounded-lg border border-border/70 bg-background/40 p-3 sm:grid-cols-[180px_1fr] sm:items-center sm:gap-4"
              >
                <p
                  className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: project.colour }}
                >
                  {category.trim()}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-border bg-card px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="space-y-3">
          <SectionLabel>[capabilities]</SectionLabel>
          <ul className="space-y-2.5">
            {project.features.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.04 }}
                className="flex gap-3"
              >
                <span
                  className="mt-[3px] shrink-0 font-mono text-[11px] tracking-tight"
                  style={{ color: project.colour }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Footer rail */}
        <div className="flex items-center justify-between border-t border-border/60 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          <span>[end_of_record]</span>
          <span>{project.title.toLowerCase().replaceAll(/\s+/g, "_")}.build</span>
        </div>
      </div>
    </motion.article>
  );
}
