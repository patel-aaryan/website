"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ActivitiesWidget,
  AwardsWidget,
  CourseworkWidget,
  HeroWidget,
  ProgrammeWidget,
  SpecWidget,
} from "@/components/education";
import portfolioData from "@/data/portfolio.json";
import type { Education } from "@/data/types";

export default function EducationPage() {
  const ed = portfolioData.education[0] as Education;

  const { progress, termIndex } = useMemo(() => {
    const start = new Date(2022, 8, 1); // Sep 2022
    const end = new Date(2027, 5, 30); // June 2027
    const now = new Date();
    const total = end.getTime() - start.getTime();
    const elapsed = Math.max(0, Math.min(total, now.getTime() - start.getTime()));
    const p = total > 0 ? elapsed / total : 0;
    const t = Math.min(15, Math.max(1, Math.ceil(p * 15)));
    return { progress: p, termIndex: t };
  }, []);

  return (
    <main className="relative min-h-screen bg-background">
      {/* Background decals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-primary">
            [learning_stack]
          </p>
          <h1 className="mb-4 text-5xl font-bold uppercase tracking-tighter md:text-6xl lg:text-7xl">
            Academic Console
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            A live readout of coursework, leadership, and recognition compiled during my run at
            the University of Waterloo — wired up as a single-pane dashboard.
          </p>
        </motion.div>

        {/* Dashboard — top row band uses fixed row tracks for bento rhythm; below uses flexible rows */}
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="grid auto-rows-[minmax(108px,auto)] grid-cols-12 gap-3 md:auto-rows-[108px] md:gap-4">
            <HeroWidget ed={ed} progress={progress} termIndex={termIndex} />
            <ProgrammeWidget />
            <SpecWidget />
          </div>

          <div className="grid auto-rows-[minmax(108px,auto)] grid-cols-12 items-start gap-3 md:gap-4">
            <div className="col-span-12 grid min-h-0 grid-cols-1 items-stretch gap-3 md:grid-cols-12 md:gap-4">
              <ActivitiesWidget ed={ed} />
              <CourseworkWidget ed={ed} />
            </div>
            <AwardsWidget ed={ed} />
          </div>
        </div>
      </div>
    </main>
  );
}
