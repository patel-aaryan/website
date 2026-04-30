import { motion } from "framer-motion";
import { AutoAwesome, EmojiEvents } from "@mui/icons-material";
import type { Education } from "@/data/types";
import { cn } from "@/lib/utils";
import { widgetBase, WidgetLabel } from "./WidgetShared";

export function AwardsWidget({ ed }: Readonly<{ ed: Education }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.35 }}
      className={cn(widgetBase, "col-span-12 md:col-span-4 md:row-span-3 flex flex-col p-5")}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <EmojiEvents className="h-4 w-4 text-primary" />
          <WidgetLabel>[honors]</WidgetLabel>
        </div>
        <AutoAwesome className="h-3.5 w-3.5 text-primary/60" />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2.5">
        {ed.milestones.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
            className="group/award flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3 transition-all duration-200 hover:border-primary/30"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-[10px] font-bold text-primary">
              0{i + 1}
            </span>
            <p className="text-xs font-medium leading-snug">{m}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
