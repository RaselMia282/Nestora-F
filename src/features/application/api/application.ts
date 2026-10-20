/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/src/lib/ofetch";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const submitVerification = async (formData: FormData) => {
  return apiClient("/verification", {
    method: "POST",
    body: formData,
  });
};

const submitApplication = async (data: any) => {
  return apiClient("/application", {
    method: "POST",
    body: data,
  });
};

export const useSubmitFullApplication = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      // ধাপ ১: NID Verification
      const formData = new FormData();
      formData.append("nidNumber", payload.nidNumber);
      formData.append("nidFront", payload.nidFront);
      formData.append("nidBack", payload.nidBack);

      await submitVerification(formData);

      // ধাপ ২: Application Submit
      const appData = {
        listingId: payload.roomId || payload.propertyId,
        type: payload.roomId ? "room" : "property",
      };
      console.log("APP DATA:", appData);

      await submitApplication(appData);
    },
    onSuccess: () => {
      toast.success("Application submitted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to submit application.");
    },
  });
};
