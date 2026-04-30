import { cn } from "@/lib/utils";

export const widgetBase =
  "group/widget relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)]";

export function WidgetLabel({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <p
      className={cn(
        "font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}
