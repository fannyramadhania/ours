"use client"
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function StandardImageList({ dataImg }) {
  return (
    <>
      
      <div className="container mx-auto px-4 mt-8">
        <p className="font-bold text-xl mb-4">Gallery</p> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dataImg?.map(
            (item, index) =>
              item?.metadata?.mimetype?.startsWith("image/") && (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="group aspect-w-1 aspect-h-1 w-full">
                    <img
                      src={`https://jpgwiivtayrzgsjfbbqi.supabase.co/storage/v1/object/public/photo/${encodeURIComponent(
                        item.name
                      )}`}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                  </div>
                  <div className="p-2">
                    <p className="text-sm text-gray-700 truncate">
                      {item.name}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}
