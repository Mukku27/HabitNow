import { Card, CardContent } from "@/components/ui/card";
// Define HabitType locally
const HabitType = {
  BOOLEAN: "BOOLEAN",
  COUNTER: "COUNTER",
};
import { isAfter, format } from "date-fns";
import { startOfDay } from "date-fns";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
// import { Habit } from "@/api/generated"; // Remove if not needed

interface CalendarProps {
  readonly habit: any; // Use 'any' or define a local Habit type if needed
}

export default function Calendar({ habit }: CalendarProps) {
  const [localCompletionStatus, setLocalCompletionStatus] = useState(
    habit.completedDates
  );

  // Update local state when habit changes
  useEffect(() => {
    setLocalCompletionStatus(habit.completedDates);
  }, [habit.completedDates]);

  const completedDates = Object.entries(localCompletionStatus)
    .filter(([, value]) => value > 0)
    .map(([date]) => new Date(date));

  const handleDayClick = async (day: Date) => {
    if (habit.type === HabitType.COUNTER) {
      return null;
    }

    if (isAfter(startOfDay(day), startOfDay(new Date()))) {
      return;
    }

    const formattedDate = format(day, "yyyy-MM-dd");
    const isCompleted = localCompletionStatus[formattedDate] > 0;

    // Optimistically update UI
    setLocalCompletionStatus((prev: any) => ({
      ...prev,
      [formattedDate]: isCompleted ? 0 : 1,
    }));
  };

  return (
    <Card className="col-span-1 md:col-span-1">
      <CardContent className="flex justify-center items-center">
        <DayPicker
          mode="multiple"
          selected={completedDates}
          modifiers={{ completed: completedDates }}
          modifiersStyles={{
            completed: {
              backgroundColor: habit.color,
              color: "black",
              fontWeight: "500",
              transform: "scale(0.75)",
            },
          }}
          onDayClick={handleDayClick}
          disabled={[{ after: new Date() }]}
          className="mx-auto dark:rdp-day_selected:text-background"
        />
      </CardContent>
    </Card>
  );
}
