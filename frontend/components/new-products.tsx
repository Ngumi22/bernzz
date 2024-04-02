import React, { useState } from "react";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import { Product } from "@/lib/definitions";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "./card";

const ITEMS_PER_PAGE = 8;

export default function NewProducts() {
  const { data: allProducts, isLoading, error } = useGetAllProductsQuery("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>Error loading products</p>;
  }

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const newerProducts: Product[] = allProducts.filter(
    (p: { new: boolean }) => p.new === true
  );
  const newProducts: Product[] = newerProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(newerProducts.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="container mb-4" style={{ height: "fit-content" }}>
      <div className="font-bold w-full bg-yellow-500 text-black flex justify-between items-center p-2 my-2">
        <p className="text-md uppercase">New Products</p>
        <a
          className="flex gap-2 items-center text-sm hover:opacity-[0.5] cursor-pointer"
          href="/products"
        >
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right font-semibold fill-black"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </a>
      </div>
      <div className="flex gap-x-4">
        <div className="lg:flex hidden flex-col justify-center items-center lg:gap-8 md:gap-0 gap-8 lg:px-4 bg-green-950 w-1/5 h-auto">
          <img src="sam.png" className="h-auto object-cover" />
          <Link
            href="/products"
            className="flex justify-center items-center border border-yellow-500 bg-yellow-500 rounded-sm py-2 px-6 cursor-pointer font-semibold text-xs uppercase hover:bg-white hover:shadow-lg"
          >
            Shop Now
          </Link>
        </div>
        <ul className="grid lg:grid-cols-4 xl:grid-cols-4 grid-cols-2 md:grid-cols-3 lg:w-4/5 w-full gap-1 translate-x-4 new">
          {newProducts.map((product) => (
            <motion.li
              className="flex-none"
              style={{ minWidth: "0" }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "easeIn", delay: 0.75 }}
              key={product.id}
            >
              <Card product={product} />
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 ${
              currentPage === index + 1
                ? "bg-yellow-400 text-black"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
