"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function UploadForm() {
  const { toast } = useToast();

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<File[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !mainImage ||
      thumbnails.length !== 5 ||
      !productName ||
      !productDescription
    ) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "Please upload one main image, five thumbnails, and fill all fields.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    try {
      const data = new FormData();
      data.append("main_image", mainImage);
      thumbnails.forEach((thumbnail, index) =>
        data.append(`thumbnail${index + 1}`, thumbnail)
      );
      data.append("name", productName);
      data.append("description", productDescription);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      } else {
        const result = await res.json();
        toast({
          title: "Form Upload",
          description: "Successfully uploaded",
        });
      }
    } catch (e: any) {
      console.error(e);
      setError(
        "An error occurred while uploading the form. Please try again later."
      );
    }
  };

  const handleThumbnailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = Array.from(e.target.files || []);
    setThumbnails((prev) => {
      const newThumbnails = [...prev];
      newThumbnails[index] = files[0];
      return newThumbnails;
    });
  };

  return (
    <form onSubmit={onSubmit}>
      {error && <div>{error}</div>}
      <label>Main Image</label>
      <input
        type="file"
        name="main_image"
        onChange={(e) =>
          setMainImage(e.target.files ? e.target.files[0] : null)
        }
      />
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          <label>Thumbnail {index + 1}</label>
          <input
            type="file"
            name={`thumbnail${index + 1}`}
            onChange={(e) => handleThumbnailChange(e, index)}
          />
        </div>
      ))}
      <label>Product Name</label>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <label>Product Description</label>
      <textarea
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
