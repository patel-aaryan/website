"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "@mui/icons-material";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { ProjectsPartnerCta } from "@/components/projects/ProjectsPartnerCta";
import { ProjectsSidebar } from "@/components/projects/ProjectsSidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import portfolioData from "@/data/portfolio.json";
import { Project } from "@/data/types";

export default function ProjectsPage() {
  const projects = portfolioData.projects as unknown as Project[];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const selectedProject = projects[selectedIndex];

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setIsSheetOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-background">
      {/* Background decals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-primary">
            [build_archive]
          </p>
          <h1 className="mb-4 text-5xl font-bold uppercase tracking-tighter md:text-6xl lg:text-7xl">
            Project Catalog
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            A curated index of personal builds and shipped products — spanning full-stack
            platforms, AI experiments, and developer tooling. Select an entry to inspect the
            stack and feature set.
          </p>

          {/* Mobile sheet trigger */}
          <div className="mt-6 lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-mono text-[11px] uppercase tracking-[0.2em]"
                >
                  <Menu className="mr-2 h-4 w-4" />
                  Browse Index ({projects.length})
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[320px] overflow-y-auto sm:w-[400px]"
              >
                <SheetHeader>
                  <SheetTitle className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                    [build_archive]
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <ProjectsSidebar
                    projects={projects}
                    selectedIndex={selectedIndex}
                    onSelect={handleSelect}
                    embedded
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>

        {/* Master / detail */}
        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12">
          {/* Sidebar (master) */}
          <aside className="hidden lg:col-span-5 lg:block xl:col-span-4">
            <div className="sticky top-24">
              <ProjectsSidebar
                projects={projects}
                selectedIndex={selectedIndex}
                onSelect={handleSelect}
              />
            </div>
          </aside>

          {/* Details (detail) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              <ProjectDetails
                key={selectedProject.title}
                project={selectedProject}
                index={selectedIndex}
                total={projects.length}
              />
            </AnimatePresence>
          </div>
        </div>

        <ProjectsPartnerCta className="mt-12 md:mt-16" />
      </div>
    </main>
  );
}
