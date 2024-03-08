// Data.tsx
"use client";
import React, { useState } from "react";
import ItemList from "./item-list";
import { useGetCategoryQuery } from "@/lib/productsApi";

const Data: React.FC = () => {
  const { data: categories, isLoading, isError } = useGetCategoryQuery("");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading categories</p>;
  }

  return (
    <div className="container my-4 w-2/3">
      <ul className="flex justify-between items-center space-x-4">
        {categories?.map((category: string) => (
          <li
            key={category}
            className={`px-6 py-2 rounded-btn cursor-pointer ${
              selectedCategory === category ? "bg-yellow-500" : "bg-gray-300"
            }`}
            onClick={() => handleCategoryClick(category)}>
            {category}
          </li>
        ))}
      </ul>
      {selectedCategory && <ItemList category={selectedCategory} />}
    </div>
  );
};

export default Data;
