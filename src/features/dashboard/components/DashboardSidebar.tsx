"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/src/store/auth-store"; // 
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  CreditCard, 
  Menu, 
  X,
  Home,
  Users,
  ShieldCheck
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  // ─── ১. টেন্যান্টের মেনু ───
  const tenantMenu = [
    { name: "Overview", href: "/dashboard/tenant", icon: LayoutDashboard },
    { name: "My Applications", href: "/dashboard/tenant/applications", icon: FileText },
    { name: "Payments", href: "/dashboard/tenant/payments", icon: CreditCard },
    { name: "My Profile", href: "/dashboard/tenant/profile", icon: User },
  ];

  
  const ownerMenu = [
    { name: "Overview", href: "/dashboard/owner", icon: LayoutDashboard },
    { name: "My Properties", href: "/dashboard/owner/properties", icon: Home },
    { name: "Applications", href: "/dashboard/owner/applications", icon: FileText },
    { name: "My Profile", href: "/dashboard/owner/profile", icon: User },
  ];

  // ─── ৩. অ্যাডমিনের মেনু ───
  const adminMenu = [
    { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "All Users", href: "/dashboard/admin/users", icon: Users },
    { name: "All Applications", href: "/dashboard/admin/applications", icon: FileText },
    { name: "Verifications", href: "/dashboard/admin/verifications", icon: ShieldCheck },
  ];

  
  const getMenu = () => {
    if (user?.role === "OWNER") return ownerMenu;
    if (user?.role === "ADMIN") return adminMenu;
    return tenantMenu; 
  };

  const menuItems = getMenu();

  return (
    <>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#196c51] text-white p-3 rounded-full shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col pt-6">
          
          <div className="px-6 pb-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-sm text-[#196c51] font-medium capitalize">
              {user?.role?.toLowerCase() || "Tenant"} Panel
            </p>
          </div>

          
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // 
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#196c51] text-white"
                      : "text-gray-600 hover:bg-[#196c51]/10 hover:text-[#196c51]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
}