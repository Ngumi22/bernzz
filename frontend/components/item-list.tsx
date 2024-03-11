import React from "react";
import { useGetCategoryQuery } from "@/lib/productsApi";

import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";

import { Product } from "@/lib/definitions";
import { ItemListProps } from "@/lib/definitions";

const ItemList: React.FC<ItemListProps> = ({ defaultCategory }) => {
  const {
    data: items,
    isLoading,
    isError,
  } = useGetCategoryQuery(defaultCategory);

  const dispatch = useDispatch();
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading items in {defaultCategory}</p>;
  }

  return (
    <div>
      <ul className="flex justify-start items-center gap-20">
        {items?.map((item: Product) => (
          <li key={item.id} className="">
            <p>{item.name}</p>
            <img
              src={item.image}
              className="object-contain h-40 overflow-hidden"
            />
            <button
              onClick={() => handleAddToCart(item)}
              className="bg-blue-800 p-2 border text-white rounded-md">
              Add To Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
