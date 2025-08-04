"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Code, GitHub, LinkedIn, Email, Download } from "@mui/icons-material";
import { useState, useEffect } from "react";
import portfolioData from "@/data/portfolio.json";

export function HeroSection() {
  const [currentTagline, setCurrentTagline] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline(
        (prev) => (prev + 1) % portfolioData.headerTaglineOne.length
      );
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
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:scale-115"
              >
                <Link href={portfolioData.socials.github} target="_blank">
                  <GitHub className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:scale-115"
              >
                <Link href={portfolioData.socials.linkedin} target="_blank">
                  <LinkedIn className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:scale-115"
              >
                <Link href={portfolioData.socials.email}>
                  <Email className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
                </Link>
              </Button>
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
