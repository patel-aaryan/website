import { motion } from "framer-motion";
import { CalendarToday, LocationOn, School } from "@mui/icons-material";
import type { Education } from "@/data/types";
import { cn } from "@/lib/utils";
import { widgetBase, WidgetLabel } from "./WidgetShared";

interface HeroWidgetProps {
  ed: Education;
  progress: number;
  termIndex: number;
}

const YEARS = ["2022", "2023", "2024", "2025", "2026", "2027"];

export function HeroWidget({ ed, progress, termIndex }: Readonly<HeroWidgetProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className={cn(
        widgetBase,
        "col-span-12 md:col-span-7 md:row-span-3 flex flex-col justify-between p-6 md:p-7",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 opacity-60 blur-3xl transition-opacity duration-500 group-hover/widget:opacity-90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50"
      >
        node_01
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-10 rounded-full bg-primary" />
          <WidgetLabel>[institution]</WidgetLabel>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background ring-2 ring-primary/20">
            <School className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl lg:text-4xl">
              {ed.name}
            </h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-primary">
              {ed.major}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <LocationOn className="h-3.5 w-3.5" />
            {ed.location}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarToday className="h-3.5 w-3.5" />
            {ed.date}
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-primary/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {""}enrolled
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-border/60 pt-5">
        <div className="flex items-center justify-between">
          <WidgetLabel>[degree_progress]</WidgetLabel>
          <span className="font-mono text-[11px] font-semibold tracking-wider text-primary">
            {Math.round(progress * 100)}% · term {String(termIndex).padStart(2, "0")}
          </span>
        </div>
        <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 rounded-full bg-primary"
          />
        </div>
        <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70">
          {YEARS.map((y) => (
            <span key={y}>{y.slice(2)}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
