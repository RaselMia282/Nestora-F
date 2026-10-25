"use client";

import { 
  Home, 
  FileText, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Building
} from "lucide-react";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import Spinner from "@/src/Components/shared/Spinner";
import { useGetOwnerOverview } from "@/src/features/dashboard/owner/api/owner-overview";

export default function OwnerOverviewPage() {
  const { data: response, isLoading, isError } = useGetOwnerOverview();
  const data = response?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500">Failed to load dashboard data.</div>;
  }

  const barData = [
    { name: "Properties", count: data?.totalProperties || 0 },
    { name: "Listings", count: data?.totalListings || 0 },
    { name: "Applications", count: data?.totalApplications || 0 },
  ];

  const pieData = [
    { name: "Pending Apps", value: data?.pendingApplications || 0 },
    { name: "Active Leases", value: data?.activeLeases || 0 },
  ];

  const COLORS = ["#f59e0b", "#196c51"];

  return (
    <div className="space-y-6 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Owner Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here is your property management summary.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Properties */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[#196c51]">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Properties</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{data?.totalProperties || 0}</h3>
          </div>
        </div>

        {/* Applications */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Applications</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{data?.totalApplications || 0}</h3>
          </div>
        </div>

        {/* Pending Apps */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pending Apps</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{data?.pendingApplications || 0}</h3>
          </div>
        </div>

        {/* Completed Payments */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Completed Payments</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{data?.completedPayments || 0}</h3>
          </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#196c51]" />
            <h2 className="text-lg font-bold text-gray-800">Property Overview</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#196c51" radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Applications & Leases</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}