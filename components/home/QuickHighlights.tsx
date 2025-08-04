import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { School, Work, SportsMma } from "@mui/icons-material";

export function QuickHighlights() {
  return (
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
                <School className="h-6 w-6 text-[#EAAB00]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">CS Student</h3>
              <p className="text-muted-foreground">University of Waterloo</p>
              <p className="text-sm text-muted-foreground">
                Artificial Intelligence Specialization
              </p>
              <p className="text-sm text-muted-foreground">Economics Minor</p>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-[#005DAA]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Work className="h-6 w-6 text-[#005DAA]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1.5+ Years</h3>
              <p className="text-muted-foreground">
                Software Engineering experience in
              </p>
              <p className="text-sm text-muted-foreground">
                Scrawlr &bull; RBC &bull; CGI &bull; JANA
              </p>
              <p className="text-sm text-muted-foreground">
                FinTech &bull; Consulting &bull; Energy
              </p>
            </CardContent>
          </Card>

          {/* Sports & Fitness */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <SportsMma className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Always Active</h3>
              <p className="text-muted-foreground">
                Boxing &bull; Muay Thai &bull; BJJ
              </p>
              <p className="text-sm text-muted-foreground">
                Soccer &bull; Volleyball
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
