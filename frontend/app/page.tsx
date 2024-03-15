"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Categories from "@/components/categories";
import Hero from "@/components/hero";
import Laptops from "@/components/laptops";
import Feature from "@/components/feature";
import FeaturedProducts from "@/components/featured-products";
import Data from "@/components/category";
import DiscountedItems from "@/components/discount";
import NewProducts from "@/components/new-products";
import BestSeller from "@/components/best-seller";
import FeaturedCategories from "@/components/featured-categories";
import Banner2 from "@/components/banner2";

export default function Home() {
  return (
    <main>
      <ToastContainer />
      <Categories />
      <Hero />
      <DiscountedItems />
      <Feature />
      <FeaturedCategories />
      <NewProducts />
      <BestSeller />
      <Banner2 />
    </main>
  );
}
