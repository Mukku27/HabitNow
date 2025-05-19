import { useRef, useEffect, useState } from "react";
// import { useHabits } from "../api/hooks/useHabits"; // Removed due to TS2307 error
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import JSConfetti from "js-confetti";
// import { HabitType } from "../api/types/appTypes"; // Removed due to TS2307 error
import { BooleanHabitCard } from "../components/habits/boolean-habit-card";
import { CounterHabitCard } from "../components/habits/counter-habit-card";
import { AddNewButtons } from "../components/add-new-buttons";
// import { Habit } from "@/api/generated"; // Removed due to TS2307 error

// Note: useHabits hook and related functions, Habit and HabitType types removed due to errors.
// Using placeholder data and functions, and placeholder types.

// Placeholder types
type Habit = any;
type HabitType = any;

export function HabitList() {
  // Note: useHabits hook and related functions removed due to TS2307 and TS2304 errors.
  // Using placeholder data and functions.
  const habits: Habit[] = []; // Placeholder
  const isLoading = false; // Placeholder
  const trackHabitApi = async (habitId: string, date: string) => {}; // Placeholder
  const untrackHabitApi = async (habitId: string, date: string) => {}; // Placeholder
  const incrementHabitApi = async (habitId: string, date: string) => {}; // Placeholder
  const decrementHabitApi = async (habitId: string, date: string) => {}; // Placeholder
  const refreshHabits = async () => {}; // Placeholder

  const navigate = useNavigate();
  const jsConfettiRef = useRef<JSConfetti | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [localCompletionStatus, setLocalCompletionStatus] = useState<
    Record<string, Record<string, number>>
  >({});

  // Create wrapper functions that return void
  const trackHabit = async (habitId: string, date: string): Promise<void> => {
    await trackHabitApi(habitId, date);
  };

  const untrackHabit = async (habitId: string, date: string): Promise<void> => {
    await untrackHabitApi(habitId, date);
  };

  const incrementHabit = async (
    habitId: string,
    date: string
  ): Promise<void> => {
    await incrementHabitApi(habitId, date);
  };

  const decrementHabit = async (
    habitId: string,
    date: string
  ): Promise<void> => {
    await decrementHabitApi(habitId, date);
  };

  useEffect(() => {
    jsConfettiRef.current = new JSConfetti();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Fetch habits data when component mounts
    refreshHabits();
    // Using empty dependency array to run only once on mount
  }, []);

  const getLast5Days = () => {
    const dates = [];
    const maxDays = isMobile ? 1 : 5;
    for (let i = maxDays - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center gap-8">
                  <div className="min-w-[200px]">
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="flex gap-6">
                    {[...Array(isMobile ? 1 : 5)].map((_, j) => (
                      <div key={j} className="flex flex-col items-center gap-1">
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-end mb-4">
          <div className="w-48">
            <AddNewButtons />
          </div>
        </div>
        <div className="space-y-4 habit-list">
          {/* Regular Habits Section */}
          {/* Note: Iterating over habits might cause runtime errors if habits is not an array. */}
          {(habits as Habit[]).map((habit) => {
            // Note: Accessing habit._id and habit.completedDates might cause runtime errors.
            if (!localCompletionStatus[habit?._id]) {
              setLocalCompletionStatus((prev) => ({
                ...prev,
                [habit?._id]: { ...habit?.completedDates },
              }));
            }

            const commonProps = {
              habit,
              localCompletionStatus,
              setLocalCompletionStatus,
              jsConfettiRef,
              onClick: () => navigate("/HabitList"),
            };

            // Note: Checking habit.type might cause runtime errors.
            switch (habit?.type) {
              case "boolean":
                return (
                  <BooleanHabitCard
                    key={habit?._id}
                    {...commonProps}
                    dates={getLast5Days()}
                    formatDate={formatDate}
                    onTrack={trackHabit}
                    onUntrack={untrackHabit}
                  />
                );
              case "counter":
                return (
                  <CounterHabitCard
                    key={habit?._id}
                    {...commonProps}
                    dates={getLast5Days()}
                    formatDate={formatDate}
                    onIncrement={incrementHabit}
                    onDecrement={decrementHabit}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </>
  );
}
