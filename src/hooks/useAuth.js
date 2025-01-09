import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";

// Periksa apakah lingkungan adalah browser
const isBrowser =
  typeof window !== "undefined" && typeof indexedDB !== "undefined";

const storage = {
  getItem: async (name) => {
    if (!isBrowser) return null; // Jangan coba akses indexedDB di server
    try {
      const data = await get(name);
      return data || null;
    } catch (error) {
      console.error("Error getting data:", error);
      return null;
    }
  },
  setItem: async (name, value) => {
    if (!isBrowser) return; // Jangan coba akses indexedDB di server
    try {
      await set(name, value);
    } catch (error) {
      console.error("Error setting data:", error);
    }
  },
  removeItem: async (name) => {
    if (!isBrowser) return; // Jangan coba akses indexedDB di server
    try {
      await del(name);
    } catch (error) {
      console.error("Error removing data:", error);
    }
  },
};

// Store dengan fungsi dasar
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,

      // Getter - Mengambil data user
      getUser: () => get().user,

      // Setter - Mengubah data user
      setUser: (userData) => set({ user: userData }),

      // Delete - Menghapus data user
      clearUser: async () => {
        set({ user: null });
        await storage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => (isBrowser ? storage : null)), // Gunakan storage hanya di browser
      partialize: (state) => ({ user: state.user }),
    }
  )
);
