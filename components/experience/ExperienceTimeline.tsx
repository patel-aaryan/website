"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LocationOn } from "@mui/icons-material";
import portfolioData from "@/data/portfolio.json";
import type { Experience } from "@/data/types";
import { cn } from "@/lib/utils";

interface YearBlockProps {
  date: string;
  alignRight?: boolean;
}

function YearBlock({ date, alignRight }: Readonly<YearBlockProps>) {
  return (
    <div className={cn("space-y-1", alignRight && "md:text-right")}>
      <p className="font-mono text-xl md:text-2xl lg:text-3xl font-bold leading-none tracking-tight text-muted-foreground/25">
        {date}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
        Operational Window
      </p>
    </div>
  );
}

interface ExperienceCardProps {
  exp: Experience;
  index: number;
}

function ExperienceCard({ exp, index }: Readonly<ExperienceCardProps>) {
  const ref = String(index + 1).padStart(3, "0");
  const active = exp.active ?? false;

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)]">
      <CardContent className="flex flex-col gap-5 p-4 sm:p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Op_Ref: #{ref}
            </p>
            <h3 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              {exp.title}
            </h3>
            <p
              className="font-mono text-sm uppercase tracking-wider"
              style={{ color: exp.colour }}
            >
              {exp.company}
            </p>
          </div>

          <Badge
            variant="outline"
            className={cn(
              "shrink-0 gap-1.5 font-mono text-[10px] uppercase tracking-widest",
              active
                ? "border-primary/40 bg-primary/5 text-primary"
                : "border-border text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                active
                  ? "bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.7)]"
                  : "bg-muted-foreground/40",
              )}
            />
            {active ? "Active" : "Completed"}
          </Badge>
        </div>

        {/* Op log meta strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border border-border/60 bg-muted/30 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="text-primary/70">{"// op_log"}</span>
          <span className="flex items-center gap-1">
            <LocationOn className="h-3 w-3" />
            {exp.location}
          </span>
          <span className="md:hidden">{exp.date}</span>
        </div>

        {/* Achievements as numbered log entries */}
        <ul className="space-y-2.5">
          {exp.description.map((desc, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.05 }}
              className="flex gap-3"
            >
              <span className="mt-[3px] shrink-0 font-mono text-[11px] tracking-tight text-primary/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/85">
                {desc}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Tech */}
        {exp.tech?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {exp.tech.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="font-mono text-[10px] uppercase tracking-wider"
              >
                {t}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ExperienceTimeline() {
  const experiences = portfolioData.experience as Experience[];

  return (
    <section>
      <div className="relative">
        {/* Timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="pointer-events-none absolute bottom-0 left-4 top-0 z-0 w-px origin-top bg-border md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-14 md:space-y-24">
          {experiences.map((exp, i) => {
            const cardOnLeft = i % 2 === 1;

            return (
              <div
                key={`${exp.company}-${exp.title}-${i}`}
                className="relative flex flex-col md:flex-row md:items-start"
              >
                {/* Year side (desktop only) */}
                <div
                  className={cn(
                    "hidden md:flex md:w-1/2 md:pt-6",
                    cardOnLeft
                      ? "md:order-2 md:justify-start md:pl-16"
                      : "md:order-1 md:justify-end md:pr-16",
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, x: cardOnLeft ? 16 : -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <YearBlock date={exp.date} alignRight={!cardOnLeft} />
                  </motion.div>
                </div>

                {/* Card side */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.55 }}
                  className={cn(
                    "pl-12 md:w-1/2 md:pl-0",
                    cardOnLeft ? "md:order-1 md:pr-16" : "md:order-2 md:pl-16",
                  )}
                >
                  <ExperienceCard exp={exp} index={i} />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* End-of-timeline marker */}
        <div className="relative h-4 w-full shrink-0">
          <div className="absolute left-4 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
            <div className="h-3 w-3 rotate-45 border border-border bg-background" />
          </div>
        </div>
      </div>

      <p className="ml-12 mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 md:ml-0 md:text-center">
        [end_of_timeline]
      </p>
    </section>
  );
}
