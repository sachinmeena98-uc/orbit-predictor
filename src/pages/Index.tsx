import { useStore } from '@/store/useStore';
import { HeroSection } from '@/components/HeroSection';
import { PredictorForm } from '@/components/PredictorForm';
import { VisualizationDashboard } from '@/components/VisualizationDashboard';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const { showVisualization } = useStore();

  return (
    <AnimatePresence mode="wait">
      {showVisualization ? (
        <motion.div
          key="visualization"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VisualizationDashboard />
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-background"
        >
          <HeroSection />
          <div className="container mx-auto px-4 pb-16 -mt-8">
            <PredictorForm />
          </div>
          
          {/* Footer */}
          <footer className="border-t border-border/30 py-8">
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm text-muted-foreground">
                Built with ❤️ for JEE Aspirants • Data based on JoSAA 2024 closing ranks
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                Predictions are indicative only. Always refer to official JoSAA data for counseling decisions.
              </p>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
