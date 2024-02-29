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
            className="fill-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24">
            <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z" />
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
              <div className="">
                {cart.cartItems?.map((cartItem: any) => (
                  <div
                    className="flex justify-between items-center my-2 border-b py-2"
                    key={cartItem.id}>
                    <div>
                      <img
                        className="h-20"
                        src={cartItem.image}
                        alt={cartItem.name}
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
              </div>
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
