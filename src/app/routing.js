"use client";
import { Button, NoSsr, ThemeProvider } from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";
import theme from "./theme";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import AuthMiddleware from "@/middleware/Auth";

const clientSideEmotionCache = createEmotionCache();
export default function Routing({ children }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster />
          <Navbar />
          {children}
      </ThemeProvider>
    </>
  );
}
