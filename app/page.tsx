"use client";

import {
  HeroSection,
  QuickHighlights,
  FeaturedProjects,
  CurrentStatus,
} from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <QuickHighlights />
      <FeaturedProjects />
      <CurrentStatus />
    </div>
  );
}
