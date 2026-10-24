/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "@/src/lib/ofetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const getAdminOverview = async () => {
  return apiClient("/dashboard/admin-overview", { method: "GET" });
};

export const useGetAdminOverview = () => {
  return useQuery({
    queryKey: ["admin-overview"],
    queryFn: getAdminOverview,
  });
};

export const getAllUsers = async () => {
  return apiClient("/dashboard/users", { method: "GET" });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: getAllUsers,
  });
};

export const getAllApplications = async () => {
  return apiClient("/application", { method: "GET" });
};

export const useGetAllApplications = () => {
  return useQuery({
    queryKey: ["admin-applications"],
    queryFn: getAllApplications,
  });
};

export const updateApplicationStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  return apiClient(`/application/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: () => {
      toast.success("Application status updated successfully!");

      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update status.");
    },
  });
};

// ১. Pending Verifications List Hook
export const getPendingVerifications = async () => {
  return apiClient("/verification/pending-list", { method: "GET" });
};

export const useGetPendingVerifications = () => {
  return useQuery({
    queryKey: ["pending-verifications"],
    queryFn: getPendingVerifications,
  });
};

// ২. Update Verification Status Hook
export const updateVerificationStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  return apiClient(`/verification/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
};

export const useUpdateVerificationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVerificationStatus,
    onSuccess: () => {
      toast.success("Verification status updated successfully! 🎉");
      queryClient.invalidateQueries({ queryKey: ["pending-verifications"] });
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update verification status.");
    },
  });
};
