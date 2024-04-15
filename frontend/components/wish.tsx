"use client";
import * as React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeFromWish, clearWish, getTotals } from "@/lib/slices/wishSlice";
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
export default function Wish() {
  const wish = useAppSelector((state) => state.wish);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [wish.wishItems, dispatch]);

  const handleRemoveFromWish = (wishItem: any) => {
    dispatch(removeFromWish(wishItem));
  };

  const handleClearWish = () => {
    dispatch(clearWish(wish));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          <svg
            className="fill-yellow-500 md:text-4xl "
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24">
            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
          </svg>
          <span className="absolute top-0 right-0 inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {wish.wishTotalQuantity}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[20rem] mr-5">
        <DropdownMenuLabel className="text-center font-semibold text-xl">
          Shopping Bag
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[25rem] rounded-md p-4">
          {wish.wishItems.length === 0 ? (
            <div className="text-center">
              <p className="font-semibold my-4">wish is empty</p>
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
              {wish.wishItems?.map((wishItem: any) => (
                <div
                  className="flex justify-between items-center my-2 border-b py-2"
                  key={wishItem.id}>
                  <p>{wishItem.name}</p>
                  <div>
                    <Image
                      className="h-20"
                      src={wishItem.image}
                      alt={wishItem.name}
                      height={100}
                      width={100}
                    />
                  </div>

                  <button
                    className="text-red-700"
                    onClick={() => handleRemoveFromWish(wishItem)}>
                    X
                  </button>
                </div>
              ))}

              <div className="flex justify-center items-center">
                <button
                  className="border px-4 py-2"
                  onClick={() => handleClearWish()}>
                  Clear WishList
                </button>
              </div>
              <div className="flex flex-col justify-center items-center text-sm my-3 text-center">
                <Link href="/" className="">
                  HOME
                </Link>
              </div>
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
