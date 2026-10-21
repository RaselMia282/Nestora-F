"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useAuthStore, type User } from "@/src/store/auth-store";
import { useLogout } from "@/src/features/auth/api/logout-user";
import { useAuthStore, User } from "@/src/store/auth-store";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Find Properties", href: "/properties" },
  { label: "Find Rooms", href: "/rooms" },
  { label: "For Property Owners", href: "/for-owners" },
];

const ROLE_LINKS: Record<User["role"], { label: string; href: string }[]> = {
  ADMIN: [
    { label: "Admin Dashboard", href: "/admin/dashboard" },
    { label: "Manage Users", href: "/admin/users" },
    { label: "Manage Listings", href: "/admin/listings" },
  ],
  OWNER: [
    { label: "Dashboard", href: "/owner/dashboard" },
    { label: "My Properties", href: "/owner/properties" },
    { label: "Add Property", href: "/owner/properties/new" },
  ],
  TENANT: [{ label: "Dashboard", href: "/dashboard/tenant" }],

  MANAGER: [{ label: "Dashboard", href: "/manager/dashboard" }],
};

const ROLE_LABEL: Record<User["role"], string> = {
  ADMIN: "Admin",
  OWNER: "Property Owner",
  TENANT: "Tenant",
  MANAGER: "Manager",
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const { mutate: logoutResponse, isPending } = useLogout();

  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const logout = useAuthStore((s) => s.logout);

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setMobileOpen(false);
  }

  const handleLogout = () => {
    logoutResponse(undefined, {
      onSuccess: () => {
        logout();
        setMenuOpen(false);
        setMobileOpen(false);
        router.push("/login");
      },
      onError: () => {
        logout();
        setMenuOpen(false);
        setMobileOpen(false);
        router.push("/login");
      },
    });
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");
  const initial = user?.email?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-50 border-b border-[#dcebdc] bg-[#f3faf3]/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
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

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-sm transition-colors hover:text-[#2f6b57] ${
                  isActive(link.href)
                    ? "font-semibold text-[#2f6b57]"
                    : "text-[#3d4f47]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {!hasHydrated ? (
            <div
              className="h-9 w-36 animate-pulse rounded-md bg-[#e1efe1]"
              aria-hidden="true"
            />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="flex items-center gap-2 rounded-full p-0.5 pr-2 transition hover:bg-[#e1efe1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6b57]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2f6b57] text-sm font-semibold text-white">
                  {initial}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 text-[#3d4f47] transition-transform ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-[#dcebdc] bg-white shadow-lg"
                >
                  <div className="border-b border-[#eef5ee] px-4 py-3">
                    <p className="truncate text-sm font-medium text-[#16251f]">
                      {user.email}
                    </p>
                    <p className="mt-0.5 text-xs text-[#6b7c74]">
                      {ROLE_LABEL[user.role]}
                    </p>
                  </div>

                  <div className="py-1">
                    {ROLE_LINKS[user.role].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-[#3d4f47] hover:bg-[#f3faf3] hover:text-[#2f6b57]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-[#eef5ee] py-1">
                    <button
                      type="button"
                      disabled={isPending}
                      role="menuitem"
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 cursor-pointer disabled:opacity-50"
                    >
                      {isPending ? "Logging out..." : "Log Out"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-medium text-[#3d4f47] hover:text-[#2f6b57] sm:inline"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-[#2f6b57] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#265746] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6b57]"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Hamburger (mobile) */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="rounded-md p-2 text-[#3d4f47] hover:bg-[#e1efe1] md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[#dcebdc] bg-[#f3faf3] md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-3 text-sm ${
                    isActive(link.href)
                      ? "font-semibold text-[#2f6b57]"
                      : "text-[#3d4f47]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {hasHydrated && !user && (
              <li>
                <Link
                  href="/login"
                  className="block py-3 text-sm text-[#3d4f47]"
                >
                  Log In
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
