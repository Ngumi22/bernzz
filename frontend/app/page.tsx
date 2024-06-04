"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import HeroCarousel from "@/components/Hero/hero-carousel";

export default function Home() {
  return (
    <main>
      <ToastContainer />
      <HeroCarousel />
    </main>
  );
}
