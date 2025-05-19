import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../providers/AuthProvider";
import {
  CreateHabitDto,
  UpdateHabitDto,
  HabitsService,
  OpenAPI,
  HabitStatsOutput,
  Habit,
} from "../generated";
import { HabitColor, HabitType } from "../types/appTypes";
import { useCallback, useState } from "react";
import { mockHabits, mockHabitStats } from "@/data/mock/mockHabits";

export function useHabits() {
  const { accessToken, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Demo mode: use local state for habits
  const [habits, setHabits] = useState<typeof mockHabits>(mockHabits);
  const [isLoading, setIsLoading] = useState(false);

  // Set the authorization token for the OpenAPI client
  if (accessToken) {
    OpenAPI.TOKEN = accessToken;
  }

  // Fetch all habits
  const refreshHabits = async (): Promise<void> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setHabits([...mockHabits]);
    setIsLoading(false);
  };

  // Get a single habit by ID
  const getHabitById = async (habitId: string) => {
    return habits.find((h) => h._id === habitId);
  };

  // Get stats for a habit
  const getStats = useCallback(async (habitId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const stat = (mockHabitStats as any)[habitId];
    if (!stat) {
      throw new Error("No stats found for this habit");
    }
    // Ensure all fields are present for HabitStatsOutput
    return {
      name: stat.name,
      type: stat.type,
      targetCounter: stat.targetCounter,
      currentStreak: stat.currentStreak,
      longestStreak: stat.longestStreak,
      completionRate7Days: stat.completionRate7Days,
      completionRateMonth: stat.completionRateMonth,
      completionRateYear: stat.completionRateYear,
      completions: stat.completions,
    };
  }, []);

  // Create a new habit
  const createHabit = async (
    name: string,
    color?: HabitColor,
    type: string = "boolean",
    targetCounter?: number
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newHabit = {
      _id: `habit-${habits.length + 1}`,
      userId: "demo-user",
      name,
      description: "Demo habit created in mock mode.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      color: color || HabitColor.BLUE,
      icon: "✨",
      type: type === "counter" ? HabitType.COUNTER : HabitType.BOOLEAN,
      targetCounter: type === "counter" ? targetCounter || 1 : 1,
      completedDates: {},
      currentStreak: 0,
      longestStreak: 0,
      completionRate7Days: 0,
      completionRateMonth: 0,
      completionRateYear: 0,
    };
    setHabits((prev) => [...prev, newHabit]);
    return newHabit;
  };

  // Update a habit
  const updateHabit = async (habitId: string, data: Partial<typeof mockHabits[0]>) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setHabits((prev) =>
      prev.map((h) => (h._id === habitId ? { ...h, ...data, updatedAt: new Date().toISOString() } : h))
    );
  };

  // Delete a habit
  const deleteHabit = async (habitId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setHabits((prev) => prev.filter((h) => h._id !== habitId));
  };

  // Track/untrack/increment/decrement can be no-ops or update local state as needed
  const trackHabit = async (habitId: string, date: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  };
  const untrackHabit = async (habitId: string, date: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  };
  const incrementHabit = async (habitId: string, date: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  };
  const decrementHabit = async (habitId: string, date: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  };

  return {
    habits,
    isLoading,
    refreshHabits,
    getHabitById,
    getStats,
    createHabit,
    updateHabit,
    deleteHabit,
    trackHabit,
    untrackHabit,
    incrementHabit,
    decrementHabit,
  };
}
