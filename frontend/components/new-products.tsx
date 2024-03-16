import React from "react";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import LoadingSkeleton from "./loadingskeleton";
import { Product } from "@/lib/definitions";

import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import Link from "next/link";

export default function NewProducts() {
  const { data: allProducts, isLoading, error } = useGetAllProductsQuery("");
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

  const newProducts: Product[] = allProducts.filter(
    (product: { new: boolean }) => product.new == true
  );
  return (
    <section className="container md:my-2 mb-4">
      <p className="font-bold text-2xl text-start my-2 underline underline-offset-4">
        New Products
      </p>
      <div className="flex gap-x-8">
        <div className="hidden lg:flex flex-col justify-center items-center lg:gap-8 md:gap-0 gap-8 lg:px-4 bg-green-950 w-1/4 h-auto">
          <img src="sam.png" className="h-auto object-contain" />
          <Link
            href="/products"
            className="flex justify-center items-center border border-yellow-500 bg-yellow-500 rounded-sm py-2 px-6 cursor-pointer font-semibold text-xs uppercase hover:bg-white hover:shadow-lg">
            Shop Now
          </Link>
        </div>
        <ul className="grid lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 md:grid-cols-3 lg:w-3/4 w-full gap-1">
          {newProducts.map((product) => (
            <li key={product.id} className="border border-gray-300 shadow-md">
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
    </section>
  );
}
