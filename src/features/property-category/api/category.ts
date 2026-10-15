import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";
import { CategoryApiResponse } from "../types/interface";

export const getPropertyCategories = async (): Promise<CategoryApiResponse> => {
  try {
    const res = await apiClient("/property-categories", {
      method: "GET",
    });
    console.log("Category API Success Response:", res);
    return res;
  } catch (error) {
    console.error("Category API Error Details:", error);
    throw error;
  }
};

export const useGetPropertyCategories = () => {
  return useQuery<CategoryApiResponse>({
    queryKey: ["categories"],
    queryFn: getPropertyCategories,
  });
};
