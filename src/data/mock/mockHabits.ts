// import type { Habit } from '@/api/types/appTypes'; // Removed due to TS2307 error
import { HabitColor, HabitType } from "@/api/types/appTypes";

// Helper to generate a year of completion data
function generateCompletedDates({
  year,
  frequency = 0.7, // percent of days completed
  type = "boolean",
  targetCounter = 1,
}: {
  year: number;
  frequency?: number;
  type?: "boolean" | "counter";
  targetCounter?: number;
}): Record<string, number> {
  const completedDates: Record<string, number> = {};
  const now = new Date();
  for (let m = 0; m < 12; m++) {
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = `${year}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      if (Math.random() < frequency) {
        completedDates[date] = type === "counter" ? Math.floor(Math.random() * targetCounter) + 1 : 1;
      } else {
        completedDates[date] = 0;
      }
    }
  }
  // Add some recent streaks
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const key = date.toISOString().slice(0, 10);
    completedDates[key] = type === "counter" ? targetCounter : 1;
  }
  return completedDates;
}

export const mockHabits = [
  {
    _id: "habit-1",
    userId: "demo-user",
    name: "Drink Water",
    description: "Drink at least 8 glasses of water daily.",
    createdAt: new Date(Date.now() - 86400000 * 365).toISOString(),
    updatedAt: new Date().toISOString(),
    color: HabitColor.BLUE,
    icon: "💧",
    type: HabitType.COUNTER,
    targetCounter: 8,
    completedDates: generateCompletedDates({ year: new Date().getFullYear(), frequency: 0.85, type: "counter", targetCounter: 8 }),
    currentStreak: 7,
    longestStreak: 30,
    completionRate7Days: 100,
    completionRateMonth: 90,
    completionRateYear: 85,
  },
  {
    _id: "habit-2",
    userId: "demo-user",
    name: "Morning Walk",
    description: "Go for a 20-minute walk every morning.",
    createdAt: new Date(Date.now() - 86400000 * 300).toISOString(),
    updatedAt: new Date().toISOString(),
    color: HabitColor.GREEN,
    icon: "🚶‍♂️",
    type: HabitType.BOOLEAN,
    targetCounter: 1,
    completedDates: generateCompletedDates({ year: new Date().getFullYear(), frequency: 0.7, type: "boolean" }),
    currentStreak: 5,
    longestStreak: 21,
    completionRate7Days: 71,
    completionRateMonth: 75,
    completionRateYear: 70,
  },
  {
    _id: "habit-3",
    userId: "demo-user",
    name: "Read Books",
    description: "Read at least 10 pages of a book daily.",
    createdAt: new Date(Date.now() - 86400000 * 200).toISOString(),
    updatedAt: new Date().toISOString(),
    color: HabitColor.YELLOW,
    icon: "📚",
    type: HabitType.BOOLEAN,
    targetCounter: 1,
    completedDates: generateCompletedDates({ year: new Date().getFullYear(), frequency: 0.6, type: "boolean" }),
    currentStreak: 2,
    longestStreak: 14,
    completionRate7Days: 57,
    completionRateMonth: 60,
    completionRateYear: 60,
  },
  {
    _id: "habit-4",
    userId: "demo-user",
    name: "Meditate",
    description: "Meditate for 10 minutes every day.",
    createdAt: new Date(Date.now() - 86400000 * 150).toISOString(),
    updatedAt: new Date().toISOString(),
    color: HabitColor.PURPLE,
    icon: "🧘‍♂️",
    type: HabitType.BOOLEAN,
    targetCounter: 1,
    completedDates: generateCompletedDates({ year: new Date().getFullYear(), frequency: 0.5, type: "boolean" }),
    currentStreak: 1,
    longestStreak: 10,
    completionRate7Days: 43,
    completionRateMonth: 50,
    completionRateYear: 50,
  },
  {
    _id: "habit-5",
    userId: "demo-user",
    name: "Write Journal",
    description: "Write a short journal entry every night.",
    createdAt: new Date(Date.now() - 86400000 * 100).toISOString(),
    updatedAt: new Date().toISOString(),
    color: HabitColor.PINK,
    icon: "📓",
    type: HabitType.COUNTER,
    targetCounter: 1,
    completedDates: generateCompletedDates({ year: new Date().getFullYear(), frequency: 0.8, type: "counter", targetCounter: 1 }),
    currentStreak: 6,
    longestStreak: 18,
    completionRate7Days: 86,
    completionRateMonth: 80,
    completionRateYear: 80,
  },
];

export const mockHabitStats = {
  "habit-1": {
    name: "Drink Water",
    type: "counter",
    targetCounter: 8,
    currentStreak: 7,
    longestStreak: 30,
    completionRate7Days: 100,
    completionRateMonth: 90,
    completionRateYear: 85,
    completions: 300,
  },
  "habit-2": {
    name: "Morning Walk",
    type: "boolean",
    targetCounter: undefined,
    currentStreak: 5,
    longestStreak: 21,
    completionRate7Days: 71,
    completionRateMonth: 75,
    completionRateYear: 70,
    completions: 250,
  },
  "habit-3": {
    name: "Read Books",
    type: "boolean",
    targetCounter: undefined,
    currentStreak: 2,
    longestStreak: 14,
    completionRate7Days: 57,
    completionRateMonth: 60,
    completionRateYear: 60,
    completions: 180,
  },
  "habit-4": {
    name: "Meditate",
    type: "boolean",
    targetCounter: undefined,
    currentStreak: 1,
    longestStreak: 10,
    completionRate7Days: 43,
    completionRateMonth: 50,
    completionRateYear: 50,
    completions: 120,
  },
  "habit-5": {
    name: "Write Journal",
    type: "counter",
    targetCounter: 1,
    currentStreak: 6,
    longestStreak: 18,
    completionRate7Days: 86,
    completionRateMonth: 80,
    completionRateYear: 80,
    completions: 220,
  },
}; 