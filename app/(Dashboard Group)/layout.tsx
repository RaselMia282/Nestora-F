// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/src/store/auth-store"; // 👈 তোমার Zustand স্টোরের পাথ

// import Spinner from "@/src/Components/shared/Spinner"; // 👈 স্পিনারের পাথ
// import DashboardSidebar from "@/src/features/dashboard/components/DashboardSidebar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const user = useAuthStore((state) => state.user);
//   const hasHydrated = useAuthStore((state) => state.hasHydrated);

//   // ১. ইউজার লগইন না থাকলে লগইন পেজে পাঠাবে
//   useEffect(() => {
//     if (hasHydrated && !user) {
//       router.push("/login"); // 👈 তোমার লগইন পেজের রাউট
//     }
//   }, [user, hasHydrated, router]);

//   // ২. Zustand স্টোর লোড হওয়ার আগে স্পিনার দেখাবে
//   if (!hasHydrated) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Spinner size="lg" />
//       </div>
//     );
//   }

//   // ৩. ইউজার না থাকলে কিছুই রেন্ডার করবে না
//   if (!user) return null;

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* বাম দিকের সাইডবার */}
//       <DashboardSidebar />

//       {/* ডান দিকের মূল কন্টেন্ট */}
//       <main className="flex-1 w-full p-4 lg:p-8 overflow-y-auto">
//         <div className="max-w-7xl mx-auto">{children}</div>
//       </main>
//     </div>
//   );
// }







"use client";

import DashboardSidebar from "@/src/features/dashboard/components/DashboardSidebar";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* বাম দিকের সাইডবার */}
      <DashboardSidebar />

      {/* ডান দিকের মূল কন্টেন্ট */}
      <main className="flex-1 w-full p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}