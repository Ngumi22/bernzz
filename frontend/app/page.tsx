"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Hero from "@/components/Hero-Section/hero-carousel";

export default function Home() {
  return (
    <main>
      <ToastContainer />
      <Hero />
    </main>
  );
}
