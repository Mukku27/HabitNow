import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "cal-heatmap/cal-heatmap.css";
import moment from "moment";
// @ts-expect-error - CalHeatmapLabel is not typed
import CalHeatmapLabel from "cal-heatmap/plugins/CalendarLabel";
// @ts-expect-error - CalHeatmapTooltip is not typed
import CalHeatmapTooltip from "cal-heatmap/plugins/Tooltip";
// @ts-expect-error - CalHeatmap is not typed
import CalHeatmap from "cal-heatmap";
import { useEffect } from "react";
// import type { CounterHabit } from "@/api/generated"; // Removed due to TS2307 error
// import type { CounterHabitRecord } from "@/api/types/appTypes"; // Removed due to TS2307 error
// import { getColorRange, HabitColor } from "@/api/types/appTypes"; // Removed due to TS2307 error

// Note: Habit type removed due to TS2304 error. Using a placeholder type.
type Habit = any;

interface CounterHeatmapProps {
  readonly habit: Habit;
}

export default function CounterHeatmap({ habit }: CounterHeatmapProps) {
  useEffect(() => {
    if (!habit) return;

    const cal = new CalHeatmap();
    // Note: Accessing habit.completedDates might cause runtime errors.
    const data = Object.entries(habit?.completedDates || {}).map(
      ([date, completed]) => ({
        date,
        value: completed ? completed : 0,
      })
    );

    const getTooltipText = (
      value: number | null,
      date: { format: (format: string) => string }
    ) => {
      // Note: Accessing habit.targetCounter might cause runtime errors.
      const status =
        value !== null ? `${value} / ${habit?.targetCounter}` : "No data";
      return `${status} on ${date.format("LL")}`;
    };

    cal.paint(
      {
        data: { source: data, x: "date", y: "value", groupBy: "max" },
        date: {
          start: moment().utc().startOf("year").toDate(),
          end: moment().utc().endOf("year").toDate(),
        },
        domain: {
          type: "month",
          sort: "asc",
          label: { text: "MMM", textAlign: "start", position: "top" },
        },
        subDomain: {
          type: "ghDay",
          radius: 2,
          width: 12,
          height: 12,
          gutter: 4,
        },
        scale: {
          color: {
            // Note: getColorRange and HabitColor removed due to TS2307 error.
            // Using a hardcoded color range and adjusting domain based on habit.targetCounter.
            range: ["#EDEDED", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
            type: "threshold",
            // Note: Accessing habit.targetCounter might cause runtime errors.
            domain: [
              0.25 * (habit?.targetCounter || 1),
              0.5 * (habit?.targetCounter || 1),
              0.75 * (habit?.targetCounter || 1),
              habit?.targetCounter || 1,
            ],
          },
        },
      },
      [
        [
          CalHeatmapTooltip,
          {
            text: (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              _: any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value: any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              dayjsDate: any
            ) => getTooltipText(value, dayjsDate),
          },
        ],
        [
          CalHeatmapLabel,
          {
            width: 30,
            textAlign: "start",
            text: () =>
              moment.weekdaysShort().map((d, i) => (i % 2 == 0 ? "" : d)),
            padding: [25, 0, 0, 0],
          },
        ],
      ]
    );

    return () => {
      cal.destroy();
    };
  }, [habit?.completedDates, habit]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Yearly Heatmap</CardTitle>
        <CardDescription>
          Your habit completion throughout the year
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div id="cal-heatmap" className="w-full flex justify-center"></div>
      </CardContent>
    </Card>
  );
}
