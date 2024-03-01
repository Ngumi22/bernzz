"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Cart from "./cart";
import Account from "./account";

interface Category {
  name: string;
  href: string;
}

const categories: Category[] = [
  { name: "Laptops", href: "#" },
  { name: "Desktops", href: "#" },
  { name: "Monitors", href: "#" },
  { name: "Networking", href: "#" },
  { name: "Accessories", href: "#" },
  { name: "Phones & Tablets", href: "#" },
  { name: "Kid's Zone", href: "#" },
  { name: "Sales & Offers", href: "#" },
];

const MainNav: React.FC = () => {
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
        <div className="hidden md:flex justify-between items-center">
          Banner
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-between items-center h-20">
            <div className="md:w-1/5">
              <p className="text-xl md:text-4xl text-center my-auto">
                BDS LOGO
              </p>
            </div>
            <div className="hidden md:flex mx-4">
              <form className="flex flex-row">
                <select
                  id="pricingType"
                  name="pricingType"
                  className="h-10 md:px-3 py-0 md:py-1 tracking-wider text-black">
                  <option value="All" defaultValue="All">
                    All
                  </option>
                  <option value="Freemium">Freemium</option>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
                <div className="flex text-black">
                  <input
                    type="text"
                    placeholder="I'm looking for..."
                    className="w-40 md:w-80 px-3 h-10"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1">
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="flex justify-center items-center space-x-4 gap-4 md:w-1/5">
              <p className="md:text-4xl text-center">
                <svg
                  className="fill-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24">
                  <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                </svg>
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
                <select
                  id="pricingType"
                  name="pricingType"
                  className="h-10 md:px-3 py-0 md:py-1 tracking-wider text-black">
                  <option value="All" defaultValue="All">
                    All
                  </option>
                  <option value="Freemium">Freemium</option>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
                <div className="flex text-black">
                  <input
                    type="text"
                    placeholder="I'm looking for..."
                    className="w-40 md:w-80 px-3 h-10"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1">
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
                      key={category.name}>
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
};

export default MainNav;
