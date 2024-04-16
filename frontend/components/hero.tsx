import React from "react";
import HeroImages from "./hero-carousel";
import CategoryLists from "./categoryyy";
import Feature from "./feature";

export default function Hero() {
  return (
    <section className="lg:container flex gap-x-4 lg:py-2">
      <div className="w-full lg:w-3/4 h-full">
        <HeroImages />
        <CategoryLists />
      </div>
      <div className="w-full h-full">
        <Feature />
      </div>
    </section>
  );
}
