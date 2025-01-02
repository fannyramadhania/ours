import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";

// Custom storage untuk IndexedDB menggunakan idb-keyval
const storage = {
  getItem: async (name) => {
    return (await get(name)) || null;
  },
  setItem: async (name, value) => {
    await set(name, value);
  },
  removeItem: async (name) => {
    await del(name);
  },
};

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setAuth: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => storage),
      // Opsional: tambahkan opsi lain sesuai kebutuhan
      version: 1, // versi state schema
      partialize: (state) => ({ user: state.user }), // hanya simpan user state
    }
  )
);
