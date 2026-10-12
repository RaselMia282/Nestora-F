import { ofetch } from "ofetch";

export const apiClient = ofetch.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1",

  onRequest({ options }) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        options.headers = new Headers(options.headers);
        options.headers.set("Authorization", `Bearer ${token}`);
      }
    }
  },
});
