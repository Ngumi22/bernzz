"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MiniNav from "@/components/mini-nav";
import Hero from "@/components/hero";
import Feature from "@/components/feature";
import Banner1 from "@/components/banner1";
import FeaturedCategories from "@/components/featured-categories";
import NewProducts from "@/components/new-products";
import BestSeller from "@/components/best-seller";
import Banner2 from "@/components/banner2";
import Recommended from "@/components/recommended";
import Blog from "@/components/blog";
import ShopByBrand from "@/components/shop-by-brand";
import Carddd from "@/components/carddd";
import WeeklyDeals from "@/components/weekly-deals";
import SideMenu from "@/components/side-menu";

export default function Home() {
  return (
    <main>
      <ToastContainer />
      <MiniNav />
      <SideMenu />
      <Hero />
      <Feature />
      <WeeklyDeals />
      <Banner1 />
      <ShopByBrand />
      <FeaturedCategories />
      <NewProducts />
      <BestSeller />
      <Banner2 />
      <Recommended />
      <Blog />
    </main>
  );
}
