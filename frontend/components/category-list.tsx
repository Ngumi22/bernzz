"use client";
// components/CategoryList.tsx
import React, { useState, useEffect, useRef } from "react";
import { Subcategory } from "@/lib/definitions";

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
      { id: 1, name: "HP", href: "/products" },
      { id: 2, name: "Lenovo", href: "/products" },
      { id: 3, name: "MacBooks", href: "/products" },
      { id: 4, name: "Asus", href: "/products" },
      { id: 5, name: "Dell", href: "/products" },
      { id: 6, name: "Microsoft", href: "/products" },
    ],
  },
  {
    id: 2,
    name: "Desktops",
    subcategories: [
      { id: 3, name: "Subcategory 2.1", href: "/products" },
      { id: 4, name: "Subcategory 2.2", href: "/products" },
    ],
  },
  {
    id: 3,
    name: "Monitors",
    subcategories: [
      { id: 5, name: "Subcategory 1.1", href: "/products" },
      { id: 6, name: "Subcategory 1.2", href: "/products" },
    ],
  },
  {
    id: 4,
    name: "Networking",
    subcategories: [
      { id: 7, name: "Subcategory 2.1", href: "/products" },
      { id: 8, name: "Subcategory 2.2", href: "/products" },
    ],
  },
  {
    id: 5,
    name: "Accessories",
    subcategories: [
      { id: 9, name: "Subcategory 1.1", href: "/products" },
      { id: 10, name: "Subcategory 1.2", href: "/products" },
    ],
  },
  {
    id: 6,
    name: "Phones & Tablets",
    subcategories: [
      { id: 11, name: "Subcategory 2.1", href: "/products" },
      { id: 12, name: "Subcategory 2.2", href: "/products" },
    ],
  },
  {
    id: 7,
    name: "Printers & Scanners",
    subcategories: [
      { id: 13, name: "Subcategory 1.1", href: "/products" },
      { id: 14, name: "Subcategory 1.2", href: "/products" },
    ],
  },
  {
    id: 8,
    name: "Sales & Offers",
    subcategories: [
      { id: 15, name: "Subcategory 2.1", href: "/products" },
      { id: 16, name: "Subcategory 2.2", href: "/products" },
    ],
  },
];

export default function CategoryList() {
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
    <section className="rounded-md bg-black text-yellow-400">
      {categoriesData.map((category) => (
        <div
          key={category.id}
          className="relative grid grid-flow-row h-auto  py-3 px-3 border-b">
          <h2
            className={`cursor-pointer text-yellow-400 text-md flex justify-between items-center py-1 ${
              category.id === selectedCategory
                ? "font-semibold text-gray-400 "
                : "text-yellow-400"
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
                className="popover absolute top-1 right-[-4px] transform  translate-x-full bg-yellow-300 text-black font-semibold shadow-md">
                <ul>
                  {category.subcategories.map((subcategory) => (
                    <li
                      key={subcategory.id}
                      className="px-6 py-2 border-b hover:bg-white cursor-pointer">
                      <a href={subcategory.href}>{subcategory.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
