// Define HabitType locally
const HabitType = {
  BOOLEAN: "BOOLEAN",
  COUNTER: "COUNTER",
};

import CounterHeatmap from "./counter/CounterHeatmap";
import BooleanHeatmap from "./boolean/BooleanHeatmap";
// import { Habit } from "@/api/generated"; // Remove if not needed

interface HeatmapProps {
  readonly habit: any; // Use 'any' or define a local Habit type if needed
}

export default function Heatmap({ habit }: HeatmapProps) {
  switch (habit.type) {
    case HabitType.COUNTER:
      return <CounterHeatmap habit={habit} />;
    case HabitType.BOOLEAN:
      return <BooleanHeatmap habit={habit} />;
    default:
      return null;
  }
}
