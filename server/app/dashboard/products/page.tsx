"use client";

import React, { useEffect, useState } from "react";
import { fetchAllProductFromDb } from "@/app/api/upload/fetchProductFromDb";
import { ProductssData } from "@/lib/definitions";
import Image from "next/image";

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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.sku}</p>
              <Image
                src={`data:image/jpeg;base64,${product.images.main}`}
                alt={product.name}
                height={40}
                width={40}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
