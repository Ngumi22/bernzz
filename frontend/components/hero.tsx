import React from "react";
import HeroImages from "./hero-carousel";
import CategoryList from "./category-list";
import CategoryLists from "./categoryyy";

export default function Hero() {
  return (
    <div className="md:flex justify-between items-center gap-4 md:px-8">
      <CategoryList />
      <HeroImages />
      <CategoryLists />
    </div>
  );
}
