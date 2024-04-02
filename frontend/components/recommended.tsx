import React from "react";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import { Key } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import { Product } from "@/lib/definitions";
import Card from "./card";

export default function Recommended() {
  const { data: allProducts, error, isLoading } = useGetAllProductsQuery("");
  const dispatch = useDispatch();
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !allProducts) {
    return (
      <div className="container">
        <p>An error occurred</p>
      </div>
    );
  }

  const recommended: Product[] = allProducts.filter(
    (product: { stock: number }) => product.stock >= 90
  );

  const limitedRecommended = recommended.slice(0, 5);
  return (
    <section className="container">
      <div className="font-bold w-full bg-yellow-500 text-black flex justify-between items-center p-2 my-2">
        <p className="text-md uppercase">Recommended For You</p>
        <a
          className="flex gap-2 items-center text-sm hover:opacity-[0.5] cursor-pointer"
          href="/products"
        >
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right font-semibold fill-black"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </a>
      </div>
      <ul className="grid lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 md:grid-cols-3 w-full gap-1 recommended">
        {limitedRecommended.map((product: Product) => (
          <Card product={product} />
        ))}
      </ul>
    </section>
  );
}
