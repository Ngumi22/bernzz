import React from "react";
import HeroImages from "./hero-carousel";
import CategoryList from "./category-list";
import CategoryLists from "./categoryyy";

export default function Hero() {
  return (
    <section className="lg:container flex gap-x-4 lg:py-2">
      <div className="hidden lg:block lg:w-1/4 h-full">
        <CategoryList />
      </div>
      <div className="w-full lg:w-3/4 h-full">
        <HeroImages />
        <CategoryLists />
      </div>
    </section>
  );
}
