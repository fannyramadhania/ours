import { notFound } from "next/navigation";

export default async function SlugPic({ params }) {
    const { slug } = await params;
    
    if (slug=="fanny") {
        notFound()
    }
  return (
    <>
      <p>Result layout :{slug}</p>
    </>
  );
}
