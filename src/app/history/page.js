"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import TimeLine from "./component/TimeLine";
import BasicModal from "@/components/Modal/Modal";
import { useState } from "react";
import HistoryForm from "./component/HistoryForm";

export default function History() {
  // Use React Query's useQuery hook to fetch data
  const { data, isLoading, error } = useQuery({
    queryKey: ["history"], // Query key for cache
    queryFn: () => fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/history`), // Fetch function
  });

  const [showModal, setShowModal] = useState(false);

  function close() {
    setShowModal(false);
  }

  // Handle loading and error states
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
          title={"History"}
          content={<HistoryForm close={() => close()} />}
          setOpen={setShowModal}
          open={showModal}
        />
      </div>

      {/* Passing the fetched data to the TimeLine component */}
      <TimeLine dataHistory={data?.data} />
    </>
  );
}
