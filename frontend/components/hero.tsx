import React from "react";
import HeroGrid from "./hero-grid";
import HeroImages from "./hero-carousel";

export default function Hero() {
  return (
    <div className="md:flex justify-center items-center gap-4">
      <HeroGrid />
      <HeroImages />
      <HeroGrid />
    </div>
  );
}
