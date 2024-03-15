"use client";
// components/CategoryList.tsx
import React, { useState, useEffect, useRef } from "react";

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

const categoriesData: Category[] = [
  {
    id: 1,
    name: "Laptops",
    subcategories: [
      { id: 1, name: "Subcategory 1.1" },
      { id: 2, name: "Subcategory 1.2" },
    ],
  },
  {
    id: 2,
    name: "Desktops",
    subcategories: [
      { id: 3, name: "Subcategory 2.1" },
      { id: 4, name: "Subcategory 2.2" },
    ],
  },
  {
    id: 3,
    name: "Monitors",
    subcategories: [
      { id: 5, name: "Subcategory 1.1" },
      { id: 6, name: "Subcategory 1.2" },
    ],
  },
  {
    id: 4,
    name: "Networking",
    subcategories: [
      { id: 7, name: "Subcategory 2.1" },
      { id: 8, name: "Subcategory 2.2" },
    ],
  },
  {
    id: 5,
    name: "Accessories",
    subcategories: [
      { id: 9, name: "Subcategory 1.1" },
      { id: 10, name: "Subcategory 1.2" },
    ],
  },
  {
    id: 6,
    name: "Phones & Tablets",
    subcategories: [
      { id: 11, name: "Subcategory 2.1" },
      { id: 12, name: "Subcategory 2.2" },
    ],
  },
  {
    id: 7,
    name: "Printers & Scanners",
    subcategories: [
      { id: 13, name: "Subcategory 1.1" },
      { id: 14, name: "Subcategory 1.2" },
    ],
  },
  {
    id: 8,
    name: "Sales & Offers",
    subcategories: [
      { id: 15, name: "Subcategory 2.1" },
      { id: 16, name: "Subcategory 2.2" },
    ],
  },
  // Add more categories as needed
];

const CategoryList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setSelectedCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <div className="hidden md:flex mt-2 w-1/5">
      <div className="relative bg-black w-full">
        {categoriesData.map((category) => (
          <div
            key={category.id}
            className="relative grid grid-flow-row gap-x-8">
            <h2
              className={`cursor-pointer text-yellow-500 border-b py-3 px-2 flex justify-between ${
                category.id === selectedCategory ? "font-semibold" : ""
              }`}
              onClick={() => handleCategoryClick(category.id)}>
              {category.name}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </span>
            </h2>
            <div className="z-50">
              {category.id === selectedCategory && (
                <div
                  ref={popoverRef}
                  className="popover absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full bg-red-400 shadow-md p-2">
                  <ul>
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory.id}>{subcategory.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
