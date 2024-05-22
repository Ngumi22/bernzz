"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProductssData } from "@/lib/definitions";
import axios from "axios";
import { fetchProductByIdFromDb } from "@/app/api/upload/fetchProductFromDb";

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
      {/* Render edit form here */}
    </div>
  );
};

export default EditProductPage;
