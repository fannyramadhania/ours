"use client";
import BasicButtons from "@/components/Button/Button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import bandung from "../../../public/bandung.jpg";
import StandardImageList from "./Gallery";
import { useSearchParams } from "next/navigation";
import FileUpload from "./UploadPhoto";
import BasicModal from "@/components/Modal/Modal";
import { useState } from "react";
import { Button } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { fetcher } from "@/lib/fetcher";

function Picture() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Updated useQuery hook with the object syntax
  const { data, isLoading, error } = useQuery({
    queryKey: ["gallery"], // Query key should be an array or string
    queryFn: () => fetcher("http://localhost:3000/api/gallery"),
  });

  const [showModal, setShowModal] = useState(false);

  function close() {
    setShowModal(false);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="flex justify-end m-4">
        <BasicModal
          open={showModal}
          setOpen={setShowModal}
          content={<FileUpload close={() => close()} />}
          modifyButton={"Upload"}
          modifyButtonIcon={<Upload />}
        />
      </div>

      {/* Komponen Gallery menerima data dari query */}
      <StandardImageList dataImg={data?.data} />
    </>
  );
}

export default Picture;
