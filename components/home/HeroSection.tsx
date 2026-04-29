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
  /** Tailwind classes applied on hover (icon transitions from muted foreground). */
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
        {hovered ? (
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
        ) : null}
      </AnimatePresence>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="hover:scale-115 rounded-full"
        >
          <Link
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            aria-label={label}
            className="group"
          >
            <Icon
              className={`h-8 w-8 text-muted-foreground transition-colors duration-200 sm:h-10 sm:w-10 lg:h-12 lg:w-12 ${iconHoverClassName}`}
            />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground"
              >
                Hi, I&apos;m
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground"
              >
                {portfolioData.name}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="h-16 flex items-center overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentTagline}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="text-xl sm:text-2xl text-muted-foreground"
                  >
                    {portfolioData.headerTaglineOne[currentTagline]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              {portfolioData.aboutMe}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <Button
                size="lg"
                className="hover:scale-105 transition-transform w-full sm:w-auto"
                onClick={() => scrollToSection("recent-work-experience")}
              >
                <Code className="mr-2 h-4 w-4" />
                My Experience
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-transform w-full sm:w-auto"
                onClick={() => scrollToSection("contact")}
              >
                <Email className="mr-2 h-4 w-4" />
                Contact Me
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="hover:scale-105 transition-transform w-full sm:w-auto"
              >
                <Link href="/resume.pdf" target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </Link>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 pt-4"
            >
              <SocialIconLink
                href={portfolioData.socials.github}
                label="GitHub"
                target="_blank"
                Icon={GitHub}
                iconHoverClassName="group-hover:text-[#24292f] dark:group-hover:text-[#f0f6fc]"
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
          </motion.div>

          {/* Right side - Profile photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 overflow-hidden shadow-2xl"
              >
                <Image
                  src="/profile.png"
                  alt={portfolioData.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
