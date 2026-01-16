import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useStore } from '@/store/useStore';
import { branches, categories, states, instituteTypes, filterColleges } from '@/data/colleges';

export function PredictorForm() {
  const { userInput, setUserInput, setPredictedColleges, setShowVisualization } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.jeeMainsRank && !userInput.jeeAdvancedRank) {
      return;
    }

    setIsLoading(true);

    // Simulate processing delay for effect
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const rank = userInput.jeeAdvancedRank || userInput.jeeMainsRank || 0;
    const predictions = filterColleges(
      rank,
      userInput.category,
      userInput.preferredBranches,
      userInput.instituteTypes
    );

    setPredictedColleges(predictions);
    setShowVisualization(true);
    setIsLoading(false);
  };

  const handleBranchToggle = (branch: string) => {
    const current = userInput.preferredBranches;
    if (current.includes(branch)) {
      if (current.length > 1) {
        setUserInput({ preferredBranches: current.filter((b) => b !== branch) });
      }
    } else {
      setUserInput({ preferredBranches: [...current, branch] });
    }
  };

  const handleInstituteToggle = (type: string) => {
    const current = userInput.instituteTypes;
    if (current.includes(type)) {
      if (current.length > 1) {
        setUserInput({ instituteTypes: current.filter((t) => t !== type) });
      }
    } else {
      setUserInput({ instituteTypes: [...current, type] });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="cosmic-card p-8 max-w-2xl w-full mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">
          Enter Your Details
        </h2>
        <p className="text-muted-foreground">
          Provide your JEE rank and preferences to visualize your college options
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rank Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jeeMainsRank" className="text-foreground">
              JEE Mains Rank <span className="text-secondary">*</span>
            </Label>
            <Input
              id="jeeMainsRank"
              type="number"
              placeholder="Enter your rank"
              value={userInput.jeeMainsRank || ''}
              onChange={(e) =>
                setUserInput({ jeeMainsRank: e.target.value ? parseInt(e.target.value) : null })
              }
              className="bg-muted/30 border-border/50 focus:border-secondary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jeeAdvancedRank" className="text-foreground">
              JEE Advanced Rank <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="jeeAdvancedRank"
              type="number"
              placeholder="For IIT predictions"
              value={userInput.jeeAdvancedRank || ''}
              onChange={(e) =>
                setUserInput({
                  jeeAdvancedRank: e.target.value ? parseInt(e.target.value) : null,
                })
              }
              className="bg-muted/30 border-border/50 focus:border-secondary"
            />
          </div>
        </div>

        {/* Category and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-foreground">Category</Label>
            <Select
              value={userInput.category}
              onValueChange={(value) => setUserInput({ category: value })}
            >
              <SelectTrigger className="bg-muted/30 border-border/50">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Home State</Label>
            <Select
              value={userInput.homeState}
              onValueChange={(value) => setUserInput({ homeState: value })}
            >
              <SelectTrigger className="bg-muted/30 border-border/50">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label className="text-foreground">Gender</Label>
          <Select
            value={userInput.gender}
            onValueChange={(value) => setUserInput({ gender: value })}
          >
            <SelectTrigger className="bg-muted/30 border-border/50 w-full md:w-1/2">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preferred Branches */}
        <div className="space-y-3">
          <Label className="text-foreground">Preferred Branches</Label>
          <div className="flex flex-wrap gap-3">
            {branches.map((branch) => (
              <label
                key={branch}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                  userInput.preferredBranches.includes(branch)
                    ? 'bg-secondary/20 border-secondary text-secondary'
                    : 'bg-muted/30 border-border/50 text-muted-foreground hover:border-border'
                }`}
              >
                <Checkbox
                  checked={userInput.preferredBranches.includes(branch)}
                  onCheckedChange={() => handleBranchToggle(branch)}
                  className="border-current"
                />
                <span className="text-sm">{branch}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Institute Types */}
        <div className="space-y-3">
          <Label className="text-foreground">Institute Types</Label>
          <div className="flex flex-wrap gap-3">
            {instituteTypes.map((type) => (
              <label
                key={type}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                  userInput.instituteTypes.includes(type)
                    ? 'bg-secondary/20 border-secondary text-secondary'
                    : 'bg-muted/30 border-border/50 text-muted-foreground hover:border-border'
                }`}
              >
                <Checkbox
                  checked={userInput.instituteTypes.includes(type)}
                  onCheckedChange={() => handleInstituteToggle(type)}
                  className="border-current"
                />
                <span className="text-sm font-medium">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || (!userInput.jeeMainsRank && !userInput.jeeAdvancedRank)}
          className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground btn-glow py-6 text-lg font-semibold"
        >
          {isLoading ? (
            <motion.div
              className="flex items-center gap-3"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Rocket className="w-5 h-5 animate-bounce" />
              Calculating Your Orbit...
            </motion.div>
          ) : (
            <span className="flex items-center gap-3">
              <Rocket className="w-5 h-5" />
              Visualize My Future
            </span>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
