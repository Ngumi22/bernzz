"use client";

import { useState, useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function UploadForm() {
  const { toast } = useToast();

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<File[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productSKU, setProductSKU] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<string>("");
  const [productDiscount, setProductDiscount] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
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
      !productSKU ||
      !productPrice ||
      !productQuantity ||
      !productDiscount ||
      !productDescription ||
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
      data.append("price", productPrice);
      data.append("quantity", productQuantity);
      data.append("discount", productDiscount);
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
    <section className="container my-8">
      <form onSubmit={onSubmit}>
        <div className="flex justify-between">
          <div>
            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="name">Product Name</Label>
              <Input
                className="w-60"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="sku">SKU</Label>
              <Input
                className="w-60"
                type="text"
                value={productSKU}
                onChange={(e) => setProductSKU(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="price-1">Price</Label>
              <Input
                className="w-60"
                id="price-1"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                className="w-60"
                id="quantity"
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="discount">Discount</Label>
              <Input
                className="w-60"
                id="discount"
                type="number"
                value={productDiscount}
                onChange={(e) => setProductDiscount(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label>Product Description</Label>
              <Textarea
                className="w-60"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
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

            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="status">Status</Label>
              <select
                className="w-60"
                value={productStatus}
                onChange={(e) =>
                  setProductStatus(
                    e.target.value as "Archived" | "Active" | "Draft"
                  )
                }>
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="">
            <div className="flex w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Main Image</Label>
              <Input
                className="w-60"
                id="picture"
                type="file"
                name="main_image"
                onChange={(e) =>
                  setMainImage(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex w-full max-w-sm items-center gap-1.5 my-4">
                <Label htmlFor="thumbnail">Thumbnail {index + 1}</Label>
                <Input
                  className="w-60"
                  id="thumbnail"
                  type="file"
                  name={`thumbnail${index + 1}`}
                  onChange={(e) => handleThumbnailChange(e, index)}
                />
              </div>
            ))}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
}
