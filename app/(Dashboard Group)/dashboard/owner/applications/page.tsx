/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MapPin 
} from "lucide-react";

import Spinner from "@/src/Components/shared/Spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGetAllApplications, useUpdateApplicationStatus } from "@/src/features/dashboard/admin/api/admin-overview";

export default function OwnerApplicationsPage() {
  const { data: response, isLoading, isError } = useGetAllApplications();
  const { mutate: updateStatus, isPending } = useUpdateApplicationStatus();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<{ id: string; status: "APPROVED" | "REJECTED" } | null>(null);

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

  const handleActionClick = (id: string, status: "APPROVED" | "REJECTED") => {
    setSelectedApp({ id, status });
    setIsDialogOpen(true);
  };

  const confirmAction = () => {
    if (selectedApp) {
      updateStatus(selectedApp);
      setIsDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500">Failed to load applications.</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Applications</h1>
        <p className="text-gray-500 text-sm mt-1">Review and manage tenant applications for your properties.</p>
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
                      <p className="text-sm mt-1">You have no tenant applications at the moment.</p>
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
                        {app.room?.property?.title || app.property?.title || "Property"}
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
                            onClick={() => handleActionClick(app.id, "APPROVED")}
                            className="bg-[#196c51] hover:bg-[#12503b] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleActionClick(app.id, "REJECTED")}
                            className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
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

      {/* Alert Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will {selectedApp?.status === "APPROVED" ? "approve" : "reject"} the application. 
              This will notify the tenant and cannot be undone easily.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending} className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmAction}
              disabled={isPending}
              className={`${selectedApp?.status === "APPROVED" ? "bg-[#196c51] hover:bg-[#12503b]" : "bg-red-600 hover:bg-red-700"} cursor-pointer`}
            >
              {isPending ? "Processing..." : "Yes, Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}