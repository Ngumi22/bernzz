import React from "react";
import Data from "./category";
export default function FeaturedCategories() {
  return (
    <section className="md:container md:flex">
      <div className="md:w-1/5 md:block hidden rounded-xl bg-[#2D60D2] p-2 h-72">
        <div className="mt-2 text-center font-semibold text-lg text-white">
          <p>Most Clear</p>
          <p>Camera Phone</p>
        </div>
        <img
          src="sam.png"
          className="object-contain w-full flex justify-end h-3/4 overflow-hidden"
        />
      </div>
      <div className="md:w-4/5 w-full">
        <Data />
      </div>
    </section>
  );
}
