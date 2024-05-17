"use client";

import { useState, useEffect } from "react";
import ImageUploadForm from "./ImageUploadForm";
import { fetchImagesFromDb } from "@/app/api/addImages";

interface ImageData {
  id: string;
  title: string;
  image_data: string; // This will now be a base64 string
  // Add other fields if necessary
}

export default function Page() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const imageDataArray = await fetchImagesFromDb();
      setImages(imageDataArray);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>MySQL Tutorial Images</h1>
      <ImageUploadForm />
      {loading ? (
        <p>Loading images...</p>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-4 grid-flow-row">
          {images.map((image, index) => (
            <img
              key={index}
              src={`data:image/jpeg;base64,${image.image_data}`}
              alt={image.title || `Image ${index}`}
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
