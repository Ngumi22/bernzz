import React from "react";

export default function CategoryLists() {
  return (
    <div className="flex justify-between flex-wrap gap-x-2 my-1">
      <div className="flex justify-center flex-1 items-center px-4 py-2 h-32 rounded-lg bg-[#9aaebe]">
        <div className="w-full">
          <p className="font-semibold pb-2">Trending</p>
          <p className="font-semibold text-md">New Phone Pro</p>
          <a className="text-sm">Save Upto 30%</a>
        </div>
        <img
          src="/sam.png"
          className="object-contain h-full w-full overflow-hidden transition ease-in-out delay-150 hover:scale-110 duration-300"
          alt=""
        />
      </div>
      <div className="flex justify-center flex-1 items-center px-4 py-2 h-32 rounded-lg bg-[#f78da7]">
        <div className="w-full">
          <p className="font-semibold pb-2">Trending</p>
          <p className="font-semibold text-md">New Phone Pro</p>
          <a className="text-sm">Save Upto 30%</a>
        </div>
        <img
          src="/sam.png"
          className="object-contain h-full w-full overflow-hidden transition ease-in-out delay-150 hover:scale-110 duration-300"
          alt=""
        />
      </div>
      <div className="flex justify-center flex-1 items-center px-4 py-2 h-32 rounded-lg bg-[#abb8c3]">
        <div className="w-full">
          <p className="font-semibold pb-2">Trending</p>
          <p className="font-semibold text-md">New Phone Pro</p>
          <a className="text-sm">Save Upto 30%</a>
        </div>
        <img
          src="/sam.png"
          className="object-contain h-full w-full overflow-hidden transition ease-in-out delay-150 hover:scale-110 duration-300"
          alt=""
        />
      </div>
    </div>
  );
}
