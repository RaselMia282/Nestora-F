import { apiClient } from "@/src/lib/ofetch";
import { LoginUserInput } from "../schema/login-schema";
import { ApiError, LoginApiResponse } from "../types/interface";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const login = async (payload: LoginUserInput): Promise<LoginApiResponse> => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const useLogin = () => {
  return useMutation<LoginApiResponse, ApiError, LoginUserInput>({
    mutationFn: login,
    onSuccess: (res) => {
      toast.success(res.message || "Login successful");
    },

    onError: (error) => {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Something went wrong.Please try again";

      toast.error(errorMessage);
    },
  });
};
