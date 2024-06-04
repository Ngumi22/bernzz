"use client";
import * as React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  clearCart,
  getTotals,
} from "@/lib/slices/cartSlice";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function Cart() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart.cartItems, dispatch]);

  const handleRemoveFromCart = (cartItem: any) => {
    dispatch(removeFromCart(cartItem));
  };
  const handleDecreaseCart = (cartItem: any) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleIncreaseCart = (cartItem: any) => {
    dispatch(addToCart(cartItem));
  };
  const handleClearCart = () => {
    dispatch(clearCart(cart));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-cart">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>

          <span className="absolute top-0 right-0 inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {cart.cartTotalQuantity}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[20rem] mr-5">
        <DropdownMenuLabel className="text-center font-semibold text-xl">
          Shopping Bag
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[25rem] rounded-md p-4">
          {cart.cartItems.length === 0 ? (
            <div className="text-center">
              <p className="font-semibold my-4">Cart is empty</p>
              <Link className="flex justify-center gap-2 items-center" href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16">
                  <path
                    fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
                <p>Start Shopping</p>
              </Link>
            </div>
          ) : (
            <div>
              {cart.cartItems?.map((cartItem: any) => (
                <div
                  className="flex justify-between items-center my-2 border-b py-2"
                  key={cartItem.id}>
                  <p>{cartItem.name}</p>
                  <div>
                    <Image
                      className="h-20"
                      src={cartItem.image}
                      alt={cartItem.name}
                      height={100}
                      width={100}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div>{cartItem.cartQuantity}</div>
                    <button onClick={() => handleIncreaseCart(cartItem)}>
                      +
                    </button>
                  </div>
                  <div className="">
                    ${cartItem.price * cartItem.cartQuantity}
                  </div>
                  <button
                    className="text-red-700"
                    onClick={() => handleRemoveFromCart(cartItem)}>
                    X
                  </button>
                </div>
              ))}

              <div className="flex justify-between items-center">
                <button
                  className="border px-4 py-2"
                  onClick={() => handleClearCart()}>
                  Clear Cart
                </button>
                <div className="subtotal flex justify-between items-center gap-4">
                  <p className="underline underline-offset-1 font-semibold">
                    Subtotal
                  </p>
                  <p className="font-semibold">Ksh {cart.cartTotalAmount}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center text-sm my-3 text-center">
                <p className="">Taxes and shipping calculated at checkout</p>
                <Link
                  href="/checkout"
                  className="px-8 py-2 bg-blue-700 rounded-md w-48 my-2  text-white">
                  Continue to Checkout
                </Link>
              </div>
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
