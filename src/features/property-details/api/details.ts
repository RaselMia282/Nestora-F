import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export const propertyDetails = async (id: string) => {
  return apiClient(`properties/${id}`, {
    method: "GET",
  });
};

export const usePropertyDetails = (id: string) => {
  return useQuery({
    queryKey: ["properties", id],
    queryFn: () => propertyDetails(id),
    enabled: !!id,
  });
};
