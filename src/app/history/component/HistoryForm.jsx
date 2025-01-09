"use client";
import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  NoSsr,
  InputLabel,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Skema validasi menggunakan Yup
const validationSchema = yup.object({
  destination: yup.string().required("Destination wajib diisi"),
  date: yup.date().required("Date wajib diisi"),
  photo: yup.string().required("Picture wajib dipilih"),
});

const HistoryForm = ({ close }) => {
  const queryClient = useQueryClient();
  // Fetch gallery data using React Query's useQuery hook
  const { data, isLoading, error } = useQuery({
    queryKey: ["galleryToday"], // Query key
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/today`).then(
        (res) => res.json()
      ), // Fetch function
  });

  // State untuk melacak gambar yang dipilih
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Menggunakan useForm dengan yup resolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Fungsi untuk menangani submit form
  const onSubmit = async (data) => {
    const formDataObject = new FormData();
    formDataObject.append("destination", data.destination);
    formDataObject.append("date", data.date);
    formDataObject.append(
      "photo",
      `https://jpgwiivtayrzgsjfbbqi.supabase.co/storage/v1/object/public/photo/${encodeURIComponent(
        selectedPhoto
      )}`
    );
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/history`,
      data: formDataObject,
    };

    // Buat promise request
    const requestPromise = axios(config);

    toast.promise(requestPromise, {
      loading: "Process for creating data",
      success: (response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response);
          queryClient.invalidateQueries(["history"]);
          close();
        }
        return "Created successful";
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

  // Fungsi untuk menangani klik pada gambar
  const handlePhotoSelect = (photoName) => {
    console.log(photoName);
    setSelectedPhoto(photoName);
    setValue("photo", photoName); // Mengatur nilai photo pada form
  };

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
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
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              label="Destination"
              type="text"
              fullWidth
              margin="normal"
              {...register("destination")}
              error={!!errors.destination}
              helperText={errors.destination?.message}
              required
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              margin="normal"
              {...register("date")}
              error={!!errors.date}
              helperText={errors.date?.message}
              InputLabelProps={{ shrink: true }}
              required
            />
            <InputLabel sx={{ mt: 2 }}>Picture</InputLabel>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
              {data?.data?.map(
                (item, index) =>
                  item?.metadata?.mimetype?.startsWith("image/") && (
                    <Box
                      key={index}
                      onClick={() => handlePhotoSelect(item.name)}
                      sx={{
                        border:
                          selectedPhoto === item.name
                            ? "3px solid #1976d2"
                            : "1px solid #ccc",
                        borderRadius: "8px",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "border 0.3s",
                      }}
                    >
                      <img
                        src={`https://jpgwiivtayrzgsjfbbqi.supabase.co/storage/v1/object/public/photo/${encodeURIComponent(
                          item.name
                        )}`}
                        alt={item.name}
                        loading="lazy"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  )
              )}
            </Box>
            {errors.photo && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.photo.message}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HistoryForm;
