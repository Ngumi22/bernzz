import React, { useState } from "react";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import LoadingSkeleton from "./loadingskeleton";
import { Product } from "@/lib/definitions";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import Link from "next/link";

const ITEMS_PER_PAGE = 10;

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
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return <p>Error loading products</p>;
  }

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const newProducts: Product[] = allProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="container mb-4" style={{ height: "fit-content" }}>
      <div className="font-bold w-full bg-yellow-500 text-black flex justify-between items-center p-2 my-2">
        <p className="text-md uppercase">New Products</p>
        <a
          className="flex gap-2 items-center text-sm hover:opacity-[0.5] cursor-pointer"
          href="/products">
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right font-semibold fill-black"
            viewBox="0 0 16 16">
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
            className="flex justify-center items-center border border-yellow-500 bg-yellow-500 rounded-sm py-2 px-6 cursor-pointer font-semibold text-xs uppercase hover:bg-white hover:shadow-lg">
            Shop Now
          </Link>
        </div>
        <ul className="grid lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 md:grid-cols-3 lg:w-4/5 w-full gap-1 translate-x-4">
          {newProducts.map((product) => (
            <li
              key={product.id}
              className="border border-gray-300 shadow-md"
              style={{ height: "fit-content" }}>
              <a className="overflow-hidden">
                <img
                  loading="lazy"
                  className="object-contain h-20 w-full pt-1 rounded-t"
                  src={product.image}
                  alt={product.name}
                  width="304"
                  height="192"
                />
              </a>

              <div className="flex-1 flex flex-col py-2 px-1 gap-y-4">
                <a className="flex justify-between items-center">
                  <h5 className="font-semibold tracking-tight text-slate-900">
                    {product.name}
                  </h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart fill-yellow-500 font-semibold"
                    viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  </svg>
                </a>

                <div className="flex items-center justify-between">
                  <p>
                    <span className="font-bold text-xs text-slate-900">
                      KSH {product.price}
                    </span>
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex justify-center items-center border border-yellow-500 bg-yellow-500 rounded-sm p-1 cursor-pointer font-semibold text-xs uppercase hover:bg-white hover:shadow-lg">
                    Add To Cart
                  </button>
                </div>
              </div>
            </li>
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
            }`}>
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
