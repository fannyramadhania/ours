"use client";
import { Upload } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const FileUpload = ({ close }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileSize = selectedFile.size / 1024; // ukuran dalam KB
      const fileType = selectedFile.type;

      // Validasi file
      if (fileSize > 600) {
        setError("Ukuran file tidak boleh lebih dari 600KB");
        setFile(null);
      } else if (!["image/jpeg", "image/png"].includes(fileType)) {
        setError("File harus berupa gambar (JPG, PNG, JPEG)");
        setFile(null);
      } else {
        setError("");
        setFile(selectedFile);
      }
    }
  };

  const onSubmit = async () => {
    // Membuat objek FormData untuk mengirim file
    const formData = new FormData();
    formData.append("file", file); // Tambahkan file ke FormData

    // Konfigurasi request axios
    let config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/gallery`,
      data: formData, // Menggunakan formData untuk mengirim file
    };

    // Buat promise request
    const requestPromise = axios(config);

    // Menampilkan toast selama proses request
    toast.promise(requestPromise, {
      loading: "Processing upload...",
      success: (response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response);
          queryClient.invalidateQueries(["gallery"]);
          close();
        }
        return "Upload successful"; // Pesan sukses untuk toast
      },
      error: (error) => {
        console.error("Error:", error);
        return (
          error?.response?.data?.message ||
          "Something went wrong, please contact our team"
        ); // Pesan error jika ada kesalahan
      },
    });
  };

  return (
    <>
      <label htmlFor="file-upload">
        <div className=" mx-auto p-6 space-y-6 bg-gray-100 rounded-lg shadow-lg  cursor-pointer">
          <h2 className="text-xl font-semibold text-center text-black cursor-pointer ">
            Upload Photo
          </h2>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 m-auto block text-black"
          >
            <path
              fillRule="evenodd"
              d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>

          <div className="flex flex-col items-center justify-center">
            <input
              id="file-upload"
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </label>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {file && (
        <div className="flex flex-col items-center mt-4">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-md border-2 border-gray-300"
          />
          <p className="mt-2 text-sm text-gray-700">{file.name}</p>
        </div>
      )}
      {file && (
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Upload
          </button>
          <button
            onClick={() => setFile(null)}
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Hapus
          </button>
        </div>
      )}
    </>
  );
};

export default FileUpload;
