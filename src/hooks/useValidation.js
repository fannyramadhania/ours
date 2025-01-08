"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./useAuth";

export const useValidation = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

    React.useEffect(() => {
      console.log("tidak ada");
      
        if (!user) {
        
      router.push("/login");
    }
  }, [user, router]);
};
