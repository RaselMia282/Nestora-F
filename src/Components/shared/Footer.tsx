import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Properties", href: "/properties" },
      { label: "Roommates", href: "/roommates" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "For Owners",
    links: [
      { label: "List Your Property", href: "/owner/properties/new" },
      { label: "Manage Listings", href: "/owner/properties" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Help Center", href: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#dcebdc] bg-[#eef5ee]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="Nestora home"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2f6b57] text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 10.5 12 3l9 7.5" />
                  <path d="M5 9.5V20h14V9.5" />
                  <path d="M10 20v-5h4v5" />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-tight text-[#16251f]">
                Nestora
              </span>
            </Link>
            <p className="mt-4 max-w-56 text-sm leading-relaxed text-[#3d4f47]">
              Helping people find better homes and more compatible roommates.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold text-[#16251f]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#3d4f47] transition-colors hover:text-[#2f6b57]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#dcebdc] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-[#3d4f47]">
            © 2026 Nestora Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-[#3d4f47]">
            {/* Language / website */}
            <button
              type="button"
              aria-label="Change language"
              className="rounded-md p-1 transition-colors hover:text-[#2f6b57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6b57]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" />
              </svg>
            </button>

            {/* Chat / support */}
            <Link
              href="/help"
              aria-label="Chat with support"
              className="rounded-md p-1 transition-colors hover:text-[#2f6b57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6b57]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
                <path d="M20 9h0a2 2 0 0 1 2 2v7l-3-2" />
              </svg>
            </Link>

            {/* Email */}
            <a
              href="mailto:hello@nestora.com"
              aria-label="Email Nestora"
              className="rounded-md p-1 transition-colors hover:text-[#2f6b57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6b57]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
