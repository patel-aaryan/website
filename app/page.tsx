"use client";

import {
  Hero,
  QuickHighlights,
  SkillsTerminals,
  FeaturedProjects,
  MyJourney,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickHighlights />
      <MyJourney />
      <FeaturedProjects />
      <SkillsTerminals />
    </>
  );
}
