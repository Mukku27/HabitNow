import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton({ onSelect }: { onSelect: () => void }) {
  const handleClick = () => {
    onSelect();
    // Simulate sign out by navigating to the Auth page
    window.location.href = "/auth";
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="flex items-center"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </Button>
  );
}
