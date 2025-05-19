import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { mockUser } from "@/data/mock/mockUser";

interface AccountState {
  showEmailDialog: boolean;
  showPasswordDialog: boolean;
  showDeleteDialog: boolean;
  isLoading: boolean;
  newEmail: string;
  currentPassword: string;
  newPassword: string;
}

interface UserData {
  email: string;
}

export default function Account() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [state, setState] = useState<AccountState>({
    showEmailDialog: false,
    showPasswordDialog: false,
    showDeleteDialog: false,
    isLoading: false,
    newEmail: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      // Simulate async fetch
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUserData({ email: mockUser.email });
      setIsPageLoading(false);
    };
    fetchUserData();
  }, []);

  const resetState = () => {
    setState((prev) => ({
      ...prev,
      showEmailDialog: false,
      showPasswordDialog: false,
      showDeleteDialog: false,
      isLoading: false,
      newEmail: "",
      currentPassword: "",
      newPassword: "",
    }));
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isLoading: true }));
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUserData({ email: state.newEmail });
    toast({
      title: "Email updated",
      description: "Your email has been successfully updated.",
    });
    resetState();
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isLoading: true }));
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast({
      title: "Password updated",
      description: "Your password has been successfully updated.",
    });
    resetState();
  };

  const handleDeleteAccount = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await new Promise((resolve) => setTimeout(resolve, 500));
    await signOut();
    navigate("/auth");
    toast({
      title: "Account deleted",
      description: "Your account has been permanently deleted.",
    });
    resetState();
  };

  const renderEmailDialog = () => (
    <Dialog
      open={state.showEmailDialog}
      onOpenChange={(open) =>
        setState((prev) => ({ ...prev, showEmailDialog: open }))
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Email</DialogTitle>
          <DialogDescription>
            Enter your new email address and current password to confirm the
            change.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdateEmail}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-email">New Email</Label>
              <Input
                id="new-email"
                type="email"
                autoComplete="new-email"
                placeholder="new@example.com"
                value={state.newEmail}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, newEmail: e.target.value }))
                }
                disabled={state.isLoading}
                required
                tabIndex={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-password-email">Current Password</Label>
              <Input
                id="current-password-email"
                type="password"
                autoComplete="current-password"
                value={state.currentPassword}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                disabled={state.isLoading}
                required
                tabIndex={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setState((prev) => ({ ...prev, showEmailDialog: false }))
              }
              disabled={state.isLoading}
              tabIndex={4}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={state.isLoading} tabIndex={3}>
              {state.isLoading ? "Updating..." : "Update Email"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  const renderPasswordDialog = () => (
    <Dialog
      open={state.showPasswordDialog}
      onOpenChange={(open) =>
        setState((prev) => ({ ...prev, showPasswordDialog: open }))
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdatePassword}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                autoComplete="current-password"
                value={state.currentPassword}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                disabled={state.isLoading}
                required
                tabIndex={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={state.newPassword}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, newPassword: e.target.value }))
                }
                disabled={state.isLoading}
                required
                tabIndex={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setState((prev) => ({ ...prev, showPasswordDialog: false }))
              }
              disabled={state.isLoading}
              tabIndex={4}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={state.isLoading} tabIndex={3}>
              {state.isLoading ? "Updating..." : "Update Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  const renderDeleteDialog = () => (
    <AlertDialog
      open={state.showDeleteDialog}
      onOpenChange={(open) =>
        setState((prev) => ({ ...prev, showDeleteDialog: open }))
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="delete-password">Confirm your password</Label>
            <Input
              id="delete-password"
              type="password"
              value={state.currentPassword}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              disabled={state.isLoading}
              required
              tabIndex={1}
              autoComplete="current-password"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={state.isLoading} tabIndex={3}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            disabled={state.isLoading || !state.currentPassword}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            tabIndex={2}
          >
            {state.isLoading ? "Deleting..." : "Delete Account"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (state.isLoading || isPageLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-full max-w-5xl p-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
              <div className="pt-6">
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-2xl p-4">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="flex items-center gap-4">
                <Input
                  value={userData?.email || ""}
                  disabled
                  className="flex-1"
                  tabIndex={-1}
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    setState((prev) => ({ ...prev, showEmailDialog: true }))
                  }
                  disabled={state.isLoading}
                  tabIndex={1}
                >
                  Change
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="password"
                  value="••••••••"
                  disabled
                  className="flex-1"
                  tabIndex={-1}
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    setState((prev) => ({ ...prev, showPasswordDialog: true }))
                  }
                  disabled={state.isLoading}
                  tabIndex={2}
                >
                  Change
                </Button>
              </div>
            </div>

            <div className="pt-6">
              <Button
                variant="destructive"
                onClick={() =>
                  setState((prev) => ({ ...prev, showDeleteDialog: true }))
                }
                disabled={state.isLoading}
                tabIndex={3}
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {renderEmailDialog()}
        {renderPasswordDialog()}
        {renderDeleteDialog()}
      </div>
    </div>
  );
}
