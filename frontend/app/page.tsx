"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Categories from "@/components/categories";
import Hero from "@/components/hero";
import Laptops from "@/components/laptops";

export default function Home() {
  return (
    <main>
      <ToastContainer />
      <Categories />
      <Hero />
      <Laptops />
    </main>
  );
}
