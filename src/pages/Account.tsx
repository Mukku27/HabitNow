import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData>({ email: "demo@habitnow.com" });
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [state, setState] = useState<AccountState>({
    showEmailDialog: false,
    showPasswordDialog: false,
    showDeleteDialog: false,
    isLoading: false,
    newEmail: "",
    currentPassword: "",
    newPassword: "",
  });

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
    setTimeout(() => {
      setUserData({ email: state.newEmail });
      toast({
        title: "Email updated",
        description: "Your email has been successfully updated.",
      });
      resetState();
    }, 800);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });
      resetState();
    }, 800);
  };

  const handleDeleteAccount = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      navigate("/auth");
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });
      resetState();
    }, 800);
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
                onChange={(e) => setState((prev) => ({ ...prev, newPassword: e.target.value }))}
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
          <AlertDialogCancel
            onClick={() =>
              setState((prev) => ({ ...prev, showDeleteDialog: false }))
            }
            disabled={state.isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            disabled={state.isLoading}
          >
            {state.isLoading ? "Deleting..." : "Delete Account"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (isPageLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-12 w-1/2 mb-2" />
        <Skeleton className="h-12 w-1/3" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Email</Label>
            <div className="flex items-center gap-4 mt-2">
              <span className="font-medium">{userData.email}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setState((prev) => ({ ...prev, showEmailDialog: true }))}
              >
                Change Email
              </Button>
            </div>
          </div>
          <div>
            <Label>Password</Label>
            <div className="flex items-center gap-4 mt-2">
              <span className="font-medium">********</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setState((prev) => ({ ...prev, showPasswordDialog: true }))}
              >
                Change Password
              </Button>
            </div>
          </div>
          <div>
            <Label>Danger Zone</Label>
            <div className="flex items-center gap-4 mt-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setState((prev) => ({ ...prev, showDeleteDialog: true }))}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {renderEmailDialog()}
      {renderPasswordDialog()}
      {renderDeleteDialog()}
    </div>
  );
}
