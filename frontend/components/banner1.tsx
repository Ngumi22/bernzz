import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useGetAllProductsQuery } from "@/lib/productsApi";
import { Product } from "@/lib/definitions";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Banner1() {
  const { data: bannerProducts, isLoading, error } = useGetAllProductsQuery("");

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>Error loading products</p>;
  }
  let limitedBannerProduct: Product[] = [];

  if (bannerProducts) {
    // Create a copy of the bannerProducts array
    const copiedProducts = [...bannerProducts];

    // Shuffle the copied array
    const shuffledProducts = copiedProducts.sort(() => Math.random() - 0.5);

    // Select the first three elements from the shuffled array
    limitedBannerProduct = shuffledProducts.slice(0, 3);
  }
  const cardColors = ["bg-red-500", "bg-blue-500", "bg-green-600"];
  return (
    <section className="container flex justify-between items-center gap-x-8 my-8 banner__1">
      {limitedBannerProduct?.map(
        (product: { image: string; name: string }, index: number) => (
          <div
            key={index}
            className={`flex justify-between items-center py-6 px-2 w-full hover:opacity-[0.9] ${
              cardColors[index % cardColors.length]
            }`}>
            <div className="w-2/3 flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <p>HellowwwwwHellowwwww</p>
                <p>Hellowwww</p>
                <p>{product.name}</p>
              </div>
              <Link
                href="/products"
                className="flex w-1/2 justify-center items-center border border-yellow-500 bg-yellow-500 rounded-sm py-2 px-6 cursor-pointer font-semibold text-xs uppercase hover:bg-white hover:shadow-lg">
                Shop Now
              </Link>
            </div>
            <Image
              className="object-contain overflow-hidden hover:scale-[1.1] duration-300 ease-in-out"
              src={product.image}
              alt="sam"
              loading="lazy"
              width={180}
              height={180}
              quality={80}
            />
          </div>
        )
      )}
    </section>
  );
}
