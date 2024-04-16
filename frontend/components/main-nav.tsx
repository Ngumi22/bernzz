"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Cart from "./cart";
import Account from "./account";
import { Category } from "@/lib/definitions";
import Wish from "./wish";

const categories: Category[] = [
  { id: 1, name: "Laptops", href: "#" },
  { id: 2, name: "Desktops", href: "#" },
  { id: 3, name: "Monitors", href: "#" },
  { id: 4, name: "Networking", href: "#" },
  { id: 5, name: "Accessories", href: "#" },
  { id: 6, name: "Phones & Tablets", href: "#" },
  { id: 7, name: "Kid's Zone", href: "#" },
  { id: 8, name: "Sales & Offers", href: "#" },
];

export default function MainNav() {
  const [nav, setNav] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (window.innerWidth >= 1000) {
      setNav(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setNav(false);
    }
  };

  const handleToggleNav = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent event propagation to the window
    setNav(!nav);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section className="bg-black text-white pb-2 z-50 sticky top-0">
      <div className="px-4">
        <div className="hidden md:flex justify-between items-center py-4">
          Banner
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex lg:justify-between items-center h-20">
            <div className="w-1/3">
              <a href="/" className="text-xl md:text-4xl text-center my-auto">
                BDS LOGO
              </a>
            </div>
            <div className="hidden md:flex lg:mx-4">
              <form className="flex flex-row">
                <div className="flex text-black">
                  <input
                    type="text"
                    placeholder="I'm looking for..."
                    className="w-32 lg:w-80 px-3 h-10"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white px-8 py-0 md:py-1">
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="md:flex justify-center items-center space-x-4 md:w-2/5 hidden">
              <p className="md:text-4xl text-center">
                <Wish />
              </p>
              <div className="md:text-4xl text-center">
                <Account />
              </div>
              <p className="md:text-4xl text-center">
                <Cart />
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div
              onClick={handleToggleNav}
              className="cursor-pointer z-10 text-gray-500 md:hidden">
              {nav ? (
                <FaTimes className="hidden" size={30} />
              ) : (
                <FaBars size={30} />
              )}
            </div>
            <div className="md:hidden mx-4">
              <form className="flex flex-row">
                <div className="flex text-black">
                  <input
                    type="text"
                    placeholder="I'm looking for..."
                    className="w-60 md:w-80 px-3 h-10"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white px-4 md:px-3 py-0 md:py-1">
                    Search
                  </button>
                </div>
              </form>
            </div>

            {nav && (
              <div
                ref={navRef}
                className="flex w-1/2 flex-col justify-start items-start h-screen z-50 absolute top-0 left-0 bg-black text-gray-500">
                <p className="bg-yellow-200 relative w-full px-5 md:text-2xl text-black font-semibold py-6">
                  Main Menu
                </p>

                <ul className="w-full">
                  {categories.map((category) => (
                    <li
                      className="w-full hover:bg-white flex flex-col px-5"
                      key={category.id}>
                      <a
                        className="py-4 flex justify-between"
                        href={category.href}>
                        {category.name} <span className="text-xl">+</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
