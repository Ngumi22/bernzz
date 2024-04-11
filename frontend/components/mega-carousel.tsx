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
  { name: "Desktops", imgSrc: "/sam.png" },
  { name: "Monitors", imgSrc: "/sam.png" },
  { name: "Networking", imgSrc: "/sam.png" },
  { name: "Accessories", imgSrc: "/sam.png" },
  { name: "Phones & Tablets", imgSrc: "/sam.png" },
  { name: "Kid's Zone", imgSrc: "/sam.png" },
  { name: "Sales & Offers", imgSrc: "/sam.png" },
];

export default function MegaMenuCarousel() {
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
            delay: 2000,
          }),
        ]}
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full overflow-hidden relative rounded-md">
        <CarouselContent className="border-0">
          {slides.map((slide) => (
            <CarouselItem
              key={slide.name}
              className="w-full overflow-hidden border-0">
              <Card className="border-0">
                <CardContent className="md:h-80 md:items-center flex justify-around border-0 items-center p-0">
                  <div className="h-full w-auto">
                    <Image
                      height={400}
                      width={400}
                      src={slide.imgSrc}
                      alt={slide.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
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
