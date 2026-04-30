"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Code, GitHub, LinkedIn, Email, Download } from "@mui/icons-material";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { useState, useEffect, type ComponentType } from "react";
import portfolioData from "@/data/portfolio.json";

type SocialIconLinkProps = {
  href: string;
  label: string;
  target?: string;
  Icon: ComponentType<SvgIconProps>;
  iconHoverClassName: string;
};

function SocialIconLink({
  href,
  label,
  target,
  Icon,
  iconHoverClassName,
}: Readonly<SocialIconLinkProps>) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {hovered && (
          <motion.span
            key={label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground shadow-md ring-1 ring-border"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.div onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="hover:scale-115 rounded-full text-white/70 hover:text-white hover:bg-white/10"
        >
          <Link
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            aria-label={label}
            className="group"
          >
            <Icon className={`h-5 w-5 transition-colors duration-200 ${iconHoverClassName}`} />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const [currentTagline, setCurrentTagline] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % portfolioData.headerTaglineOne.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/profile.jpg"
          alt=""
          fill
          className="object-cover object-[65%_top]"
          priority
          quality={90}
        />

        {/* Left gradient — text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent" />

        {/* Bottom fade into page */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />

        {/* Top fade for nav */}
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background/70 to-transparent" />
      </div>

      {/* Content — bottom-left, matching photo composition */}
      <div className="relative z-10 flex flex-col justify-end flex-1 pb-24 pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-sm text-white/60 mb-3 tracking-widest uppercase font-mono"
            >
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-4"
            >
              {portfolioData.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-8 flex items-center mb-6 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTagline}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg sm:text-xl text-white/70 font-mono"
                >
                  {portfolioData.headerTaglineOne[currentTagline]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white/60 leading-relaxed mb-8 text-sm sm:text-base"
            >
              {portfolioData.aboutMe}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <Button
                size="lg"
                className="hover:scale-105 transition-transform"
                onClick={() => scrollToSection("recent-work-experience")}
              >
                <Code className="mr-2 h-4 w-4" />
                My Experience
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-transform bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
                onClick={() => scrollToSection("contact")}
              >
                <Email className="mr-2 h-4 w-4" />
                Contact Me
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="hover:scale-105 transition-transform text-white/70 hover:text-white hover:bg-white/10"
              >
                <Link href="/resume.pdf" target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-4"
            >
              <SocialIconLink
                href={portfolioData.socials.github}
                label="GitHub"
                target="_blank"
                Icon={GitHub}
                iconHoverClassName="group-hover:text-white"
              />
              <SocialIconLink
                href={portfolioData.socials.linkedin}
                label="LinkedIn"
                target="_blank"
                Icon={LinkedIn}
                iconHoverClassName="group-hover:text-[#0A66C2]"
              />
              <SocialIconLink
                href={portfolioData.socials.email}
                label="Email"
                Icon={Email}
                iconHoverClassName="group-hover:text-[#EA4335]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
