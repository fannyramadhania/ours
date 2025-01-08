import BasicButtons from "@/components/Button/Button";
import { AutoAwesome } from "@mui/icons-material";
import { CloudUploadSharp } from "@mui/icons-material";
import { HistoryOutlined } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <Link href={"/history"}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HistoryOutlined />}
          >
            Write History
          </Button>
        </Link>
        <Link href={"/wishlist"}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AutoAwesome />}
          >
            Make Wishlist
          </Button>
        </Link>
        <Link href={"/gallery"}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadSharp />}
          >
            Upload
          </Button>
        </Link>
      </div>
    </>
  );
}
