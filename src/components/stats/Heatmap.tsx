import { HabitType } from "@/api/types/appTypes";
import CounterHeatmap from "./counter/CounterHeatmap";
import BooleanHeatmap from "./boolean/BooleanHeatmap";
// import type { Habit } from '@/api/types/appTypes'; // Removed due to TS2307 error
// import type { Api } from '@/api/generated'; // Removed due to TS2307 error

interface HeatmapProps {
  readonly habit: Habit;
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
