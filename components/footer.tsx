"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GitHub,
  LinkedIn,
  Instagram,
  Email,
  LocationOn,
  Description,
  FiberManualRecord,
} from "@mui/icons-material";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/footer/ContactForm";
import portfolioData from "@/data/portfolio.json";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => setMounted(true), []);

  const socialLinks = [
    {
      icon: GitHub,
      href: portfolioData.socials.github,
      label: "GitHub",
    },
    {
      icon: LinkedIn,
      href: portfolioData.socials.linkedin,
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: portfolioData.socials.instagram,
      label: "Instagram",
    },
    {
      icon: Email,
      href: portfolioData.socials.email,
      label: "Email",
    },
  ];

  const contactInfo = [
    {
      icon: Email,
      text: process.env.NEXT_PUBLIC_EMAIL,
      href: portfolioData.socials.email,
    },
    {
      icon: LocationOn,
      text: "Toronto, ON, Canada",
      href: null,
    },
    {
      icon: Description,
      text: "View Resume",
      href: "/resume.pdf",
    },
  ];

  // Create motion wrapper components
  const MotionDiv = mounted ? motion.div : "div";
  const MotionA = mounted ? motion.a : "a";

  return (
    <footer
      id="contact"
      className="bg-background/95 border-t border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 md:mx-16 lg:mx-32">
          {/* Contact Info & Social Links */}
          <MotionDiv
            {...(mounted
              ? {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.2 },
                  viewport: { once: true },
                }
              : {})}
            className="flex flex-col space-y-8"
          >
            <div className="flex-grow space-y-8">
              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <MotionDiv
                      key={index}
                      {...(mounted ? { whileHover: { x: 5 } } : {})}
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                      {item.href ? (
                        <a
                          href={item.href}
                          className="hover:underline"
                          target={
                            item.href.startsWith("mailto:") ? "_self" : "_blank"
                          }
                          rel={
                            item.href.startsWith("mailto:")
                              ? ""
                              : "noopener noreferrer"
                          }
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span>{item.text}</span>
                      )}
                    </MotionDiv>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <MotionA
                      key={index}
                      href={social.href}
                      target={
                        social.href.startsWith("mailto:") ? "_self" : "_blank"
                      }
                      rel={
                        social.href.startsWith("mailto:")
                          ? ""
                          : "noopener noreferrer"
                      }
                      {...(mounted
                        ? {
                            whileHover: { scale: 1.1, rotate: 5 },
                            whileTap: { scale: 0.95 },
                          }
                        : {})}
                      className="p-3 rounded-lg bg-accent/50 hover:bg-accent border border-border/20 hover:border-border/40 transition-all duration-200 group"
                      aria-label={social.label}
                    >
                      <social.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </MotionA>
                  ))}
                </div>
              </div>
            </div>

            {/* Now Status Card */}
            <MotionDiv
              {...(mounted
                ? {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: 0.3 },
                    viewport: { once: true },
                  }
                : {})}
            >
              <Card className="border-border/20 bg-accent/30 hover:bg-accent/40 transition-colors w-full md:w-3/4">
                <CardContent className="px-4 py-2">
                  <div className="flex items-center gap-3 mb-2">
                    <MotionDiv
                      {...(mounted
                        ? {
                            animate: { scale: [1, 1.2, 1] },
                            transition: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }
                        : {})}
                    >
                      <FiberManualRecord className="h-3 w-3 text-green-500" />
                    </MotionDiv>
                    <h4 className="font-semibold text-sm">Currently</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Back in school and taking courses on{" "}
                    <span className="font-medium text-foreground">
                      distributed systems, networks, software architecture
                    </span>
                    {". "}
                    Deep diving into computer networks, systems design, and
                    building scalable, high-performance distributed
                    applications.
                  </p>
                </CardContent>
              </Card>
            </MotionDiv>
          </MotionDiv>

          {/* Contact Form */}
          <ContactForm mounted={mounted} />
        </div>

        {/* Copyright */}
        <MotionDiv
          {...(mounted
            ? {
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                transition: { duration: 0.6, delay: 0.4 },
                viewport: { once: true },
              }
            : {})}
          className="mt-12 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground"
        >
          <p>
            &copy; {new Date().getFullYear()} Aaryan Patel. All rights reserved.
          </p>
        </MotionDiv>
      </div>
    </footer>
  );
}
