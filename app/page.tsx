"use client";

import {
  HeroSection,
  QuickHighlights,
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
    </>
  );
}
