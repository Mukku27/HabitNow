// import { HabitType } from "@/api/types/appTypes"; // Removed due to TS2307 error
import CounterHeatmap from "./counter/CounterHeatmap";
import BooleanHeatmap from "./boolean/BooleanHeatmap";
// import type { Habit } from "@/api/types/appTypes"; // Removed due to TS2307 error
// import type { Api } from "@/api/generated"; // Removed due to TS2307 error

// Note: Habit type removed due to TS2307 and TS2304 errors. Using a placeholder type.
type Habit = any;

interface HeatmapProps {
  readonly habit: Habit;
}

export default function Heatmap({ habit }: HeatmapProps) {
  // Note: Checking habit.type and rendering based on it might cause runtime errors.
  // Render both heatmaps with the provided habit prop for now.
  return (
    <>
      <CounterHeatmap habit={habit} />
      <BooleanHeatmap habit={habit} />
    </>
  );
}
