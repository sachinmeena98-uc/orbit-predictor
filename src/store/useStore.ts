import { create } from 'zustand';
import { College, PredictionConfidence } from '@/data/colleges';

export interface PredictedCollege extends College {
  confidence: PredictionConfidence;
  matchingBranch: string;
}

interface UserInput {
  jeeMainsRank: number | null;
  jeeAdvancedRank: number | null;
  category: string;
  homeState: string;
  gender: string;
  preferredBranches: string[];
  instituteTypes: string[];
}

interface AppState {
  // User inputs
  userInput: UserInput;
  setUserInput: (input: Partial<UserInput>) => void;
  
  // Predictions
  predictedColleges: PredictedCollege[];
  setPredictedColleges: (colleges: PredictedCollege[]) => void;
  
  // Selected college for detail view
  selectedCollege: PredictedCollege | null;
  setSelectedCollege: (college: PredictedCollege | null) => void;
  
  // Comparison
  comparisonColleges: PredictedCollege[];
  addToComparison: (college: PredictedCollege) => void;
  removeFromComparison: (collegeId: string) => void;
  clearComparison: () => void;
  
  // UI state
  showVisualization: boolean;
  setShowVisualization: (show: boolean) => void;
  
  // Reset
  resetAll: () => void;
}

const initialUserInput: UserInput = {
  jeeMainsRank: null,
  jeeAdvancedRank: null,
  category: 'OPEN',
  homeState: '',
  gender: 'Male',
  preferredBranches: ['Computer Science'],
  instituteTypes: ['IIT', 'NIT', 'IIIT', 'GFTI'],
};

export const useStore = create<AppState>((set) => ({
  userInput: initialUserInput,
  setUserInput: (input) =>
    set((state) => ({
      userInput: { ...state.userInput, ...input },
    })),

  predictedColleges: [],
  setPredictedColleges: (colleges) => set({ predictedColleges: colleges }),

  selectedCollege: null,
  setSelectedCollege: (college) => set({ selectedCollege: college }),

  comparisonColleges: [],
  addToComparison: (college) =>
    set((state) => {
      if (state.comparisonColleges.length >= 4) return state;
      if (state.comparisonColleges.find((c) => c.id === college.id)) return state;
      return { comparisonColleges: [...state.comparisonColleges, college] };
    }),
  removeFromComparison: (collegeId) =>
    set((state) => ({
      comparisonColleges: state.comparisonColleges.filter((c) => c.id !== collegeId),
    })),
  clearComparison: () => set({ comparisonColleges: [] }),

  showVisualization: false,
  setShowVisualization: (show) => set({ showVisualization: show }),

  resetAll: () =>
    set({
      userInput: initialUserInput,
      predictedColleges: [],
      selectedCollege: null,
      comparisonColleges: [],
      showVisualization: false,
    }),
}));
