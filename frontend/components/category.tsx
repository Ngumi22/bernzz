import React, { useState, useEffect, useRef } from "react";
import ItemList from "./item-list";
import { useGetCategoryQuery } from "@/lib/productsApi";
import "@/app/globals.css";

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Laptop"
  ); // Default category here

  const { data: categories, isLoading, isError } = useGetCategoryQuery("");

  useEffect(() => {
    // Update the selectedCategory if the categories are loaded successfully
    if (!isLoading && !isError && categories) {
      setSelectedCategory(categories[0]); // First category as the default
    }
  }, [categories, isLoading, isError]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const categoryListRef = useRef<HTMLUListElement>(null);

  const handleScrollLeft = () => {
    if (categoryListRef.current) {
      categoryListRef.current.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (categoryListRef.current) {
      categoryListRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };

  if (isError) {
    return <p>Error loading categories</p>;
  }

  return (
    <div className="md:container my-2 md:px-0 px-2">
      <div className="flex">
        <ul
          ref={categoryListRef}
          className="flex justify-between items-center md:space-x-8 space-x-3 overflow-x-scroll no-scrollbar">
          {categories?.map((category: string) => (
            <li
              className={`px-4 py-2 uppercase text-sm rounded cursor-pointer  ${
                selectedCategory === category ? "bg-yellow-500" : "bg-gray-300"
              }`}
              key={category}
              onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          ))}
        </ul>
        <button className="flex items-center gap-1 px-2 text-black xl:hidden">
          <svg
            onClick={handleScrollLeft}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-arrow-left border border-yellow-500 p-1 rounded-full"
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
            className="bi bi-arrow-right border border-yellow-500 p-1 rounded-full"
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ItemList defaultCategory={selectedCategory} />
      )}
    </div>
  );
}
