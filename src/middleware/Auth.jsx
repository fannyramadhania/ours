"use client";

import { useAuthStore } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Daftar path yang tidak memerlukan autentikasi
const PUBLIC_PATHS = ["/login", "/register", "/forgot-password"];

const AuthMiddleware = ({ children }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const currentPath = window.location.pathname;

    // Cek apakah current path termasuk public path
    const isPublicPath = PUBLIC_PATHS.includes(currentPath);

    // Jika tidak ada user dan bukan di public path, redirect ke login
    if (!user && !isPublicPath) {
      router.replace(`/login?from=${encodeURIComponent(currentPath)}`);
    }

    // Jika ada user dan di halaman login, redirect ke home
    if (user && isPublicPath) {
      router.replace("/");
    }
  }, [user, router]);

  return children;
};

export default AuthMiddleware;
