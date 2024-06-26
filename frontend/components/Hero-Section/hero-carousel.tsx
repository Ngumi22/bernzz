"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Slide } from "@/lib/definitions";
import Image from "next/image";

const slides: Slide[] = [
  { name: "Laptops", imgSrc: "/sam.png" },
  { name: "Phones & Tablets", imgSrc: "/sam.png" },
  { name: "Desktops and Monitors", imgSrc: "/sam.png" },
  { name: "Networking and Security", imgSrc: "/sam.png" },
  { name: "Accessories", imgSrc: "/sam.png" },
  { name: "Printers & Scanners", imgSrc: "/sam.png" },
  { name: "Storage", imgSrc: "/sam.png" },
  { name: "All in One", imgSrc: "/sam.png" },
  { name: "Audio Devices", imgSrc: "/sam.png" },
];

export default function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="flex justify-between items-center w-full">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full overflow-hidden relative rounded-md">
        <CarouselContent className="">
          {slides.map((slide) => (
            <CarouselItem key={slide.name} className="w-full overflow-hidden">
              <Card className="h-96">
                <CardContent className="h-full md:items-center flex justify-around items-center p-0 bg-yellow-500 shadow-lg rounded-md">
                  <div className="p-6">
                    <p className="font-semibold mb-2 text-3xl">
                      SONY-WH-1000XM4
                    </p>
                    <p className="text-2xl">
                      Noice Cancelling Wireless Headphone
                    </p>
                    <p className="text-sm mt-4">
                      Noice Cancelling Wireless Headphone
                    </p>
                    <button className="text-md bg-black text-white py-2 px-6 mt-5 rounded-lg hover:bg-white hover:border-black hover:text-black font-semibold">
                      SHOP NOW
                    </button>
                  </div>
                  <div className="h-full w-auto">
                    <Image
                      height={400}
                      width={400}
                      src={slide.imgSrc}
                      alt={slide.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-2 py-2 my-1">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`inline-block h-2 w-2 bg-black rounded-full ${
                current === index + 1 ? "bg-yellow-300" : "bg-black"
              }`}
              aria-current={current === index + 1 ? "true" : "false"}></span>
          ))}
        </div>
      </Carousel>
    </section>
  );
}
