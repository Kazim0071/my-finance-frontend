import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Security", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookie Policy", href: "#" },
      { label: "Disclaimer", href: "#" },
    ],
  };

  return (
    <footer className="mt-auto w-full border-t border-slate-100 bg-gradient-to-b from-white/95 to-white py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 mb-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/dashboard" className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-500/30 flex-shrink-0">
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
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-base sm:text-lg font-bold tracking-tight text-transparent">
                Finlytics
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mb-4 sm:mb-6">
              Simplify your finances with intelligent tracking, insightful analytics, and effortless management.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 flex-shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20v-7.21H5.93V9.98h2.36V8.41c0-2.33 1.43-3.61 3.48-3.61 1 0 1.86.07 2.11.1v2.44h-1.44c-1.13 0-1.35.54-1.35 1.32v1.73h2.69l-.35 2.81h-2.34V20h-2.83z" />
                </svg>
              </a>
              <a href="#" className="inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 flex-shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-2 7-2z" />
                </svg>
              </a>
              <a href="#" className="inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 flex-shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="sm:col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-900 mb-3 sm:mb-4 uppercase tracking-wider">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-600 hover:text-emerald-600 transition-colors duration-200 line-clamp-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="sm:col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-900 mb-3 sm:mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-600 hover:text-emerald-600 transition-colors duration-200 line-clamp-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="sm:col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-900 mb-3 sm:mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-600 hover:text-emerald-600 transition-colors duration-200 line-clamp-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 pt-6 sm:pt-8">
          {/* Footer Bottom */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
            <p className="text-xs sm:text-sm text-slate-600">
              © {year} <span className="font-semibold text-slate-900">Finlytics</span>. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              Built with <span className="text-red-500">♥</span> for better financial management
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
