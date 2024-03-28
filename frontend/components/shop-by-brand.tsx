import React, { useState } from "react";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import { Product, CartItem } from "@/lib/definitions";
import { SkeletonCard } from "./loading-skeleton";
import Card from "./card";
export default function ShopByBrand() {
  const { data: allProducts, error, isLoading } = useGetAllProductsQuery("");
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      ...product,
      cartQuantity: 1, // or any initial quantity
    };
    dispatch(addToCart(cartItem));
  };

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (error || !allProducts) {
    return (
      <div className="container">
        <p>An error occurred</p>
      </div>
    );
  }

  // Assuming allProducts is an array
  const products: Product[] = allProducts as Product[];

  // Get unique categories
  const uniqueBrands = Array.from(
    new Set(products.map((product) => product.brand))
  );
  if (selectedBrand === null && uniqueBrands.length > 0) {
    setSelectedBrand(uniqueBrands[0]);
  }
  return (
    <section className="container">
      <div className="font-bold w-full bg-yellow-500 text-black flex justify-between items-center p-2 my-2">
        <p className="text-md uppercase">Shop By Brand</p>
        <ul className="flex brand">
          {uniqueBrands.map((category) => (
            <li key={category} className="">
              <button
                className="px-4 py-2"
                onClick={() => setSelectedBrand(category)}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedBrand && (
        <div>
          <ul className="grid grid-cols-5 gap-4 lg:container">
            {products
              .filter((product) => product.brand === selectedBrand)
              .map((product) => (
                <li key={product.id}>
                  <Card product={product} />
                </li>
              ))}
          </ul>
        </div>
      )}
    </section>
  );
}
