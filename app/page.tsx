"use client";

import {
  HeroSection,
  QuickHighlights,
  SkillsBanner,
  FeaturedProjects,
  RecentWorkExperience,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickHighlights />
      <RecentWorkExperience />
      <FeaturedProjects />
      <SkillsBanner />
    </>
  );
}
