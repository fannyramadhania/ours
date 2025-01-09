"use client";
import { Button, NoSsr, ThemeProvider } from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";
import theme from "./theme";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import AuthMiddleware from "@/middleware/Auth";
import { usePathname, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const clientSideEmotionCache = createEmotionCache();
export default function Routing({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  console.log(pathname);
  const queryClient = new QueryClient(); // Create the QueryClient instance

  return (
    <>
      
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Toaster />
          {!isLoginPage && <Navbar />}
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
