"use client";

import { useState } from "react";
import { EditProfileForm } from "@/features/auth/components/EditProfileForm";
import { ChangePasswordForm } from "@/features/auth/components/ChangePasswordForm";
import { authApi } from "@/features/auth/api";
import { useAuth } from "@/features/auth/AuthContext";
import { EditProfileForm as EditProfileFormValues } from "@/features/auth/schema";
import { ChangePasswordForm as ChangePasswordFormValues } from "@/features/auth/schema";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [profileSubmitting, setProfileSubmitting] = useState(false);
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleProfileSubmit(data: EditProfileFormValues) {
    setProfileSubmitting(true);
    setProfileError("");
    setProfileSuccess("");
    try {
      const res = await authApi.updateProfile(data);
      setUser(res.user);
      setProfileSuccess("Profile updated successfully");
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setProfileSubmitting(false);
    }
  }

  async function handlePasswordSubmit(data: ChangePasswordFormValues) {
    setPasswordSubmitting(true);
    setPasswordError("");
    setPasswordSuccess("");
    try {
      await authApi.changePassword(data);
      setPasswordSuccess("Password updated successfully");
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setPasswordSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account details and password.
        </p>
      </div>

      {/* User info card */}
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">
          {user?.first_name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-slate-900">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-sm text-slate-500">{user?.email}</p>
        </div>
      </div>

      {/* Edit profile */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-base font-semibold text-slate-900">
          Edit profile
        </h2>

        {profileSuccess && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-700">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {profileSuccess}
          </div>
        )}

        {profileError && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
            <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {profileError}
          </div>
        )}

        <EditProfileForm
          onSubmit={handleProfileSubmit}
          isSubmitting={profileSubmitting}
        />
      </div>

      {/* Change password */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-base font-semibold text-slate-900">
          Change password
        </h2>

        {passwordSuccess && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-700">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {passwordSuccess}
          </div>
        )}

        {passwordError && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
            <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {passwordError}
          </div>
        )}

        <ChangePasswordForm
          onSubmit={handlePasswordSubmit}
          isSubmitting={passwordSubmitting}
        />
      </div>
    </div>
  );
}