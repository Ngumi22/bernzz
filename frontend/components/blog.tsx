import React from "react";

export default function Blog() {
  return (
    <section className="container bg-gray-50 my-2">
      <h2 className="font-semibold uppercase underline underline-offset-2 text-2xl">
        Blog
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 lg:gap-8 my-2">
        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="h-32 w-full object-cover"
          />

          <div className="bg-white sm:p-6">
            <time dateTime="2022-10-10" className="block text-xs text-gray-500">
              {" "}
              10th Oct 2022{" "}
            </time>

            <a href="/blog">
              <h3 className="mt-0.5 text-lg text-gray-900 hover:opacity-[0.7]">
                How to position your furniture for positivity
              </h3>
            </a>

            <p className="mt-2 line-clamp-2 text-sm/relaxed text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae dolores, possimus pariatur animi temporibus nesciunt
              nisi culpa eius atque dignissimos. Molestias explicabo corporis
              voluptatem?
            </p>
          </div>
        </article>
        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="h-32 w-full object-cover"
          />

          <div className="bg-white sm:p-6">
            <time dateTime="2022-10-10" className="block text-xs text-gray-500">
              {" "}
              10th Oct 2022{" "}
            </time>

            <a href="/blog">
              <h3 className="mt-0.5 text-lg text-gray-900 hover:opacity-[0.7]">
                How to position your furniture for positivity
              </h3>
            </a>

            <p className="mt-2 line-clamp-2 text-sm/relaxed text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae dolores, possimus pariatur animi temporibus nesciunt
              nisi culpa eius atque dignissimos. Molestias explicabo corporis
              voluptatem?
            </p>
          </div>
        </article>
        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="h-32 w-full object-cover"
          />

          <div className="bg-white sm:p-6">
            <time dateTime="2022-10-10" className="block text-xs text-gray-500">
              {" "}
              10th Oct 2022{" "}
            </time>

            <a href="/blog">
              <h3 className="mt-0.5 text-lg text-gray-900 hover:opacity-[0.7]">
                How to position your furniture for positivity
              </h3>
            </a>

            <p className="mt-2 line-clamp-2 text-sm/relaxed text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae dolores, possimus pariatur animi temporibus nesciunt
              nisi culpa eius atque dignissimos. Molestias explicabo corporis
              voluptatem?
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
