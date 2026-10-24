/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  useGetPendingVerifications,
  useUpdateVerificationStatus,
} from "@/src/features/dashboard/admin/api/admin-overview"; // Make sure the path is correct
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

export default function AdminVerificationsPage() {
  const { data: response, isLoading, isError } = useGetPendingVerifications();
  const { mutate: updateStatus, isPending } = useUpdateVerificationStatus();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // State updated to use VERIFIED instead of APPROVED
  const [selectedApp, setSelectedApp] = useState<{
    id: string;
    status: "VERIFIED" | "REJECTED";
  } | null>(null);

  const verifications = response?.data || [];

  // Status updated to VERIFIED
  const handleActionClick = (id: string, status: "VERIFIED" | "REJECTED") => {
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
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load verifications.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          NID Verifications
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Review and verify user identity cards.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">NID Number</th>
                <th className="px-6 py-4">Images</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {verifications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <ShieldCheck className="w-12 h-12 mb-3 text-gray-300" />
                      <p className="text-lg font-medium text-gray-800">
                        No pending verifications
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                verifications.map((v: any) => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">
                        {v.user?.profile?.firstName || "Unknown"}{" "}
                        {v.user?.profile?.lastName || ""}
                      </p>
                      <p className="text-xs text-gray-500">{v.user?.email}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {v.nidNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {v.nidFrontUrl && (
                          <a
                            href={v.nidFrontUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:underline cursor-pointer"
                          >
                            <ExternalLink className="w-3 h-3" /> Front
                          </a>
                        )}
                        {v.nidBackUrl && (
                          <a
                            href={v.nidBackUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:underline cursor-pointer"
                          >
                            <ExternalLink className="w-3 h-3" /> Back
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleActionClick(v.id, "VERIFIED")} // Updated to VERIFIED
                          className="bg-[#196c51] hover:bg-[#12503b] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleActionClick(v.id, "REJECTED")}
                          className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to{" "}
              {selectedApp?.status === "VERIFIED" ? "approve" : "reject"} this
              NID verification.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending} className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              disabled={isPending}
              className={`${selectedApp?.status === "VERIFIED" ? "bg-[#196c51] hover:bg-[#12503b]" : "bg-red-600 hover:bg-red-700"} cursor-pointer`}
            >
              {isPending ? "Processing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
