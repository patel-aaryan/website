"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import {
  Code,
  Mail,
  Download,
  Github,
  LinkedinIcon,
  ExternalLink,
  GraduationCap,
  Briefcase,
  MapPin,
  Trophy,
} from "lucide-react";
import { useState, useEffect } from "react";

// Import portfolio data
import portfolioData from "@/data/portfolio.json";

export default function Home() {
  const [currentTagline, setCurrentTagline] = useState(0);

  // Rotate through taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline(
        (prev) => (prev + 1) % portfolioData.headerTaglineOne.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Featured projects (first 3)
  const featuredProjects = portfolioData.projects.slice(0, 3);

  // Current experience (first in array)
  const currentExperience = portfolioData.experience[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
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
                  className="h-16 flex items-center"
                >
                  <p className="text-xl sm:text-2xl text-muted-foreground">
                    {portfolioData.headerTaglineOne[currentTagline]}
                  </p>
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
                className="flex flex-wrap gap-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="hover:scale-105 transition-transform"
                >
                  <Link href="/projects">
                    <Code className="mr-2 h-4 w-4" />
                    View My Work
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-transform"
                >
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Me
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="hover:scale-105 transition-transform"
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
                <Button asChild variant="ghost" size="icon">
                  <Link href={portfolioData.socials.github} target="_blank">
                    <Github className="h-10 w-10" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="icon">
                  <Link href={portfolioData.socials.linkedin} target="_blank">
                    <LinkedinIcon className="h-10 w-10" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="icon">
                  <Link href={portfolioData.socials.devpost} target="_blank">
                    <Trophy className="h-10 w-10" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="icon">
                  <Link href={portfolioData.socials.email}>
                    <Mail className="h-10 w-10" />
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
                  className="relative w-80 h-80 sm:w-96 sm:h-96 overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/profile.png"
                    alt={portfolioData.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Education */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#EAAB00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-6 w-6 text-[#EAAB00]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">CS Student</h3>
                <p className="text-muted-foreground">University of Waterloo</p>
                <p className="text-sm text-muted-foreground">
                  AI/ML Specialization
                </p>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#005DAA]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-6 w-6 text-[#005DAA]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">4 Co-ops</h3>
                <p className="text-muted-foreground">RBC, CGI, JANA</p>
                <p className="text-sm text-muted-foreground">
                  Full-stack Development
                </p>
              </CardContent>
            </Card>

            {/* Current Status */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Full-Stack Dev</h3>
                <p className="text-muted-foreground">React, Next.js, Python</p>
                <p className="text-sm text-muted-foreground">Cloud & AI/ML</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work in full-stack development, AI/ML, and
              cloud technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: project.colour }}
                      />
                      <Button asChild variant="ghost" size="icon">
                        <Link href={project.link} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech.name}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">
                View All Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Currently</h2>
            <div className="bg-card rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-muted-foreground">Working at</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                {currentExperience.title}
              </h3>
              <p className="text-xl text-primary mb-4">
                {currentExperience.company}
              </p>
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-6">
                <MapPin className="h-4 w-4" />
                <span>{currentExperience.location}</span>
              </div>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Looking for Summer 2025 internship opportunities in software
                engineering, full-stack development, and AI/ML roles.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/resume.pdf" target="_blank">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
