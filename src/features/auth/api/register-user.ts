import { apiClient } from "@/src/lib/ofetch";
import { RegisterUserInput } from "../schema/register-schema";
import { ApiError, RegisterApiResponse } from "../types/interface";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const register = async (
  payload: RegisterUserInput,
): Promise<RegisterApiResponse> => {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const useRegister = () => {
  return useMutation<RegisterApiResponse, Error, RegisterUserInput>({
    mutationFn: register,
    onSuccess: (response: RegisterApiResponse) => {
      toast.success(response.message || "User register successful ");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Something went wrong.Please try again";

      toast.error(errorMessage);
    },
  });
};
