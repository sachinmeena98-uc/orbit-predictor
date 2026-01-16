import { motion } from 'framer-motion';
import { Rocket, Orbit, GraduationCap, Target, BarChart3, Users } from 'lucide-react';

const features = [
  {
    icon: Orbit,
    title: '3D Solar System',
    description: 'Visualize colleges as planets orbiting around you – the student sun.',
  },
  {
    icon: Target,
    title: 'Smart Predictions',
    description: 'Get color-coded predictions: Safe, Moderate, or Ambitious based on your rank.',
  },
  {
    icon: BarChart3,
    title: 'Real Data',
    description: 'Based on last year\'s JoSAA closing ranks for accurate predictions.',
  },
  {
    icon: Users,
    title: 'Compare Colleges',
    description: 'Compare up to 4 colleges side by side on fees, placements, and more.',
  },
];

export function HeroSection() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-background to-background" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-nebula-pink/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      
      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
              <Orbit className="w-7 h-7 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">EduOrbit</h1>
              <p className="text-xs text-muted-foreground">Visualize Your Future</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
          </nav>
        </motion.header>

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-6"
          >
            <GraduationCap className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary font-medium">JEE 2025 Counseling Tool</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            Your Dream College,{' '}
            <span className="gradient-text-cosmic">Visualized</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Enter your JEE rank and explore an interactive 3D solar system of IITs, NITs, IIITs, 
            and GFTIs. See exactly where you stand and discover your best-fit colleges.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>100+ Colleges</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span>Real JoSAA Data</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-nebula-pink" />
              <span>3D Visualization</span>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          id="features"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="cosmic-card p-6 group hover:border-secondary/50 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
