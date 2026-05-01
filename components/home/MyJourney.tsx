"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, ChevronRight, Drama, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import RadialOrbitalTimeline, {
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline";
import portfolioData from "@/data/portfolio.json";
import type { Experience, ExperienceKind } from "@/data/types";
import { useMemo } from "react";

function orbitRingForExperience(exp: Experience): ExperienceKind {
  switch (exp.type) {
    case "club":
      return "club";
    case "dance":
      return "dance";
    case "work":
    case undefined:
      return "work";
    default: {
      const _never: never = exp.type;
      return _never;
    }
  }
}

function iconForExperience(exp: Experience) {
  switch (exp.type) {
    case "club":
      return Users;
    case "dance":
      return Drama;
    case "work":
    case undefined:
      return Briefcase;
    default: {
      const _never: never = exp.type;
      return _never;
    }
  }
}

function buildTimelineItems(experiences: Experience[]): TimelineItem[] {
  return experiences.map((exp, index) => {
    const id = index + 1;

    return {
      id,
      title: exp.title,
      company: exp.company,
      orbitLabel: exp.label,
      orbitLabelDate: exp.labelDate,
      date: exp.date,
      content: exp.summary,
      tech: exp.tech,
      icon: iconForExperience(exp),
      status: exp.active ? "in-progress" : "completed",
      ring: orbitRingForExperience(exp),
    };
  });
}

export function MyJourney() {
  const experiences = useMemo(() => portfolioData.experience as Experience[], []);

  const timelineData = useMemo(() => buildTimelineItems(experiences), [experiences]);

  return (
    <section
      id="recent-work-experience"
      className="overflow-x-clip py-12 px-3 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="font-heading text-2xl tracking-tight sm:text-3xl md:text-4xl">
            MY_JOURNEY
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Every node has a story in orbit. Click one to learn more.
          </p>
        </motion.div>

        <RadialOrbitalTimeline timelineData={timelineData} variant="themed" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-center mt-12 md:mt-8"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full max-w-xs transition-transform hover:scale-[1.02] sm:w-auto sm:max-w-none"
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
