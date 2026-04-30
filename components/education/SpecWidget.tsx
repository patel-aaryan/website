import { motion } from "framer-motion";
import { Psychology } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import { widgetBase, WidgetLabel } from "./WidgetShared";

export function SpecWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className={cn(
        widgetBase,
        "col-span-12 md:col-span-5 md:row-span-2 flex flex-col justify-between p-5",
      )}
    >
      <div className="flex items-center justify-between">
        <WidgetLabel>[specialization]</WidgetLabel>
        <Psychology className="h-4 w-4 text-primary/70" />
      </div>
      <div>
        <p className="font-mono text-3xl font-bold leading-none tracking-tighter sm:text-4xl md:text-5xl">
          SE + AI
        </p>
        <p className="mt-3 text-xs leading-snug text-muted-foreground">
          Software Engineering and Artificial Intelligence: systems design and ML-driven
          applications.
        </p>
      </div>
    </motion.div>
  );
}
