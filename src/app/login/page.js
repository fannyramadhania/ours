"use client";
import React from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  NoSsr,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuth";
import supabase from "@/lib/supabase";
import logo from "../../assets/img/logo.jpg";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
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

  console.log(logo);

  return (
    <>
      <NoSsr/>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <img src={logo?.src} className="w-44" />

          <Box
            component="form"
            className=""
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, width: "100%" }}
          >
            <p className="text-newMain font-bold text-xl">Login</p>
            <p className="text-gray-400">Please enter username and password</p>
            <TextField
              label="Username"
              type="username"
              fullWidth
              margin="normal"
              {...register("username")}
              error={!!errors.username}
              required
            />

            <FormControl fullWidth variant="outlined" className="mt-4 mb-6">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                label="Password"
                fullWidth
                margin="normal"
                id="outlined-adornment-password"
                {...register("password")}
                error={!!errors.password}
                required
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="newMain"
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
