import Link from "next/link";
import React from "react";

export default function Banner1() {
  return (
    <section className="container flex flex-wrap lg:px-24 gap-4">
      <div className="flex-grow rounded flex justify-center items-center lg:gap-8 md:gap-0 gap-8 h-40 lg:px-4 my-2 bg-green-950">
        <img src="sam.png" className="h-2/3 object-contain" />
        <div className="text-white">
          <p>Hellowwwww</p>
          <p>Hellowwww</p>
          <p>Hellowwww</p>
        </div>
        <Link
          href="/products"
          className="flex justify-center items-center border border-yellow-500 bg-yellow-500 rounded-sm py-2 px-6 cursor-pointer font-semibold text-xs uppercase hover:bg-white hover:shadow-lg">
          Shop Now
        </Link>
      </div>
      <div className="flex-grow rounded flex justify-center items-center lg:gap-8 md:gap-0 gap-8 h-40 lg:px-4 my-2 bg-yellow-900">
        <img src="sam.png" className="h-2/3 object-contain" />
        <div className="text-white">
          <p>Hellowwwww</p>
          <p>Hellowwww</p>
          <p>Hellowwww</p>
        </div>
        <Link
          href="/products"
          className="flex justify-center items-center border border-yellow-500 bg-yellow-500 rounded-sm py-2 px-6 cursor-pointer font-semibold text-xs uppercase hover:bg-white hover:shadow-lg">
          Shop Now
        </Link>
      </div>
    </section>
  );
}
