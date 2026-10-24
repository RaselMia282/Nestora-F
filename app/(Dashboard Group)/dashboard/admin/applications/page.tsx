/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MapPin, 
  ExternalLink 
} from "lucide-react";
import { useGetAllApplications, useUpdateApplicationStatus } from "@/src/features/dashboard/admin/api/admin-0verview";

export default function AdminApplicationsPage() {
  const { data: response, isLoading, isError } = useGetAllApplications();
  const { mutate: updateStatus, isPending } = useUpdateApplicationStatus();

  
  const applications = response?.data || [];

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

  const handleStatusUpdate = (id: string, status: "APPROVED" | "REJECTED") => {
    const confirmMessage = status === "APPROVED" 
      ? "Are you sure you want to APPROVE this application?" 
      : "Are you sure you want to REJECT this application?";
      
    if (window.confirm(confirmMessage)) {
      updateStatus({ id, status });
    }
  };

  if (isLoading) {
    return <div className="text-center py-20 text-gray-500">Loading applications...</div>;
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500">Failed to load applications.</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Applications</h1>
        <p className="text-gray-500 text-sm mt-1">Review and manage all tenant applications across the platform.</p>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Tenant Info</th>
                <th className="px-6 py-4">Property / Room</th>
                <th className="px-6 py-4">Applied On</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FileText className="w-12 h-12 mb-3 text-gray-300" />
                      <p className="text-lg font-medium text-gray-800">No applications found</p>
                      <p className="text-sm mt-1">There are no tenant applications in the system yet.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                applications.map((app: any) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    
                    {/* Tenant Info */}
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">
                        {app.tenant?.profile?.firstName 
                          ? `${app.tenant.profile.firstName} ${app.tenant.profile.lastName || ""}` 
                          : "Unknown User"}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{app.tenant?.email}</p>
                    </td>

                    {/* Property Info */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">
                        {app.room?.property?.title || "Property"}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-0.5">
                        <MapPin className="w-3 h-3 mr-1" />
                        {app.roomId ? `Room ${app.room?.roomNumber}` : "Entire Property"}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(app.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(app.status)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      {app.status === "PENDING" ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStatusUpdate(app.id, "APPROVED")}
                            disabled={isPending}
                            className="bg-[#196c51] hover:bg-[#12503b] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(app.id, "REJECTED")}
                            disabled={isPending}
                            className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No actions available</span>
                      )}
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