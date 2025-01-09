"use client";
import React from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  NoSsr,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuth";
import supabase from "@/lib/supabase";

// Skema validasi menggunakan Yup
const validationSchema = yup.object({
  username: yup.string().required("Username wajib diisi"),
  password: yup
    .string()
    .min(6, "Password harus minimal 6 karakter")
    .required("Password wajib diisi"),
});

const LoginPage = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();
  // Menggunakan useForm dengan yup resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Fungsi untuk menangani submit form
  const onSubmit = async (data) => {
    console.log("Data login:", data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    // Buat promise request
    const requestPromise = axios(config);

    toast.promise(requestPromise, {
      loading: "Process for updating data",
      success: (response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response);
          setUser(response.data.data);
          router.push("/");
        }

        return "Login successful";
      },
      error: (error) => {
        console.log("error", error);
        return (
          error?.response?.data?.message ||
          "Something went wrong, please contact our team"
        );
      },
    });
  };

  return (
    <>
      {" "}
      <NoSsr />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              label="Username"
              type="username"
              fullWidth
              margin="normal"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
