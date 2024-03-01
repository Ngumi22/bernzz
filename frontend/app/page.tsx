"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Categories from "@/components/categories";
import Hero from "@/components/hero";
import Laptops from "@/components/laptops";
import Feature from "@/components/feature";

export default function Home() {
  return (
    <main>
      <ToastContainer />
      <Categories />
      <Hero />
      <Feature />
      <Laptops />
    </main>
  );
}
