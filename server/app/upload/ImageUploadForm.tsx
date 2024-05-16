"use client";

// Client side code (ImageUploadForm.tsx)

import React, { useState, ChangeEvent, FormEvent } from "react";
import { saveImagesToDb } from "@/app/api/addImages";
import { useForm } from "react-hook-form";

interface ImageUploadFormProps {
  onUpload: () => void;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onUpload }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Handle image selection
  };

  const handleImageSubmit = async (formData: any, res: any) => {
    try {
      const result = await saveImagesToDb(formData, res);
      setSuccess("Images uploaded successfully");
      setError("");
      onUpload();
    } catch (error) {
      setError("Error uploading images: " + error);
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleImageSubmit)}>
      <input type="file" multiple onChange={handleImageChange} />
      <button type="submit">Upload Images</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default ImageUploadForm;
