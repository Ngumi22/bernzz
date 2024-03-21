import React, { useState, useEffect, useRef } from "react";
import { useGetCategoryQuery } from "@/lib/productsApi";

import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";

import { Product } from "@/lib/definitions";
import { ItemListProps } from "@/lib/definitions";

const ItemList: React.FC<ItemListProps> = ({ defaultCategory }) => {
  const {
    data: items,
    isLoading,
    isError,
  } = useGetCategoryQuery(defaultCategory);

  const dispatch = useDispatch();
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };
  const itemListRef = useRef<HTMLUListElement>(null);
  const handleScrollLeft = () => {
    if (itemListRef.current) {
      itemListRef.current.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (itemListRef.current) {
      itemListRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading items in {defaultCategory}</p>;
  }

  return (
    <div>
      <ul
        ref={itemListRef}
        className="media-scroller snaps-inline my-4 no-scrollbar px-10">
        {items?.map((product: Product) => (
          <li key={product.id} className="media-element">
            <a className="overflow-hidden">
              <img
                loading="lazy"
                className="object-contain h-48 w-full"
                src={product.image}
                alt={product.name}
                width="304"
                height="192"
              />
            </a>
            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
              {product.discountPercentage}
            </span>
            <div className="flex-1 flex flex-col py-2 px-3">
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
              <div className="my-2 flex items-center text-xs">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>

                <span className="ml-2 rounded bg-yellow-200 p-1 font-semibold">
                  {product.rating}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p>
                  <span className="font-bold text-sm text-slate-900">
                    KSH {product.price}
                  </span>
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex justify-center items-center border border-yellow-500 bg-yellow-500 rounded-sm py-1 px-2 cursor-pointer font-semibold text-xs uppercase hover:bg-white hover:shadow-lg">
                  Add To Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className="flex ml-auto items-center gap-3 px-2 text-black">
        <svg
          onClick={handleScrollLeft}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-arrow-left border bg-black fill-yellow-400 rounded p-1"
          viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
        <svg
          onClick={handleScrollRight}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-arrow-right border bg-black fill-yellow-400 rounded p-1"
          viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
      </button>
    </div>
  );
};

export default ItemList;
