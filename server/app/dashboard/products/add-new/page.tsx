"use client";

import { useState, useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function UploadForm() {
  const { toast } = useToast();

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<File[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productSKU, setProductSKU] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [productStatus, setProductStatus] = useState<
    "Archived" | "Active" | "Draft"
  >("Draft");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch categories from the server
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !mainImage ||
      thumbnails.length !== 5 ||
      !productName ||
      !productDescription ||
      !productSKU ||
      !productCategory ||
      !productStatus
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
      data.append("sku", productSKU);
      data.append("description", productDescription);
      data.append("category", productCategory);
      data.append("status", productStatus);

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
      toast({
        variant: "destructive",
        title: "Error",
        description: e.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
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

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="sku">SKU</Label>
        <Input
          className="w-60"
          type="text"
          value={productSKU}
          onChange={(e) => setProductSKU(e.target.value)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Product Name</Label>
        <Input
          className="w-60"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      <div className="">
        <Label>Product Description</Label>
        <Textarea
          className="w-60"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="category">Category</Label>
        <Textarea
          className="w-60"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
        <select
          className="w-60"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="status">Status</Label>
        <select
          className="w-60"
          value={productStatus}
          onChange={(e) =>
            setProductStatus(e.target.value as "Archived" | "Active" | "Draft")
          }>
          <option value="Draft">Draft</option>
          <option value="Active">Active</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
