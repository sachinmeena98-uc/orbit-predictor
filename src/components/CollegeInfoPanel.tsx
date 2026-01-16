import { motion } from 'framer-motion';
import { X, MapPin, Award, DollarSign, Users, TrendingUp, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useStore, PredictedCollege } from '@/store/useStore';
import { PredictionConfidence } from '@/data/colleges';

const confidenceLabels: Record<PredictionConfidence, string> = {
  safe: 'Safe Choice',
  moderate: 'Moderate Chance',
  ambitious: 'Ambitious',
  unlikely: 'Unlikely',
};

const confidenceProgress: Record<PredictionConfidence, number> = {
  safe: 90,
  moderate: 60,
  ambitious: 30,
  unlikely: 10,
};

export function CollegeInfoPanel() {
  const { selectedCollege, setSelectedCollege, comparisonColleges, addToComparison, removeFromComparison, userInput } = useStore();

  if (!selectedCollege) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-full flex items-center justify-center text-center p-8"
      >
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-secondary" />
          </div>
          <h3 className="text-xl font-display font-semibold text-foreground">
            Select a College
          </h3>
          <p className="text-muted-foreground text-sm max-w-[250px]">
            Click on any planet in the solar system to view detailed information about that college.
          </p>
        </div>
      </motion.div>
    );
  }

  const isInComparison = comparisonColleges.some((c) => c.id === selectedCollege.id);

  return (
    <motion.div
      key={selectedCollege.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="h-full overflow-y-auto p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedCollege.planetColor }}
            />
            <span className="text-xs font-medium text-secondary uppercase tracking-wider">
              {selectedCollege.type}
            </span>
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground leading-tight">
            {selectedCollege.name}
          </h2>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {selectedCollege.location.city}, {selectedCollege.location.state}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedCollege(null)}
          className="shrink-0"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Prediction Confidence */}
      <div className="cosmic-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Prediction Confidence</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              selectedCollege.confidence === 'safe'
                ? 'badge-safe'
                : selectedCollege.confidence === 'moderate'
                ? 'badge-moderate'
                : 'badge-ambitious'
            }`}
          >
            {confidenceLabels[selectedCollege.confidence]}
          </span>
        </div>
        <Progress
          value={confidenceProgress[selectedCollege.confidence]}
          className="h-2"
        />
        <p className="text-xs text-muted-foreground">
          For {selectedCollege.matchingBranch} • {userInput.category} category
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="cosmic-card p-4 text-center">
          <Award className="w-6 h-6 text-secondary mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-foreground">
            #{selectedCollege.metrics.nirf}
          </p>
          <p className="text-xs text-muted-foreground">NIRF Rank</p>
        </div>
        <div className="cosmic-card p-4 text-center">
          <DollarSign className="w-6 h-6 text-success mx-auto mb-2" />
          <p className="text-lg font-display font-bold text-foreground">
            {selectedCollege.metrics.avgPackage}
          </p>
          <p className="text-xs text-muted-foreground">Avg Package</p>
        </div>
        <div className="cosmic-card p-4 text-center">
          <Users className="w-6 h-6 text-warning mx-auto mb-2" />
          <p className="text-lg font-display font-bold text-foreground">
            {selectedCollege.metrics.fees}
          </p>
          <p className="text-xs text-muted-foreground">Total Fees</p>
        </div>
        <div className="cosmic-card p-4 text-center">
          <MapPin className="w-6 h-6 text-nebula-pink mx-auto mb-2" />
          <p className="text-lg font-display font-bold text-foreground">
            {selectedCollege.metrics.campusSize}
          </p>
          <p className="text-xs text-muted-foreground">Campus Size</p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h4 className="font-semibold text-foreground">About</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {selectedCollege.description}
        </p>
      </div>

      {/* Closing Ranks Table */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Last Year Closing Ranks</h4>
        <div className="cosmic-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-2 text-left text-muted-foreground font-medium">Branch</th>
                <th className="px-4 py-2 text-right text-muted-foreground font-medium">
                  {userInput.category}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(selectedCollege.ranks).map(([branch, ranks]) => (
                <tr key={branch} className="border-t border-border/30">
                  <td className="px-4 py-3 text-foreground">{branch}</td>
                  <td className="px-4 py-3 text-right font-mono text-secondary">
                    {ranks[userInput.category as keyof typeof ranks]?.toLocaleString() || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compare Button */}
      <Button
        onClick={() =>
          isInComparison
            ? removeFromComparison(selectedCollege.id)
            : addToComparison(selectedCollege)
        }
        variant={isInComparison ? 'secondary' : 'default'}
        className="w-full btn-glow"
        disabled={!isInComparison && comparisonColleges.length >= 4}
      >
        {isInComparison ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Added to Comparison
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 mr-2" />
            Add to Compare ({comparisonColleges.length}/4)
          </>
        )}
      </Button>
    </motion.div>
  );
}
