// theme.js
"use client"
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#AEDEFC", // warna biru
    },
    secondary: {
      main: "#F96E2A", // warna ungu
    },
    warning: {
      main: "#FF9800", // warna oranye (warning)
    },
    error: {
      main: "#f44336", // warna merah (error)
    },
    success: {
      main: "#4caf50", // warna hijau (success)
    },
    info: {
      main: "#2196f3", // warna biru terang (info)
    },
    tosca: {
      main: "#ffca28", // warna kuning
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
});

export default theme;
