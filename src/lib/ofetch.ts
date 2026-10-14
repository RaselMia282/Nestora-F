import { ofetch } from "ofetch";

export const apiClient = ofetch.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1",
  credentials: "include",
});