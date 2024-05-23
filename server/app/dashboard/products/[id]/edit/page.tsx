"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProductssData, CategoryData } from "@/lib/definitions";
import {
  fetchProductByIdFromDb,
  fetchCategoryFromDb,
} from "@/app/api/upload/fetchProductFromDb";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditProductPage = () => {
  const { id } = useParams(); // Retrieve the product ID from the URL
  const { toast } = useToast();

  const [product, setProduct] = useState<ProductssData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [productName, setProductName] = useState<string>("");
  const [productSKU, setProductSKU] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>();
  const [productQuantity, setProductQuantity] = useState<number>();
  const [productDiscount, setProductDiscount] = useState<number>();
  const [productDescription, setProductDescription] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [productStatus, setProductStatus] = useState<
    "Archived" | "Active" | "Draft"
  >("Draft");
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    if (!id) {
      console.error("Product ID is missing from URL");
      setLoading(false);
      return;
    }

    const fetchProductById = async (productId: number) => {
      try {
        const response = await fetchProductByIdFromDb(productId);
        if (response) {
          setProduct(response);
          setProductName(response.name);
          setProductSKU(response.sku);
          setProductPrice(response.price);
          setProductQuantity(response.quantity);
          setProductDiscount(response.discount);
          setProductDescription(response.description);
          setProductCategory(response.category);
          setProductStatus(response.status as "Archived" | "Active" | "Draft"); // Update the type of setProductStatus
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductById(Number(id));
  }, [id]);

  useEffect(() => {
    // Fetch categories from the server
    const fetchCategories = async () => {
      try {
        const res = await fetchCategoryFromDb();
        setCategories(res);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const uniqueCategories = Array.from(
    new Set(categories.map((category) => category.name))
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !productName ||
      !productSKU ||
      !productPrice ||
      !productQuantity ||
      !productDiscount ||
      !productDescription ||
      (!productCategory && !selectedCategory) ||
      !productStatus
    ) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please fill all fields.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    try {
      const data = {
        name: productName,
        sku: productSKU,
        price: productPrice,
        quantity: productQuantity,
        discount: productDiscount,
        description: productDescription,
        category: productCategory || selectedCategory, // Use either the new or existing category
        status: productStatus,
      };

      const res = await fetch(`/dashboard/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      } else {
        const result = await res.json();
        toast({
          title: "Product Update",
          description: "Successfully updated",
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
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>No product found</p>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
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
                onChange={(e) => setProductPrice(Number(e.target.value))}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                className="w-60"
                id="quantity"
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(Number(e.target.value))}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="discount">Discount</Label>
              <Input
                className="w-60"
                id="discount"
                type="number"
                value={productDiscount}
                onChange={(e) => setProductDiscount(Number(e.target.value))}
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
              <p>Add New Category</p>
              <Label htmlFor="category">Category</Label>
              <Textarea
                className="w-60"
                value={productCategory}
                onChange={(e) => {
                  setProductCategory(e.target.value);
                  setSelectedCategory(""); // Clear selected category when typing new category
                }}
              />

              <p>Or Select Existing Category</p>

              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  setProductCategory(""); // Clear new category input when selecting existing category
                }}>
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>
                  {uniqueCategories.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default EditProductPage;
