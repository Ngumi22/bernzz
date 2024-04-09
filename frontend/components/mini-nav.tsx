import React from "react";
import { MegaMenu } from "./mega-menu";
export default function MiniNav() {
  return (
    <section className="bg-black  md:text-lg hidden lg:flex items-center md:space-x-20 md:pl-8 px-4">
      <div>
        <MegaMenu />
      </div>
      <ul className="flex justify-center text-white text-xs items-center space-x-20 h-14">
        <li className="cursor-pointer">
          <a href="/">Home</a>
        </li>

        <li className="cursor-pointer">
          <a>Deals & Offers</a>
        </li>
        <li className="cursor-pointer">
          <a>Services</a>
        </li>
        <li className="cursor-pointer">
          <a>Contact</a>
        </li>
      </ul>
    </section>
  );
}
