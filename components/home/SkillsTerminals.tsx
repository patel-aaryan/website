"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CATEGORIES, SKILL_ICONS } from "@/data/skills";

function SvgIcon({ src, className }: Readonly<{ src: string; className?: string }>) {
  return <Image src={src} alt="" width={16} height={16} className={className} />;
}

function TrafficLights() {
  return (
    <div className="flex shrink-0 gap-1.5 pl-1" aria-hidden>
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
    </div>
  );
}

type SkillTerminalProps = (typeof CATEGORIES)[number] & { index: number };

function SkillTerminal({
  title,
  slug,
  skills,
  accent,
  promptColor,
  index,
}: SkillTerminalProps) {
  const cwd = `~/stack/${slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-lg border border-zinc-800/90 bg-zinc-950 shadow-lg",
        "border-l-4",
        accent,
      )}
    >
      <header className="flex h-9 shrink-0 items-center gap-2 border-b border-zinc-800/80 bg-zinc-900/95 px-2.5">
        <TrafficLights />
        <p className="min-w-0 flex-1 truncate text-center font-mono text-[10px] text-zinc-500 sm:text-[11px]">
          <span className="text-zinc-400">{title.toLowerCase()}</span>
          <span className="text-zinc-600"> — zsh</span>
        </p>
        <span className="w-12 shrink-0 sm:w-14" aria-hidden />
      </header>

      <div className="flex min-h-[200px] flex-1 flex-col gap-3 p-3 font-mono text-[11px] leading-relaxed sm:min-h-[220px] sm:p-4 sm:text-xs">
        <div className="space-y-1 border-b border-zinc-800/60 pb-3">
          <p>
            <span className={cn("select-none", promptColor)}>❯ </span>
            <span className="text-zinc-500">cd </span>
            <span className="text-zinc-300">{cwd}</span>
          </p>
          <p>
            <span className={cn("select-none", promptColor)}>❯ </span>
            <span className="text-zinc-500">ls -C</span>
          </p>
        </div>

        <ul className="grid flex-1 grid-cols-2 gap-x-2 gap-y-1.5 text-zinc-300">
          {skills.map((skill) => {
            const iconPath = SKILL_ICONS[skill];
            return (
              <li
                key={skill}
                className="flex min-w-0 items-center gap-1.5 rounded border border-zinc-800/50 bg-zinc-900/40 px-1.5 py-1 sm:gap-2 sm:px-2 sm:py-1.5"
              >
                <span className="hidden w-12 shrink-0 font-mono text-[9px] text-zinc-600 sm:block sm:text-[10px]">
                  -rw-r--
                </span>
                {iconPath ? (
                  <SvgIcon
                    src={iconPath}
                    className="h-4 w-4 shrink-0 opacity-90 sm:h-5 sm:w-5"
                  />
                ) : (
                  <span className="inline-block h-4 w-4 shrink-0 rounded-sm bg-zinc-700/80 sm:h-5 sm:w-5" />
                )}
                <span className="min-w-0 truncate text-zinc-200">{skill}</span>
              </li>
            );
          })}
        </ul>

        <p className="mt-auto border-t border-zinc-800/60 pt-2 text-[10px] text-zinc-600 sm:text-[11px]">
          <span className={cn("select-none", promptColor)}>❯ </span>
          <span className="animate-pulse">_</span>
        </p>
      </div>
    </motion.article>
  );
}

export function SkillsTerminals() {
  return (
    <section className="bg-linear-to-b from-background via-zinc-950/30 to-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-2 md:mb-16"
        >
          <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">TECHNICAL_SKILLS</h2>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            [SKILLS_TERMINAL] — LANGUAGES, FRONTEND, BACKEND, AND DEVOPS
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 rounded-lg border border-dashed border-zinc-700/50 bg-zinc-950/40 px-3 py-2 font-mono text-[10px] text-zinc-500 sm:text-[11px]"
        >
          <span className="text-zinc-400">STATUS</span> workspace=skills │ layout=grid │
          windows=
          {CATEGORIES.length}
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
          {CATEGORIES.map((cat, index) => (
            <SkillTerminal key={cat.slug} {...cat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
