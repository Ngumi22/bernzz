import React, { useRef } from "react";

import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import { IoIosExpand } from "react-icons/io";
import Image from "next/image";
import { Product } from "@/lib/definitions";

export default function WeeklyDeals() {
  const dealListRef = useRef<HTMLDivElement>(null);
  const handleScrollLeft = () => {
    if (dealListRef.current) {
      dealListRef.current.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (dealListRef.current) {
      dealListRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };
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

  const limitedDiscountedProducts = discountedProducts.slice(0, 5);
  return (
    <section className="container">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Weekly Deals</h2>
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
      <div className="flex justify-around items-center gap-8 py-8">
        {limitedDiscountedProducts.map((product: Product) => (
          <div
            ref={dealListRef}
            key={product.id}
            className="relative group/item bg-white shadow-md h-full max-w-sm dark:bg-gray-800 dark:border-gray-700 w-[15rem]">
            <div className="relative">
              <img
                className="rounded-t-lg p-4"
                src={product.image}
                alt={product.name}
              />
              <span className="absolute top-5 rotate-180 bg-red-500">
                {product.discountPercentage}%
              </span>
              <div className="px-5 pb-2">
                <div className="flex items-center my-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-3 h-3 ${
                        index < Math.floor(product.rating)
                          ? "text-yellow-300"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <h3 className="text-gray-900 font-semibold text-sm tracking-tight dark:text-white mb-2">
                  {product.description}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    Ksh {product.price.toLocaleString()}.00
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-3 grid grid-flow-row gap-3 group/edit invisible group-hover/item:visible p-1">
              <a
                className="relative bg-yellow-400 p-1 group/icon"
                href={`/product/${product.id}`}>
                <IoIosExpand className="w-5 h-5 " />
                <p className="absolute invisible group-hover/icon:visible right-8 top-2 bottom-0 text-xs 2xl:text-md text-center w-28 my-auto text-white font-semibold">
                  View Product
                </p>
              </a>
              <a className="bg-yellow-400 p-1 relative group/icon" href="">
                <svg
                  className="fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  height="22"
                  viewBox="0 -960 960 960"
                  width="22">
                  <path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm280-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z" />
                </svg>
                <p className="absolute invisible group-hover/icon:visible right-8 top-2 bottom-0 text-xs 2xl:text-md text-center w-32 my-auto text-black font-semibold">
                  Add to Wishlist
                </p>
              </a>
              <a className="bg-yellow-400 p-1 relative group/icon" href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="22"
                  viewBox="0 -960 960 960"
                  width="22">
                  <path d="M314-115q-104-48-169-145T80-479q0-26 2.5-51t8.5-49l-46 27-40-69 191-110 110 190-70 40-54-94q-11 27-16.5 56t-5.5 60q0 97 53 176.5T354-185l-40 70Zm306-485v-80h109q-46-57-111-88.5T480-800q-55 0-104 17t-90 48l-40-70q50-35 109-55t125-20q79 0 151 29.5T760-765v-55h80v220H620ZM594 0 403-110l110-190 69 40-57 98q118-17 196.5-107T800-480q0-11-.5-20.5T797-520h81q1 10 1.5 19.5t.5 20.5q0 135-80.5 241.5T590-95l44 26-40 69Z" />
                </svg>
                <p className="absolute invisible group-hover/icon:visible right-8 top-2 bottom-0 text-xs 2xl:text-md text-center w-36 my-auto text-black font-semibold">
                  Compare Products
                </p>
              </a>
            </div>

            <button
              onClick={handleAddToCart}
              className="group/btn invisible group-hover/item:visible absolute bottom-0 left-0 right-0 text-black hover:text-white bg-yellow-400 w-full hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
