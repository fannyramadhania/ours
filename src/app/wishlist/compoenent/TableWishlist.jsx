"use client";
const TableWishlist = ({ data }) => {
  return (
    <>
      {data?.map((wish) => (
        <div key={wish?.id}>
          <p>{wish.destination}</p>
        </div>
      ))}
    </>
  );
};
export default TableWishlist;
