"use client";

import { 
  FileText, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  XCircle 
} from "lucide-react";
import Link from "next/link";
import { useGetTenantApplications } from "@/src/features/dashboard/api/tenant-overview";

export default function TenantApplicationsPage() {
  const { data: response, isLoading, isError } = useGetTenantApplications();
  
  // API রেসপন্স থেকে ডেটা নেওয়া
  const applications = response?.data || [];

  // স্ট্যাটাস অনুযায়ী কালার এবং আইকন ঠিক করা
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle2 className="w-3 h-3" /> Approved
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">Loading applications...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load applications. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
        <p className="text-gray-500 text-sm mt-1">
          Track the status of your rental applications.
        </p>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Property / Room</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Applied On</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FileText className="w-12 h-12 mb-3 text-gray-300" />
                      <p className="text-lg font-medium text-gray-800">No applications yet</p>
                      <p className="text-sm mt-1 mb-4">You haven't applied for any properties or rooms.</p>
                      <Link 
                        href="/properties" 
                        className="bg-[#196c51] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#12503b] transition-colors"
                      >
                        Browse Properties
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                applications.map((app: any) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">
                        {app.room?.property?.title || "Property"}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {app.room?.property?.address}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                        {app.roomId ? `Room ${app.room?.roomNumber}` : "Property"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(app.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/properties/${app.room?.propertyId || app.propertyId}`}
                        className="text-[#196c51] font-medium hover:underline"
                      >
                        View Property
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}