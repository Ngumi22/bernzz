"use client";
import React, { useState, useRef } from "react";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import { Product } from "@/lib/definitions";
import { SkeletonCard } from "./loading-skeleton";
import Card from "./card";

import { motion } from "framer-motion";
export default function ShopByBrand() {
  const brandListRef = useRef<HTMLUListElement>(null);
  const handleScrollLeft = () => {
    if (brandListRef.current) {
      brandListRef.current.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (brandListRef.current) {
      brandListRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };
  const { data: allProducts, error, isLoading } = useGetAllProductsQuery("");

  const [selectedBrand, setSelectedBrand] = useState<string | null>("Dell");

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (error || !allProducts) {
    return (
      <div className="container">
        <p>An error occurred</p>
      </div>
    );
  }

  // Assuming allProducts is an array
  const products: Product[] = allProducts as Product[];

  // Get unique categories
  const uniqueBrands = Array.from(
    new Set(products.map((product) => product.brand))
  );
  if (selectedBrand === null && uniqueBrands.length > 0) {
    setSelectedBrand(uniqueBrands[0]);
  }

  return (
    <section className="xl:container flex flex-col justify-center my-12 brand">
      <h2 className="text-center text-2xl font-semibold pb-4">Shop By Brand</h2>
      <div className="text-black flex justify-between xl:container mx-4 border-b-2">
        <ul className="flex gap-6">
          {uniqueBrands.map((brand) => (
            <li
              className={`xl:text-lg font-semibold text-black transition ease-in-out delay-150 hover:scale-110 duration-300 cursor-pointer  ${
                selectedBrand === brand ? "border-b-2 border-b-yellow-400" : ""
              }`}
              key={brand}
              onClick={() => setSelectedBrand(brand)}>
              {brand}
            </li>
          ))}
        </ul>
        <button className="flex items-center gap-1 px-2 text-yellow-500">
          <svg
            onClick={handleScrollLeft}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className=""
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
          <svg
            onClick={handleScrollRight}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="underline underline-offset-2"
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </button>
      </div>

      {selectedBrand && (
        <ul
          className="flex items-center overflow-x-scroll no-scrollbar gap-4 lg:container py-8"
          ref={brandListRef}>
          {products
            .filter((product) => product.brand === selectedBrand)
            .map((product) => (
              <motion.li
                className="flex-none"
                style={{ minWidth: "0" }}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "easeIn", delay: 0.75 }}
                key={product.id}>
                <Card product={product} />
              </motion.li>
            ))}
        </ul>
      )}
    </section>
  );
}
