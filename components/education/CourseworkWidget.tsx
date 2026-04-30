import { motion } from "framer-motion";
import { MenuBook } from "@mui/icons-material";
import type { Education } from "@/data/types";
import { cn } from "@/lib/utils";
import { widgetBase, WidgetLabel } from "./WidgetShared";

export function CourseworkWidget({ ed }: Readonly<{ ed: Education }>) {
  const courses = ed.courses ?? [];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.08 }}
      className={cn(widgetBase, "col-span-12 md:row-span-3 flex flex-col p-5 md:p-6")}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MenuBook className="h-4 w-4 text-primary" />
          <WidgetLabel>[core_coursework]</WidgetLabel>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {courses.length} units
        </span>
      </div>

      <div className="grid auto-rows-fr grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {courses.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: 0.08 + i * 0.018 }}
            whileHover={{ y: -2 }}
            className="group/tile relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-lg border border-border bg-background/40 p-3 transition-all duration-200 hover:border-primary/40"
          >
            <span className="absolute left-0 top-0 h-full w-0.5 bg-primary transition-all duration-200 group-hover/tile:w-1" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-primary/80">
              {c.code}
            </span>
            <span className="text-xs font-medium leading-snug">{c.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
