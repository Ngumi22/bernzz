import React from "react";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import { Key } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";

import LoadingSkeleton from "@/components/loadingskeleton";
interface Product {
  id: Key | null | undefined;
  image: string;
  description: string;
  name: string;
  price: string | number;
}

export default function Laptops() {
  const { data, error, isLoading } = useGetAllProductsQuery("");
  const dispatch = useDispatch();
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="container">
      <p className="text-center font-semibold text-2xl">Laptops</p>
      {isLoading ? (
        <div>
          <LoadingSkeleton />
        </div>
      ) : error ? (
        <p>An error occurred</p>
      ) : (
        <>
          <div className="grid grid-cols-3 justify-items-center gap-2 items-center">
            {data?.map((product: Product) => (
              <div key={product.id}>
                <div className="border size-72 p-1 flex flex-col justify-start items-center text-sm space-y-1">
                  <img className="h-2/3 w-full" src={product.image} />
                  <div className="flex justify-center space-x-16 items-center">
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                  </div>
                  <p>{product.description}</p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-800 p-2 border text-white rounded-md">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
