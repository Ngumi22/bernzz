import React from "react";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import { Product } from "@/lib/definitions";
import FlipClock from "./flip-clock";
import { ThreeCircles } from "react-loader-spinner";
import Card from "./card";
import { motion } from "framer-motion";

export default function WeeklyDeals() {
  const { data: allProducts, isLoading, error } = useGetAllProductsQuery("");

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
  if (error) {
    return <p>Error loading products</p>;
  }

  const discountedProducts: Product[] = allProducts
    ? allProducts.filter(
        (product: { discountPercentage: number }) =>
          product.discountPercentage > 0
      )
    : [];

  const limitedDiscountedProducts = discountedProducts.slice(0, 5);
  return (
    <section className="container my-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Weekly Deals</h2>
        <div className="text-sm">
          <FlipClock />
        </div>
      </div>
      <div className="flex justify-around items-center gap-4 py-8">
        {limitedDiscountedProducts.map((product: Product) => (
          <motion.li
            className="flex-none list-none"
            style={{ minWidth: "0" }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "easeIn", delay: 0.75 }}
            key={product.id}>
            <Card product={product} />
          </motion.li>
        ))}
      </div>
    </section>
  );
}
