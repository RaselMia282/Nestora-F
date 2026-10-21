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
