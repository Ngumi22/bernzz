// Data.tsx
import React, { useState, useEffect } from "react";
import ItemList from "./item-list";
import { useGetCategoryQuery } from "@/lib/productsApi";
import LoadingSkeleton from "./loadingskeleton";

const Data: React.FC = () => {
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

  if (isLoading) {
    return (
      <div>
        <LoadingSkeleton />
      </div>
    );
  }

  if (isError) {
    return <p>Error loading categories</p>;
  }

  return (
    <div className="container my-4">
      <ul className="flex justify-between items-center space-x-4">
        {categories?.map((category: string) => (
          <li
            className={`px-6 py-2 rounded-btn cursor-pointer  ${
              selectedCategory === category ? "bg-yellow-500" : "bg-gray-300"
            }`}
            key={category}
            onClick={() => handleCategoryClick(category)}>
            {category}
          </li>
        ))}
      </ul>
      <ItemList defaultCategory={selectedCategory} />
    </div>
  );
};

export default Data;
