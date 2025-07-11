"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <motion.h1
          className="text-4xl font-bold text-foreground"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          shadcn/ui + Framer Motion
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Your setup is complete and working perfectly!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-x-4"
        >
          <Button
            variant="default"
            className="hover:scale-105 transition-transform"
          >
            Primary Button
          </Button>
          <Button
            variant="outline"
            className="hover:scale-105 transition-transform"
          >
            Outline Button
          </Button>
        </motion.div>

        <motion.div
          className="mt-8 p-4 border rounded-lg bg-card text-card-foreground"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-xl font-semibold mb-2">What&apos;s included:</h2>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>✅ shadcn/ui components</li>
            <li>✅ Framer Motion animations</li>
            <li>✅ Tailwind CSS with design tokens</li>
            <li>✅ TypeScript support</li>
            <li>✅ Dark mode ready</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
