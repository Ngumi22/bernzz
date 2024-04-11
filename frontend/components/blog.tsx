import React from "react";

export default function Blog() {
  return (
    <section className="container bg-gray-50 my-4 py-6">
      <h2 className="font-semibold uppercase underline underline-offset-2 text-2xl">
        Blog
      </h2>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-6">
        <article className="overflow-hidden  hover:shadow-lg h-[21rem]">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="h-1/2 w-full object-cover"
          />

          <div className="bg-white sm:p-2 space-y-8 p-3 text-xs">
            <a href="/blog">
              <h3 className="mt-0.5 text-xs  hover:opacity-[0.7] hover:text-blue-500 font-bold">
                BUSINESS LAPTOPS
              </h3>
            </a>

            <p className="text-xs/relaxed line-clamp-2">
              TOP 10 RATED LAPTOPS FOR BUSINESS IN THE INTERNET
            </p>

            <div className="flex justify-between items-center border-t pt-2">
              <a
                href="/blog"
                className="hover:text-blue-500 text-xs font-semibold">
                READ MORE
              </a>
              <time
                dateTime="2022-10-10"
                className="block text-xs text-gray-500 hover:text-blue-500">
                10th Oct 2022
              </time>
            </div>
          </div>
        </article>
        <article className="overflow-hidden rounded-lg  hover:shadow-lg h-[21rem]">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="h-1/2 w-full object-cover"
          />

          <div className="bg-white sm:p-2 space-y-8 p-3 text-xs">
            <a href="/blog">
              <h3 className="mt-0.5 text-xs  hover:opacity-[0.7] hover:text-blue-500 font-bold">
                BUSINESS LAPTOPS
              </h3>
            </a>

            <p className="text-xs/relaxed line-clamp-2">
              TOP 10 RATED LAPTOPS FOR BUSINESS IN THE INTERNET
            </p>

            <div className="flex justify-between items-center border-t pt-2">
              <a
                href="/blog"
                className="hover:text-blue-500 text-xs font-semibold">
                READ MORE
              </a>
              <time
                dateTime="2022-10-10"
                className="block text-xs text-gray-500 hover:text-blue-500">
                10th Oct 2022
              </time>
            </div>
          </div>
        </article>
        <article className="overflow-hidden rounded-lg  hover:shadow-lg h-[21rem]">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="h-1/2 w-full object-cover"
          />

          <div className="bg-white sm:p-2 space-y-8 p-3 text-xs">
            <a href="/blog">
              <h3 className="mt-0.5 text-xs  hover:opacity-[0.7] hover:text-blue-500 font-bold">
                BUSINESS LAPTOPS
              </h3>
            </a>

            <p className="text-xs/relaxed line-clamp-2">
              TOP 10 RATED LAPTOPS FOR BUSINESS IN THE INTERNET
            </p>

            <div className="flex justify-between items-center border-t pt-2">
              <a
                href="/blog"
                className="hover:text-blue-500 text-xs font-semibold">
                READ MORE
              </a>
              <time
                dateTime="2022-10-10"
                className="block text-xs text-gray-500 hover:text-blue-500">
                10th Oct 2022
              </time>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
