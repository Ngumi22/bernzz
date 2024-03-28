"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MiniNav from "@/components/mini-nav";
import Hero from "@/components/hero";
import Feature from "@/components/feature";
import DiscountedItems from "@/components/discount";
import Banner1 from "@/components/banner1";
import FeaturedCategories from "@/components/featured-categories";
import NewProducts from "@/components/new-products";
import BestSeller from "@/components/best-seller";
import Banner2 from "@/components/banner2";
import Recommended from "@/components/recommended";
import Blog from "@/components/blog";
import ShopByBrand from "@/components/shop-by-brand";

export default function Home() {
  return (
    <main>
      <ToastContainer />
      <MiniNav />
      <Hero />
      <Feature />
      <ShopByBrand />
      <DiscountedItems />
      <Banner1 />
      <FeaturedCategories />
      <NewProducts />
      <BestSeller />
      <Banner2 />
      <Recommended />
      <Blog />
    </main>
  );
}
