"use client";

import { useState, useEffect } from "react";
import ImageUploadForm from "./ImageUploadForm";
import { fetchImagesFromDb } from "@/app/api/addImages";

export default function Page() {
  const [imageSrcList, setImageSrcList] = useState<string[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const images = await fetchImagesFromDb();
      const base64Images = await Promise.all(
        images.map(async (imageData: any) => {
          const base64String = Buffer.from(
            imageData.image_data,
            "binary"
          ).toString("base64");
          return `data:image/jpeg;base64,${base64String}`;
        })
      );
      setImageSrcList(base64Images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div>
      <h1>MySQL Tutorial Images</h1>
      <ImageUploadForm onUpload={fetchImages} />
      {imageSrcList.length > 0 ? (
        <div className="grid grid-cols-4 grid-flow-row">
          {imageSrcList.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Image ${index}`}
              style={{ marginRight: "10px", marginBottom: "10px" }}
            />
          ))}
        </div>
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}
