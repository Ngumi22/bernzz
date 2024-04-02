import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import { CartItem, Product } from "@/lib/definitions";
import Link from "next/link";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Create a CartItem from the Product
    const cartItem: CartItem = {
      ...product,
      cartQuantity: 1, // Assuming an initial quantity
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <div className="mx-auto">
      <div className="bg-white shadow-md max-w-sm dark:bg-gray-800 dark:border-gray-700 pt-2">
        <Link key={product.id} href={`/product/${product.id}`}>
          <img
            className="rounded-t-lg p-4"
            src={product.image}
            alt={product.name}
          />

          <div className="px-5 pb-2">
            <h3 className="text-gray-900 font-semibold text-lg tracking-tight dark:text-white">
              {product.name}
            </h3>

            <div className="flex items-center my-1">
              {/* Rating SVGs */}
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(product.rating)
                      ? "text-yellow-300"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
              <span className="text-xs font-semibold py-0.5 ml-3">
                {product.rating}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {product.price}
              </span>
            </div>
          </div>
        </Link>

        <button
          onClick={handleAddToCart}
          className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
