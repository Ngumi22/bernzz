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

interface Slide {
  name: string;
  imgSrc: string;
}
const slides: Slide[] = [
  { name: "Laptops", imgSrc: "lap1.jpg" },
  { name: "Desktops", imgSrc: "lap3.jpg" },
  { name: "Monitors", imgSrc: "lap3.jpg" },
  { name: "Networking", imgSrc: "lap1.jpg" },
  { name: "Accessories", imgSrc: "lap3.jpg" },
  { name: "Phones & Tablets", imgSrc: "lap4.jpg" },
  { name: "Kid's Zone", imgSrc: "lap1.jpg" },
  { name: "Sales & Offers", imgSrc: "lap3.jpg" },
];

export default function HeroImages() {
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
    <section className="flex justify-between items-center w-full md:w-3/5">
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
        className="w-full my-2 overflow-hidden relative">
        <CarouselContent className="mx-auto px-2 md:px-1">
          {slides.map((slide) => (
            <CarouselItem key={slide.name} className="w-full overflow-hidden">
              <div className="">
                <Card>
                  <CardContent className="md:h-96 md:items-center flex justify-center p-0 bg-yellow-500 shadow-lg rounded-md">
                    <div className="p-6">
                      <p className="font-semibold mb-2">SONY-WH-1000XM4</p>
                      <p className="">Noice Cancelling Wireless Headphone</p>
                      <button className="text-sm bg-black text-white py-2 px-4 mt-5 rounded-md">
                        SHOP NOW
                      </button>
                    </div>
                    <div className="">
                      <img
                        src={slide.imgSrc}
                        alt={slide.name}
                        className="h-full w-full rounded-r-md"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-2 py-2 my-1">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`inline-block h-1 md:h-2 w-2 md:w-10 rounded-full ${
                current === index + 1 ? "bg-yellow-300" : "bg-black"
              }`}
              aria-current={current === index + 1 ? "true" : "false"}></span>
          ))}
        </div>
      </Carousel>
      <div></div>
    </section>
  );
}
