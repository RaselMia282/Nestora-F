import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export const getAllRooms = async () => {
  return apiClient("/room?limit=170", {
    method: "GET",
  });
};

export const useGetAllRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getAllRooms,
  });
};
