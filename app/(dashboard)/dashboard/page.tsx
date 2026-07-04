"use client";
import { useAuth } from "@/features/auth/AuthContext";
import React from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  return <main className="min-h-screen bg-slate-50 p-8">
    <h1 className="text-2xl font-bold text-slate-900">
        Welcome, {user?.first_name}
    </h1>
    <p className="mt-2 text-slate-500">Your dashboard is coming together.</p>
  </main>;
}
