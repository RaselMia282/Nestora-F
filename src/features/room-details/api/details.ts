import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export const getSingleRoom = async (id: string) => {
  return apiClient(`/room/${id}`, {
    method: "GET",
  });
};

export const useGetSingleRoom = (id: string) => {
  return useQuery({
    queryKey: ["room", id],
    queryFn: () => getSingleRoom(id),
    enabled: !!id, 
  });
};