import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import JSConfetti from "js-confetti";
import { BooleanHabitCard } from "../components/habits/boolean-habit-card";
import { CounterHabitCard } from "../components/habits/counter-habit-card";
import { AddNewButtons } from "../components/add-new-buttons";

// Mock habit types and data
const HabitType = {
  BOOLEAN: "BOOLEAN",
  COUNTER: "COUNTER",
};

const mockHabits = [
  {
    _id: "1",
    name: "Read for 5 minutes",
    type: HabitType.BOOLEAN,
    color: "blue",
    completedDates: {},
  },
  {
    _id: "2",
    name: "Drink 8 glasses of water",
    type: HabitType.COUNTER,
    color: "green",
    completedDates: {},
    targetCounter: 8,
  },
];

export function HabitList() {
  const [habits, setHabits] = useState(mockHabits);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const jsConfettiRef = useRef<JSConfetti | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [localCompletionStatus, setLocalCompletionStatus] = useState<
    Record<string, Record<string, number>>
  >({});

  // Simulate habit actions as local state updates
  const trackHabit = async (habitId: string, date: string): Promise<void> => {
    setLocalCompletionStatus((prev) => ({
      ...prev,
      [habitId]: { ...(prev[habitId] || {}), [date]: 1 },
    }));
  };

  const untrackHabit = async (habitId: string, date: string): Promise<void> => {
    setLocalCompletionStatus((prev) => {
      const updated = { ...(prev[habitId] || {}) };
      delete updated[date];
      return { ...prev, [habitId]: updated };
    });
  };

  const incrementHabit = async (habitId: string, date: string): Promise<void> => {
    setLocalCompletionStatus((prev) => ({
      ...prev,
      [habitId]: {
        ...(prev[habitId] || {}),
        [date]: ((prev[habitId]?.[date] || 0) + 1),
      },
    }));
  };

  const decrementHabit = async (habitId: string, date: string): Promise<void> => {
    setLocalCompletionStatus((prev) => {
      const current = prev[habitId]?.[date] || 0;
      return {
        ...prev,
        [habitId]: {
          ...(prev[habitId] || {}),
          [date]: Math.max(0, current - 1),
        },
      };
    });
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
    // Initialize localCompletionStatus for each habit
    setLocalCompletionStatus((prev) => {
      const updated = { ...prev };
      habits.forEach((habit) => {
        if (!updated[habit._id]) {
          updated[habit._id] = { ...habit.completedDates };
        }
      });
      return updated;
    });
  }, [habits]);

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
          {habits.map((habit) => {
            const commonProps = {
              habit: { ...habit, completedDates: localCompletionStatus[habit._id] || {} },
              localCompletionStatus,
              setLocalCompletionStatus,
              jsConfettiRef,
              onClick: () => navigate(`/stats/${habit._id}`),
            };
            switch (habit.type) {
              case HabitType.BOOLEAN:
                return (
                  <BooleanHabitCard
                    key={habit._id}
                    {...commonProps}
                    dates={getLast5Days()}
                    formatDate={formatDate}
                    onTrack={trackHabit}
                    onUntrack={untrackHabit}
                  />
                );
              case HabitType.COUNTER:
                return (
                  <CounterHabitCard
                    key={habit._id}
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
