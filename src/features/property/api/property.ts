import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export const getProperty = async (filters?: {
  category?: string;
  page?: number;
  limit?: number;
}) => {
  return apiClient("/properties", {
    method: "GET",
    query: {
      ...filters,
    },
  });
};

export const useGetProperty = (filters?: {
  category?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => getProperty(filters),
  });
};
