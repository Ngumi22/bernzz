"use client";

import { useState, useEffect } from "react";
import ImageUploadForm from "./ImageUploadForm";
import { fetchImagesFromDb } from "@/app/api/addImages";

import { ImageData } from "@/lib/definitions";

export default function Page() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const imageDataArray = await fetchImagesFromDb();
      console.log(imageDataArray);
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
        <div className="flex flex-col my-20">
          {images.map((image, index) => (
            <div key={index} className="flex">
              <div>Name: {image.productName}</div>
              <div>Description: {image.productDescription}</div>
              <div>Main Image</div>
              <img
                src={`data:image/jpeg;base64,${image.main_image}`}
                alt={`Main Image ${index}`}
                style={{
                  marginRight: "10px",
                  marginBottom: "10px",
                  width: "6rem",
                  height: "6rem",
                }}
              />

              <div className="flex">
                <img
                  src={`data:image/jpeg;base64,${image.thumbnail1}`}
                  alt={`Thumbnail 1 ${index}`}
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    width: "6rem",
                    height: "6rem",
                  }}
                />
                <img
                  src={`data:image/jpeg;base64,${image.thumbnail2}`}
                  alt={`Thumbnail 2 ${index}`}
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    width: "6rem",
                    height: "6rem",
                  }}
                />
                <img
                  src={`data:image/jpeg;base64,${image.thumbnail3}`}
                  alt={`Thumbnail 3 ${index}`}
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    width: "6rem",
                    height: "6rem",
                  }}
                />
                <img
                  src={`data:image/jpeg;base64,${image.thumbnail4}`}
                  alt={`Thumbnail 4 ${index}`}
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    width: "6rem",
                    height: "6rem",
                  }}
                />
                <img
                  src={`data:image/jpeg;base64,${image.thumbnail5}`}
                  alt={`Thumbnail 5 ${index}`}
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    width: "6rem",
                    height: "6rem",
                  }}
                />
              </div>
              <div>Thumbnails</div>
            </div>
          ))}
        </div>
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}
