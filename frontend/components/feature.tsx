import React from "react";

export default function Feature() {
  return (
    <section className="md:flex justify-between gap-2 items-center my-4 mx-4">
      <div className="md:w-1/5 mr-2 bg-red-400 h-52 overflow-hidden relative shadow-lg rounded-lg md:my my-2">
        <img
          src="hp.jpg"
          className="object-cover overflow-hidden h-auto w-full rounded-lg"
        />
        <p className="absolute top-3 right-0 left-0 text-yellow-500 text-center rounded-lg">
          All New Hp Omen
        </p>
        <a
          href="/products"
          className="absolute bottom-3 right-0 left-0 bg-yellow-500 text-white text-center py-1 px-2 w-1/2 mx-auto border border-yellow-500 hover:motion-safe:animate-pulse">
          Buy Now
        </a>
      </div>
      <div className="md:w-4/5 grid grid-cols-2 md:grid-cols-4 gap-2 content-centerrounded-md">
        <div className="flex flex-col justify-center items-center gap-y-4 h-52 border md:p-4 bg-gray-500 rounded-md">
          <img src="lap1.jpg" className="h-20 w-20 rounded-full" />
          <p className="font-semibold text-sm">1 year Warranty</p>
          <p className="text-sm">Deliver to door</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-4 h-52 border md:p-4 bg-gray-500 rounded-md">
          <img src="lap1.jpg" className="h-20 w-20 rounded-full" />
          <p className="font-semibold text-sm">Free Delivery</p>
          <p className="text-sm">Deliver to door</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-4 h-52 border md:p-4 bg-gray-500 rounded-md">
          <img src="lap1.jpg" className="h-20 w-20 rounded-full" />
          <p className="font-semibold text-sm">24/7 Support</p>
          <p className="text-sm">Deliver to door</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-4 h-52 border md:p-4 bg-gray-500 rounded-md">
          <img src="lap1.jpg" className="h-20 w-20 rounded-full" />
          <p className="font-semibold text-sm">Safe Payments</p>
          <p className="text-sm">Deliver to door</p>
        </div>
      </div>
    </section>
  );
}
