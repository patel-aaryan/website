"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Project } from "@/data/types";
import { cn } from "@/lib/utils";

interface ProjectsSidebarProps {
  projects: Project[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  embedded?: boolean;
}

export function ProjectsSidebar({
  projects,
  selectedIndex,
  onSelect,
  embedded = false,
}: Readonly<ProjectsSidebarProps>) {
  const list = (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-1 pb-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          [index]
        </p>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {projects.length} builds
        </span>
      </div>

      <ScrollArea className="h-[calc(100vh-220px)]">
        <ol className="space-y-2 pr-2">
          {projects.map((project, index) => {
            const ref = String(index + 1).padStart(3, "0");
            const isActive = index === selectedIndex;

            return (
              <motion.li
                key={project.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  className={cn(
                    "group/entry relative w-full overflow-hidden rounded-lg border bg-background/40 p-3 text-left transition-all duration-200",
                    isActive
                      ? "border-primary/50 bg-primary/5 shadow-[0_0_20px_hsl(var(--primary)/0.08)]"
                      : "border-border hover:border-primary/30 hover:bg-card/60",
                  )}
                >
                  {/* Active rail */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-0 h-full w-0.5 transition-all duration-200",
                      isActive
                        ? "w-1 bg-primary"
                        : "bg-transparent group-hover/entry:bg-primary/40",
                    )}
                  />

                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span
                          className={cn(
                            "font-mono text-[10px] uppercase tracking-[0.2em]",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground/70",
                          )}
                        >
                          #{ref}
                        </span>
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: project.colour }}
                        />
                        {project.link && (
                          <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                            · live
                          </span>
                        )}
                      </div>
                      <h3
                        className={cn(
                          "truncate text-sm font-semibold leading-tight tracking-tight",
                          isActive
                            ? "text-foreground"
                            : "text-foreground/90 group-hover/entry:text-foreground",
                        )}
                      >
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.mainTech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={cn(
                          "rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                          isActive
                            ? "border-primary/30 bg-primary/5 text-primary/90"
                            : "border-border/70 bg-muted/40 text-muted-foreground",
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ol>
      </ScrollArea>
    </div>
  );

  if (embedded) {
    return list;
  }

  return (
    <div className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur-sm">
      {list}
    </div>
  );
}
