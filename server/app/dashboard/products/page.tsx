"use client";

import React, { useEffect, useState } from "react";
import { fetchAllProductFromDb } from "@/app/api/upload/fetchProductFromDb";
import { ProductssData } from "@/lib/definitions";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState<ProductssData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await fetchAllProductFromDb();
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: ProductssData) => {
    // Handle edit logic here
    console.log("Edit product:", product);
    // Navigate to edit page or open a modal for editing
  };

  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`/dashboard/products/${productId}`);
      // Refresh the product list after deletion
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.quantity}</p>
              <p>{product.discount}</p>
              <p>{product.description}</p>
              <p>{product.sku}</p>
              <p>{product.category}</p>
              <p>{product.status}</p>
              <Image
                src={`data:image/jpeg;base64,${product.images.main}`}
                alt={product.name}
                height={40}
                width={40}
                className="w-20 h-20"
              />
              <div className="flex">
                {product.images.thumbnails.map((thumbnail, index) => (
                  <img
                    key={index}
                    src={`data:image/jpeg;base64,${thumbnail}`}
                    alt={`image-${index}`}
                    style={{
                      marginRight: "10px",
                      marginBottom: "10px",
                      width: "6rem",
                      height: "6rem",
                    }}
                  />
                ))}
              </div>
              <button onClick={() => handleEdit(product)}>
                <Link href={`/dashboard/products/edit-product/${product.id}`}>
                  Edit
                </Link>
              </button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
