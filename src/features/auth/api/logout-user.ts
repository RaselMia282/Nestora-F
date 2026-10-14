import { apiClient } from "@/src/lib/ofetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "../types/interface";
import { toast } from "sonner";


const logout = async () => {
  return apiClient("auth/logout", {
    method: "POST",
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, ApiError>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      toast.success("Logged out successfull");
    },
    onError: (error) => {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Logged out failed.Please try again later",
      );
    },
  });
};
