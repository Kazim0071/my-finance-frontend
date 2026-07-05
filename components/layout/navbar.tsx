import { authApi } from "@/features/auth/api";
import { useAuth } from "@/features/auth/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h4a1 1 0 001-1V10"
      />
    ),
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 8h13M7 8l3-3M7 8l3 3M17 16H4m13 0l-3-3m3 3l-3 3"
      />
    ),
  },
  {
    href: "/categories",
    label: "Categories",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
      />
    ),
  },
  {
    href: "/reports",
    label: "Reports",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17V9m6 8V5M3 21h18M3 17V13m0 0l3-3 3 2 4-5 5 4"
      />
    ),
  },
];

function initials(first?: string, last?: string) {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "U";
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    try {
      await authApi.logout();
    } catch {}
    setUser(null);
    router.push("/login");
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-lg shadow-slate-200/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Left: brand + links */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h2m4 0h4M5 6h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                />
              </svg>
            </span>
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-xl font-bold tracking-tight text-transparent hidden sm:inline">
              Finlytics
            </span>
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-emerald-500/10 text-emerald-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className={`h-4 w-4 transition-colors ${
                      active ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {link.icon}
                  </svg>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: user profile */}
        <div className="hidden lg:flex items-center gap-4">
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse" />
              <div className="h-5 w-24 rounded-lg bg-slate-200 animate-pulse" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-2 py-1.5 transition-all duration-200 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/10"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-xs font-bold text-white">
                  {initials(user.first_name, user.last_name)}
                </span>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-slate-900">
                    {user.first_name} {user.last_name}
                  </div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m0-9H5a2 2 0 00-2 2v14a2 2 0 002 2h2"
                  />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-sm font-medium text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:border-slate-300 lg:hidden"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white/95 px-4 py-4 lg:hidden">
          <div className="space-y-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-emerald-500/10 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-100/80"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className={`h-5 w-5 ${active ? "text-emerald-600" : "text-slate-400"}`}
                  >
                    {link.icon}
                  </svg>
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
                  <div className="h-3 w-32 rounded bg-slate-200 animate-pulse" />
                </div>
              </div>
            ) : user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 transition-colors hover:bg-slate-100"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-sm font-bold text-white">
                    {initials(user.first_name, user.last_name)}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-100 hover:border-red-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m0-9H5a2 2 0 00-2 2v14a2 2 0 002 2h2"
                    />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="flex-1 rounded-lg px-4 py-2.5 text-center text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">
                  Login
                </Link>
                <Link href="/register" className="flex-1 rounded-lg px-4 py-2.5 text-center text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
