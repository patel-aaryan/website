"use client";

import {
  Hero,
  QuickHighlights,
  SkillsBanner,
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
      <SkillsBanner />
    </>
  );
}
