"use client";

import { 
  Home, 
  FileText, 
  CreditCard, 
  Heart, 
  ArrowRight,
  CheckCircle2,
  Clock,
  User
} from "lucide-react";
import Link from "next/link";
import { 
  useGetTenantOverview, 
  useGetTenantApplications 
} from "@/src/features/dashboard/api/tenant-overview";
import Spinner from "@/src/Components/shared/Spinner";

export default function TenantOverviewPage() {
  const { data: response, isLoading } = useGetTenantOverview();
  const { data: appResponse, isLoading: appLoading } = useGetTenantApplications();
  
  const data = response?.data;
  const applications = appResponse?.data || []; 

  if (isLoading || appLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="space-y-6">
      
      {/* 1. Welcome Banner */}
      <div className="relative bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 md:p-8 border border-emerald-100 flex items-center justify-between overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#196c51]">Welcome back! 👋</h1>
          <p className="text-[#196c51]/80 mt-2 max-w-md">
            Here's what's happening with your rental journey today.
          </p>
        </div>
        <div className="hidden md:block relative z-10 text-4xl">🏡</div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[#196c51]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">My Applications</p>
              <h3 className="text-xl font-bold text-gray-800">{applications.length}</h3>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Lease</p>
              <h3 className="text-xl font-bold text-gray-800">{data?.activeLease ? "1" : "0"}</h3>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Next Rent Due</p>
              <h3 className="text-xl font-bold text-gray-800">৳ {data?.monthlyRent || 0}</h3>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Saved Listings</p>
              <h3 className="text-xl font-bold text-gray-800">0</h3>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* বাম দিক (Recent Applications) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                Recent Applications
              </h2>
              <Link href="/dashboard/tenant/applications" className="text-sm text-[#196c51] hover:underline font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-5 py-3">Property / Room</th>
                    <th className="px-5 py-3">Type</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-gray-500">
                        No applications found.
                      </td>
                    </tr>
                  ) : (
                    applications.slice(0, 5).map((app: any) => (
                      <tr key={app.id}>
                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-800">
                            {app.room?.property?.title || "Property"} - Room {app.room?.roomNumber}
                          </p>
                          <p className="text-xs text-gray-500">{app.room?.property?.city}</p>
                        </td>
                        <td className="px-5 py-4">{app.roomId ? "Room" : "Property"}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                            app.status === "APPROVED" ? "bg-green-100 text-green-700" :
                            app.status === "REJECTED" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {app.status === "APPROVED" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {app.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button className="text-[#196c51] font-medium hover:underline">View</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ডান দিক (Quick Actions) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-[#196c51]" /> Upcoming Payment
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-sm text-gray-500">Rent Payment</p>
              <p className="text-xl font-bold text-gray-800 mt-1">৳ {data?.monthlyRent || 0}</p>
              <button className="w-full mt-3 bg-[#196c51] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#12503b] transition-colors">
                Pay Now
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/properties" className="flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Home className="w-4 h-4 text-gray-500" /> Search Properties
              </Link>
              <Link href="/rooms" className="flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Home className="w-4 h-4 text-gray-500" /> Search Rooms
              </Link>
              <Link href="/dashboard/tenant/profile" className="flex items-center gap-3 p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <User className="w-4 h-4 text-gray-500" /> Update Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}