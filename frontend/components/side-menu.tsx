import React from "react";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import { Product } from "@/lib/definitions";

export default function SideMenu() {
  const { data: allCategories, error, isLoading } = useGetAllProductsQuery("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading categories....</div>;
  }

  // Extracting unique categories
  const uniqueCategories = [
    ...new Set([
      ...(allCategories?.map(
        (product: { category: any }) => product.category
      ) ?? []),
    ]),
  ];

  return (
    <div>
      {uniqueCategories.map((category, index) => (
        <p key={index}>{category}</p>
      ))}
    </div>
  );
}
