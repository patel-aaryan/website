import { motion } from "framer-motion";
import { EmojiEvents } from "@mui/icons-material";
import type { Education } from "@/data/types";
import { cn } from "@/lib/utils";
import { widgetBase, WidgetLabel } from "./WidgetShared";

export function AwardsWidget({ ed }: Readonly<{ ed: Education }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.35 }}
      className={cn(widgetBase, "col-span-12 w-full flex flex-col p-5 md:p-6")}
    >
      <div className="mb-4 flex items-center gap-2">
        <EmojiEvents className="h-4 w-4 text-primary" />
        <WidgetLabel>[honors]</WidgetLabel>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
        {ed.milestones.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
            className="group/award flex items-center gap-3 rounded-lg border border-border bg-background/40 px-3 py-2.5 transition-all duration-200 hover:border-primary/30"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-[9px] font-bold text-primary">
              0{i + 1}
            </span>
            <p className="text-xs font-medium leading-snug">{m}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
