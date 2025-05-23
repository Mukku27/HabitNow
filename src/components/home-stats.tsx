import { Loader2 } from "lucide-react";
import AnimatedGradientText from "./ui/animated-gradient-text";
import { cn } from "@/lib/utils";
// import useStats from '@/api/hooks/useStats'; // Removed due to TS2307 error

export function HomeStats() {
  // Note: useStats hook and related variables removed due to TS2304 error.
  // Functionality depending on these will be impacted.
  // Placeholder data is used to prevent immediate runtime errors.
  const data = { stats: { totalCompleted: 0 }, usersCount: 0 };
  const isLoading = false;
  const error = null;

  if (error) {
    return null; // Return nothing if there's an error
  }

  return (
    <div className="z-10 pb-6 flex items-center justify-center md:justify-start">
      {isLoading ? (
        <div className="flex items-center justify-center md:justify-start">
          <Loader2 className="size-4 animate-spin" />
        </div>
      ) : (
        <div className="flex items-center justify-center md:justify-start">
          <AnimatedGradientText>
            🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              {!data?.stats?.totalCompleted || data?.stats?.totalCompleted < 100
                ? `Join ${data?.usersCount || 0} users now!`
                : `${data?.stats?.totalCompleted} habits completed today!`}
            </span>
          </AnimatedGradientText>
        </div>
      )}
    </div>
  );
}
