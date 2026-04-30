"use client";

import { motion } from "framer-motion";
import { ExperienceTimeline } from "@/components/experience";

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Background decals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-3 py-16 sm:px-5 lg:px-6 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-primary">
            [DEPLOYMENT_HISTORY]
          </p>
          <h1 className="mb-4 text-5xl font-bold uppercase tracking-tighter md:text-6xl lg:text-7xl">
            Operational Timeline
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            A record of professional engagements, engineering initiatives, and the
            teams I&apos;ve shipped with — across capital markets, early stage startups,
            enterprise consulting, and clubs.
          </p>
        </motion.div>

        {/* Timeline */}
        <ExperienceTimeline />
      </div>
    </main>
  );
}
