import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CollegeListPanel() {
  const { predictedColleges, selectedCollege, setSelectedCollege } = useStore();

  // Group colleges by type
  const groupedColleges = predictedColleges.reduce((acc, college) => {
    if (!acc[college.type]) {
      acc[college.type] = [];
    }
    acc[college.type].push(college);
    return acc;
  }, {} as Record<string, typeof predictedColleges>);

  const typeOrder = ['IIT', 'NIT', 'IIIT', 'GFTI'];

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-border/30">
        <h3 className="text-xl font-display font-bold text-foreground">
          College List
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {predictedColleges.length} matches found
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {typeOrder.map((type) => {
            const colleges = groupedColleges[type];
            if (!colleges || colleges.length === 0) return null;

            return (
              <div key={type} className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        type === 'IIT'
                          ? '#ff5722'
                          : type === 'NIT'
                          ? '#00bcd4'
                          : type === 'IIIT'
                          ? '#9c27b0'
                          : '#ffc107',
                    }}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {type}s ({colleges.length})
                  </span>
                </div>

                <div className="space-y-2">
                  {colleges.map((college, index) => (
                    <motion.button
                      key={`${college.id}-${college.matchingBranch}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedCollege(college)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedCollege?.id === college.id &&
                        selectedCollege?.matchingBranch === college.matchingBranch
                          ? 'bg-secondary/20 border-secondary'
                          : 'bg-muted/20 border-border/30 hover:bg-muted/40 hover:border-border/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {college.shortName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {college.matchingBranch}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{college.location.city}</span>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium border ${
                            college.confidence === 'safe'
                              ? 'badge-safe'
                              : college.confidence === 'moderate'
                              ? 'badge-moderate'
                              : 'badge-ambitious'
                          }`}
                        >
                          {college.confidence}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
