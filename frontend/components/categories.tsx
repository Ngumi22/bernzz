"use client";

export default function Categories() {
  return (
    <section className="bg-black text-white text-xs md:text-lg flex items-center md:space-x-20 md:pl-8 px-4">
      <div className="bg-yellow-500 hidden md:flex justify-center items-center h-14 px-10">
        <p className="flex justify-between items-center space-x-3 pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-list fill-black mr-2"
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
          All Categories
        </p>
      </div>
      <ul className="flex justify-center items-center space-x-20 h-14">
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
