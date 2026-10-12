
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
  role: "ADMIN" | "OWNER" | "TENANT";
};

type AuthStore = {
  user: User | null;
  hasHydrated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,

      setUser: (user) => set({ user }),

      logout: () => set({ user: null }),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: (state) => {
        return () => {
          state.setHasHydrated(true);
        };
      },
    },
  ),
);
