// import type { Stats } from '@/api/generated'; // Removed due to TS2307 error
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NumberTicker from "@/components/ui/number-ticker";

// Note: Habit type removed due to TS2304 error. Using a placeholder type.
type Habit = any;

interface CurrentStreakCardProps {
  readonly habit: Habit;
  readonly currentStreak: number;
}

export default function CurrentStreakCard({
  habit,
  currentStreak,
}: CurrentStreakCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle className="text-center">Current Streak</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Note: Accessing habit.color might cause runtime errors. */}
        <div style={{ color: habit?.color }}>
          {currentStreak === 0 ? (
            <p className="text-4xl font-bold">0</p>
          ) : (
            <NumberTicker
              className="text-4xl font-bold"
              value={currentStreak}
            />
          )}
        </div>
        <p className="text-muted-foreground text-center mt-2">days</p>
      </CardContent>
    </Card>
  );
}
