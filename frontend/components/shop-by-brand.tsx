"use client";
import React, { useState, useRef } from "react";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import { Product } from "@/lib/definitions";
import { SkeletonCard } from "./loading-skeleton";
import Card from "./card";
import { ThreeCircles } from "react-loader-spinner";
import { motion } from "framer-motion";
export default function ShopByBrand() {
  const { data: allProducts, error, isLoading } = useGetAllProductsQuery("");

  const [selectedBrand, setSelectedBrand] = useState<string | null>("Dell");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-8">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass="mx-auto"
        />
      </div>
    );
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
    <section className="xl:container flex flex-col justify-center items-center my-8 brand">
      <h2 className="text-2xl font-semibold py-6 uppercase">Shop By Brand</h2>
      <div className="text-black flex justify-center xl:container mx-4 border-b-2">
        <ul className="flex gap-6">
          {uniqueBrands.map((brand) => (
            <li
              className={`xl:text-lg font-semibold text-black transition ease-in-out uppercase delay-150 hover:scale-110 duration-300 cursor-pointer  ${
                selectedBrand === brand ? "border-b-2 border-b-yellow-400" : ""
              }`}
              key={brand}
              onClick={() => setSelectedBrand(brand)}>
              {brand}
            </li>
          ))}
        </ul>
      </div>

      {selectedBrand && (
        <ul className="flex items-center overflow-x-scroll no-scrollbar gap-4 lg:container py-8">
          {products
            .filter((product) => product.brand === selectedBrand)
            .slice(0, 5)
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
