import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import { CartItem, Product } from "@/lib/definitions";
import Image from "next/image";

import { IoIosExpand } from "react-icons/io";
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
    <div className="relative group/item bg-white shadow-md h-full max-w-sm dark:bg-gray-800 dark:border-gray-700 w-[15rem]">
      <div key={product.id} className="">
        <Image
          className="rounded-t-lg p-4"
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={500}
          height={500}
          quality={80}
          style={{ objectFit: "contain" }}
        />

        <div className="px-5 pb-2">
          <div className="flex items-center my-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-3 h-3 ${
                  index < Math.floor(product.rating)
                    ? "text-yellow-300"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <h3 className="text-gray-900 font-semibold text-sm tracking-tight dark:text-white mb-2">
            {product.description}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Ksh {product.price.toLocaleString()}.00
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-3 grid grid-flow-row gap-3 group/edit invisible group-hover/item:visible p-1">
        <a
          className="relative bg-yellow-400 p-1 group/icon"
          href={`/product/${product.id}`}>
          <IoIosExpand className="w-5 h-5 " />
          <p className="absolute invisible group-hover/icon:visible right-8 top-2 bottom-0 text-xs 2xl:text-md text-center w-28 my-auto text-white font-semibold">
            Product Details
          </p>
        </a>
        <a className="bg-yellow-400 p-1 relative group/icon" href="">
          <svg
            className="fill-black"
            xmlns="http://www.w3.org/2000/svg"
            height="22"
            viewBox="0 -960 960 960"
            width="22">
            <path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm280-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z" />
          </svg>
          <p className="absolute invisible group-hover/icon:visible right-8 top-2 bottom-0 text-xs 2xl:text-md text-center w-32 my-auto text-black font-semibold">
            Add to Wishlist
          </p>
        </a>
        <a className="bg-yellow-400 p-1 relative group/icon" href="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22"
            viewBox="0 -960 960 960"
            width="22">
            <path d="M314-115q-104-48-169-145T80-479q0-26 2.5-51t8.5-49l-46 27-40-69 191-110 110 190-70 40-54-94q-11 27-16.5 56t-5.5 60q0 97 53 176.5T354-185l-40 70Zm306-485v-80h109q-46-57-111-88.5T480-800q-55 0-104 17t-90 48l-40-70q50-35 109-55t125-20q79 0 151 29.5T760-765v-55h80v220H620ZM594 0 403-110l110-190 69 40-57 98q118-17 196.5-107T800-480q0-11-.5-20.5T797-520h81q1 10 1.5 19.5t.5 20.5q0 135-80.5 241.5T590-95l44 26-40 69Z" />
          </svg>
          <p className="absolute invisible group-hover/icon:visible right-8 top-2 bottom-0 text-xs 2xl:text-md text-center w-36 my-auto text-black font-semibold">
            Compare Products
          </p>
        </a>
        <a
          className="bg-yellow-400 p-1 relative group/icon"
          href="https://web.whatsapp.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
          </svg>
          <p className="absolute invisible group-hover/icon:visible right-9 top-2 bottom-0 text-xs 2xl:text-md text-center w-36 my-auto text-black font-semibold">
            Order on WhatsApp
          </p>
        </a>
      </div>

      <button
        onClick={handleAddToCart}
        className="group/btn invisible group-hover/item:visible absolute bottom-0 left-0 right-0 text-black hover:text-white bg-yellow-400 w-full hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Add to cart
      </button>
    </div>
  );
};

export default Card;
