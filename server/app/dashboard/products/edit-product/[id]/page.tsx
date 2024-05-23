"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProductssData } from "@/lib/definitions";
import { fetchProductByIdFromDb } from "@/app/api/upload/fetchProductFromDb";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { fetchCategoryFromDb } from "@/app/api/upload/fetchProductFromDb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditProductPage = () => {
  const { id } = useParams(); // Retrieve the product ID from the URL

  const [product, setProduct] = useState<ProductssData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductById = async (id: any) => {
      try {
        const response = await fetchProductByIdFromDb(id);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>No product found</p>;
  }

  return (
    <div>
      <p>SKU: {product.sku}</p>
      <p>Name: {product.name}</p>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Status: {product.status}</p>
      <p>Price: {product.price}</p>
      <p>Discount: {product.discount}</p>
      <p>Quantity: {product.quantity}</p>

      <form>
        <div className="flex justify-between">
          <div>
            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="name">Product Name</Label>
              <Input className="w-60" type="text" value={product.name} />
            </div>
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
      {/* Render edit form here */}
    </div>
  );
};

export default EditProductPage;
