import React from "react";
import Category from "./category";
export default function FeaturedCategories() {
  return (
    <section className="md:container md:flex md:gap-10">
      <div className="md:w-1/5 lg:block hidden rounded-xl bg-black p-2 h-72 my-14">
        <div className="mt-2 text-center font-semibold text-lg text-white">
          <p>Most Clear</p>
          <p>Camera Phone</p>
        </div>
        <img
          src="sam.png"
          className="object-contain w-full flex justify-end h-56 overflow-hidden"
        />
      </div>
      <div className="lg:w-4/5 w-full">
        <Category />
      </div>
    </section>
  );
}
