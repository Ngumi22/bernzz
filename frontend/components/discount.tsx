import React from "react";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import LoadingSkeleton from "./loadingskeleton";
import { Product } from "@/lib/definitions";

import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import FlipClock from "./flip-clock";

export default function DiscountedItems() {
  const { data: allProducts, isLoading, error } = useGetAllProductsQuery("");
  const dispatch = useDispatch();
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  if (error) {
    return <p>Error loading products</p>;
  }

  const discountedProducts: Product[] = allProducts
    ? allProducts.filter(
        (product: { discountPercentage: number }) =>
          product.discountPercentage > 0
      )
    : [];
  return (
    <section className="md:container my-6 mx-8 md:my-14">
      <div className="xl:flex justify-around items-center text-center">
        <div className="xl:flex justify-around items-center gap-10">
          <p className="font-semibold text-2xl md:text-3xl">
            Deals of the week
          </p>
          <p className="text-sm">Sales upto 70% off the selected items</p>
        </div>
        <div className="flex justify-center items-center xl:gap-10">
          <p className="font-bold text-xl">
            <span className="hidden xl:flex">Hurry Up!</span> Offer ends in:
          </p>
          <div className="text-sm">
            <FlipClock />
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <ul className="grid m-0 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-content-center justify-items-center">
          {discountedProducts.map((product) => (
            <li
              key={product.id}
              className="flex justify-between relative border-2 border-yellow-400 bg-white rounded-lg h-56 w-full">
              <div className="w-1/2">
                <img
                  loading="lazy"
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain overflow-hidden rounded-l-lg"
                />
              </div>
              <div className="flex flex-col justify-center items-start space-y-3 w-1/2 px-2">
                <p className="px-2 py-1 bg-gray-400 text-black rounded-md text-sm text-center">
                  {product.name}
                </p>
                <p className="text-black text-sm">{product.description}</p>
                <div className="flex justify-start items-center">
                  <div className=" text-red-500 text-center line-through text-sm flex">
                    KSH
                    <span className="pr-2"> {product.price}</span>
                  </div>
                  <p className=" text-black text-center text-sm flex gap-x-1 font-semibold">
                    KSH
                    <span>
                      {product.price -
                        (product.price * product.discountPercentage) / 100}
                    </span>
                  </p>
                </div>
                <div className="flex justify-start items-center text-center gap-x-1">
                  <p className="text-xs text-center">Available:</p>
                  <p className="text-xs text-green-600 text-center">
                    {product.stock} Products
                  </p>
                </div>

                <a
                  onClick={() => handleAddToCart(product)}
                  className="cursor-pointer flex justify-between items-center py-2 px-3 rounded-xl bg-yellow-500 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </a>
              </div>
              <span className="text-sm absolute top-2 left-2 rounded-full p-1 bg-yellow-400 flex text-center text-white">
                {product.discountPercentage}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
