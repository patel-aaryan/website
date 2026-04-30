"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Globe, Layers, Rocket, Footprints, Wrench } from "lucide-react";
import { SportsMma } from "@mui/icons-material";

type Accent = "violet" | "cyan" | "rose";
type AccentConfig = {
  borderTop: string;
  iconShell: string;
  watermark: string;
};

const ACCENT_MAP: Record<Accent, AccentConfig> = {
  violet: {
    borderTop: "border-t-violet-500",
    iconShell: "bg-violet-500/10 text-violet-400 ring-1 ring-inset ring-violet-500/25",
    watermark: "text-violet-500",
  },
  cyan: {
    borderTop: "border-t-cyan-500",
    iconShell: "bg-cyan-500/10 text-cyan-400 ring-1 ring-inset ring-cyan-500/25",
    watermark: "text-cyan-500",
  },
  rose: {
    borderTop: "border-t-rose-500",
    iconShell: "bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/25",
    watermark: "text-rose-500",
  },
};

const CARDS: Array<{
  accent: Accent;
  title: string;
  subtitle: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
  Watermark: ComponentType<{ className?: string }>;
}> = [
  {
    accent: "violet",
    title: "The Builder",
    subtitle: "CS @ Waterloo · Homelabber",
    description:
      "Building a strong CS foundation in the classroom and stretching it in my home lab, turning spare hardware and weekend experiments into personal services and systems.",
    Icon: Layers,
    Watermark: Wrench,
  },
  {
    accent: "cyan",
    title: "The Leader",
    subtitle: "Arkin · UW Data Science Club",
    description:
      "Building Arkin to deliver modern web solutions end-to-end for clients, while bulding technical infrastructure as VP of Development for the UW Data Science Club.",
    Icon: Rocket,
    Watermark: Globe,
  },
  {
    accent: "rose",
    title: "The Artist",
    subtitle: "Mixed Martial Arts · Dance",
    description:
      "Building functional strength & discipline through Muay Thai, Boxing, and Brazilian Jiu-Jitsu, while competing in dance competitions in Garba Raas.",
    Icon: SportsMma,
    Watermark: Footprints,
  },
];

export function QuickHighlights() {
  return (
    <section className="border-t border-border/40 bg-muted/5 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10 flex flex-col gap-4 border-b border-border/50 pb-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Core_Identity
          </h2>
          <p className="font-heading text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            PARAMS_03
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        >
          {CARDS.map(({ accent, title, subtitle, description, Icon, Watermark }, index) => {
            const styles = ACCENT_MAP[accent];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    "group relative h-full overflow-hidden border-t-2 py-0 shadow-none ring-1 ring-border/60 transition-colors hover:ring-border",
                    styles.borderTop,
                  )}
                >
                  <Watermark
                    className={cn(
                      "pointer-events-none absolute -right-1 -top-1 size-28 -rotate-6 opacity-[0.08] transition-opacity group-hover:opacity-[0.12]",
                      styles.watermark,
                    )}
                    aria-hidden
                  />
                  <CardContent className="relative p-6 pt-7">
                    <div className="flex gap-4">
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-md",
                          styles.iconShell,
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1 space-y-2">
                        <h3 className="font-heading text-lg font-semibold leading-snug text-card-foreground">
                          {title}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {subtitle}
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
