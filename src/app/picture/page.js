"use client";
import BasicButtons from "@/components/Button/Button";
import Image from "next/image";
import useSWR from "swr";
import bandung from "../../../public/bandung.jpg";
import StandardImageList from "./Gallery";
import { useSearchParams } from "next/navigation";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json(); // Mengonversi response ke format JSON
  });
function Picture() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data } = useSWR("http://localhost:3000/api/history", fetcher);

  console.log(data);
  
  return (
    <>
<p>Comming soon</p>
    </>
  );
}

export default Picture;
