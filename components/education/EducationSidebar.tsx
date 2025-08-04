"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { School, MenuBook, Groups, EmojiEvents } from "@mui/icons-material";

interface EducationSidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const navigationItems = [
  {
    id: "overview",
    label: "Overview",
    icon: School,
    description: "Institution & Program",
  },
  {
    id: "courses",
    label: "Coursework",
    icon: MenuBook,
    description: "Computer Science Courses",
  },
  {
    id: "activities",
    label: "Activities",
    icon: Groups,
    description: "Clubs & Leadership",
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: EmojiEvents,
    description: "Awards & Recognition",
  },
];

export function EducationSidebar({
  activeSection,
  onSectionClick,
}: EducationSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="hidden lg:block w-64 sticky top-24 h-fit"
    >
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">
          Education Navigation
        </h3>
        {navigationItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                onClick={() => onSectionClick(item.id)}
                className={`w-full text-left p-3 rounded-lg duration-200 group h-auto justify-start ${
                  activeSection === item.id
                    ? "bg-primary/10 border-l-4 border-primary hover:bg-primary/15"
                    : "hover:bg-muted/50 border-l-4 border-transparent"
                }`}
              >
                <div className="flex items-start gap-3 w-full">
                  <IconComponent
                    className={`h-5 w-5 mt-0.5 transition-colors ${
                      activeSection === item.id
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  <div className="space-y-1 text-left">
                    <p className="text-sm font-medium leading-tight">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
