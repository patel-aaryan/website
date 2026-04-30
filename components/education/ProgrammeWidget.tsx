import { motion } from "framer-motion";
import { Terminal } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import { widgetBase, WidgetLabel } from "./WidgetShared";

export function ProgrammeWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className={cn(
        widgetBase,
        "col-span-12 md:col-span-5 md:row-span-1 flex h-full min-h-0 flex-col justify-between gap-2 p-5",
      )}
    >
      <div className="flex items-center gap-2">
        <Terminal className="h-3.5 w-3.5 text-primary" />
        <WidgetLabel>[programme]</WidgetLabel>
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight">Bachelor of Computer Science</p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          honours · co-op · 5 yr
        </p>
      </div>
    </motion.div>
  );
}
