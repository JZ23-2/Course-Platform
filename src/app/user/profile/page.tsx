"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { updateUserProfileAction } from "@/actions/user/user-service";
import { updateProfileInterface } from "@/interface/user/update-profile-interface";
import { useUser } from "@/hooks/useUser";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { name, fetchUserData } = useUser();
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    if (name) {
      setProfileName(name);
    }
  }, [name]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword && !currentPassword) {
      toast.error("You must enter your current password to change it.");
      setLoading(false);
      return;
    }
    const updateData: updateProfileInterface = {
      name: profileName || "",
      email: session?.user.email || "",
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    const res = await updateUserProfileAction(updateData);
    if (res.success) {
      toast.success(res.message);
      fetchUserData();
    } else {
      toast.error(res.message);
    }

    setCurrentPassword("");
    setNewPassword("");
    setLoading(false);
  };

  return (
    <div>
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <form
          onSubmit={handleUpdate}
          className="bg-background border border-border rounded-lg p-6 flex flex-col gap-4 shadow-sm"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={session?.user?.email || ""}
              disabled
              className="bg-muted/20"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium mb-1">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={profileName || ""}
              onChange={(e) => setProfileName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium mb-1"
            >
              Current Password
            </label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Required to change password"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="newPassword" className="text-sm font-medium mb-1">
              New Password
            </label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave empty to keep current password"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </main>
    </div>
  );
}
