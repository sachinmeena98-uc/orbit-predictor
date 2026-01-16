import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SolarSystemScene } from '@/components/3d/SolarSystemScene';
import { CollegeInfoPanel } from '@/components/CollegeInfoPanel';
import { CollegeListPanel } from '@/components/CollegeListPanel';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

export function VisualizationDashboard() {
  const { resetAll, predictedColleges, userInput } = useStore();
  const [showList, setShowList] = useState(false);

  return (
    <div className="h-screen w-full relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background to-background" />
      
      {/* 3D Scene */}
      <SolarSystemScene />

      {/* Top Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetAll}
            className="glass hover:bg-secondary/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Search
          </Button>
          <div className="glass px-4 py-2 rounded-lg">
            <span className="text-sm text-muted-foreground">Your Rank: </span>
            <span className="font-semibold text-secondary">
              {(userInput.jeeAdvancedRank || userInput.jeeMainsRank)?.toLocaleString()}
            </span>
            <span className="text-muted-foreground mx-2">•</span>
            <span className="text-sm text-muted-foreground">{userInput.category}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowList(!showList)}
            className="glass hover:bg-secondary/20"
          >
            <List className="w-4 h-4 mr-2" />
            {showList ? 'Hide List' : 'Show List'}
          </Button>
          <div className="glass px-4 py-2 rounded-lg">
            <span className="font-semibold text-foreground">{predictedColleges.length}</span>
            <span className="text-sm text-muted-foreground ml-1">Colleges Found</span>
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 glass rounded-xl p-4 space-y-4"
      >
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Legend
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-success shadow-lg" style={{ boxShadow: '0 0 10px hsl(142 70% 45% / 0.5)' }} />
            <span className="text-sm text-foreground">Safe</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-warning" style={{ boxShadow: '0 0 10px hsl(38 92% 50% / 0.5)' }} />
            <span className="text-sm text-foreground">Moderate</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-danger" style={{ boxShadow: '0 0 10px hsl(0 72% 51% / 0.5)' }} />
            <span className="text-sm text-foreground">Ambitious</span>
          </div>
        </div>
        <div className="border-t border-border/30 pt-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5722' }} />
            <span className="text-xs text-muted-foreground">IIT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00bcd4' }} />
            <span className="text-xs text-muted-foreground">NIT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#9c27b0' }} />
            <span className="text-xs text-muted-foreground">IIIT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffc107' }} />
            <span className="text-xs text-muted-foreground">GFTI</span>
          </div>
        </div>
      </motion.div>

      {/* Right Panel - College Info or List */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute right-0 top-0 bottom-0 w-96 z-10 glass border-l border-border/30"
      >
        {showList ? <CollegeListPanel /> : <CollegeInfoPanel />}
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 glass px-6 py-3 rounded-full"
      >
        <p className="text-sm text-muted-foreground">
          <span className="text-secondary">Drag</span> to rotate • 
          <span className="text-secondary"> Scroll</span> to zoom • 
          <span className="text-secondary"> Click</span> on planets for details
        </p>
      </motion.div>
    </div>
  );
}
