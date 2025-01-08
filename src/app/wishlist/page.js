"use client";
import { useQuery } from "@tanstack/react-query";
import BasicModal from "@/components/Modal/Modal";
import TableWishlist from "./compoenent/TableWishlist";



function Wishlist() {
  // Use React Query's useQuery hook to fetch data
  const { data, isLoading, error } = useQuery({
    queryKey: ["wishlist"], // Query key
    queryFn: () => fetcher("http://localhost:3000/api/wishlist"), // Fetch function
  
  });

  console.log(data);

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
     <p>coming soon</p>
    </>
  );
}

export default Wishlist;
