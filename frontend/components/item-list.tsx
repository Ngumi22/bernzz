import React, { useState, useEffect, useRef } from "react";
import { useGetCategoryQuery } from "@/lib/productsApi";
import { Product } from "@/lib/definitions";
import { ItemListProps } from "@/lib/definitions";
import Card from "./card";

const ItemList: React.FC<ItemListProps> = ({ defaultCategory }) => {
  const {
    data: items,
    isLoading,
    isError,
  } = useGetCategoryQuery(defaultCategory);

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
          <Card key={product.id} product={product} />
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
