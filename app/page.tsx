"use client";

import {
  HeroSection,
  QuickHighlights,
  FeaturedProjects,
  CurrentStatus,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickHighlights />
      <FeaturedProjects />
      <CurrentStatus />
    </>
  );
}
