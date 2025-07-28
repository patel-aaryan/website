import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Email, Download, LocationOn } from "@mui/icons-material";
import portfolioData from "@/data/portfolio.json";

export function CurrentStatus() {
  const currentExperience = portfolioData.experience[0];

  return (
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
              <LocationOn className="h-4 w-4" />
              <span>{currentExperience.location}</span>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Looking for Summer 2025 internship opportunities in software
              engineering, full-stack development, and AI/ML roles.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild>
                <Link href="/contact">
                  <Email className="mr-2 h-4 w-4" />
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
  );
}
