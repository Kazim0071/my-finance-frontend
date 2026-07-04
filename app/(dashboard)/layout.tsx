"use client";
import Navbar from "@/components/layout/navbar";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
