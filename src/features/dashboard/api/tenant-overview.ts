/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/ofetch";
export const getTenantOverview = async () => {
  return apiClient("/dashboard/tenant-overview", {
    method: "GET",
  });
};

export const useGetTenantOverview = () => {
  return useQuery({
    queryKey: ["tenant-overview"],
    queryFn: getTenantOverview,
  });
};

export const getTenantPayments = async () => {
  return apiClient("/payment", { method: "GET" });
};

export const useGetTenantPayments = () => {
  return useQuery({
    queryKey: ["tenant-payments"],
    queryFn: getTenantPayments,
  });
};

export const getTenantApplications = async () => {
  return apiClient("/application", { method: "GET" });
};

export const useGetTenantApplications = () => {
  return useQuery({
    queryKey: ["tenant-applications"],
    queryFn: getTenantApplications,
  });
};


export const getMyProfile = async () => {
  return apiClient("/auth/me", { method: "GET" });
};

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
  });
};



import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("profileImg", file);

  return apiClient("/auth/profile-img", {
    method: "PATCH",
    body: formData,
  });
};

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileImage,
    onSuccess: () => {
      toast.success("Profile image updated successfully!");
      
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update profile image. ❌");
    },
  });
};
