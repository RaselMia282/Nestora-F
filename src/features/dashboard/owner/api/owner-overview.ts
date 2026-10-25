import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export const getOwnerOverview = async () => {
  return apiClient("/dashboard/owner-overview", { method: "GET" });
};

export const useGetOwnerOverview = () => {
  return useQuery({
    queryKey: ["owner-overview"],
    queryFn: getOwnerOverview,
  });
};

// Get All Properties Hook
export const getOwnerProperties = async () => {
  return apiClient("/properties", { method: "GET" });
};

export const useGetOwnerProperties = () => {
  return useQuery({
    queryKey: ["owner-properties"],
    queryFn: getOwnerProperties,
  });
};


export const getCategories = async () => {
  return apiClient("/property-categories", { method: "GET" });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["property-categories"],
    queryFn: getCategories,
  });
};
