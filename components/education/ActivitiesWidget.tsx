import { motion } from "framer-motion";
import { Groups } from "@mui/icons-material";
import type { Education } from "@/data/types";
import { cn } from "@/lib/utils";
import { widgetBase, WidgetLabel } from "./WidgetShared";

export function ActivitiesWidget({ ed }: Readonly<{ ed: Education }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.3 }}
      className={cn(
        widgetBase,
        "col-span-12 flex h-full min-h-0 w-full min-w-0 flex-col p-5 md:col-span-4 md:p-6",
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <Groups className="h-4 w-4 text-primary" />
        <WidgetLabel>[extracurricular]</WidgetLabel>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 content-start items-stretch gap-3">
        {ed.clubs.map((club, i) => (
          <motion.div
            key={`${club.title}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.35 + i * 0.05 }}
            className="group/club flex flex-col gap-2 overflow-hidden rounded-lg border border-border bg-background/40 p-3.5 transition-all duration-200 hover:border-primary/30"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight">{club.title}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                  {club.role}
                </p>
              </div>
              <span className="shrink-0 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                {club.date}
              </span>
            </div>
            {club.desc && club.desc.length > 0 && (
              <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                {club.desc[0]}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
