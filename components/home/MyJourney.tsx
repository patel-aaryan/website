"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RadialOrbitalTimeline, {
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline";
import portfolioData from "@/data/portfolio.json";
import type { Experience } from "@/data/types";
import { useMemo } from "react";

function buildTimelineItems(experiences: Experience[]): TimelineItem[] {
  return experiences.map((exp, index) => {
    const id = index + 1;

    return {
      id,
      title: exp.title,
      company: exp.company,
      orbitLabel: exp.label,
      date: exp.date,
      content: exp.summary,
      tech: exp.tech,
      icon: Briefcase,
      status: exp.active ? "in-progress" : "completed",
    };
  });
}

export function MyJourney() {
  const experiences = useMemo(() => portfolioData.experience as Experience[], []);

  const timelineData = useMemo(() => buildTimelineItems(experiences), [experiences]);

  return (
    <section id="recent-work-experience" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">MY_JOURNEY</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every role on the orbit - click a node for title, dates, tech, and a one-line
            highlight.
          </p>
        </motion.div>

        <RadialOrbitalTimeline timelineData={timelineData} variant="themed" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-14 text-center md:mt-16"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="transition-transform hover:scale-[1.02]"
          >
            <Link href="/experience">
              Full timeline and details
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
