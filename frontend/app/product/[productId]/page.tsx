"use client";
import React, { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "@/lib/productsApi";
import Image from "next/image";

interface IParams {
  productId?: string;
}

const Product: React.FC<{ params: IParams }> = ({ params }) => {
  const { productId } = params;
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(productId || "");

  const [selectedImage, setSelectedImage] = useState(product?.image || "");

  useEffect(() => {
    // Update selectedImage when product.image changes
    setSelectedImage(product?.image || "");
  }, [product]);

  // Function to handle thumbnail click
  const handleThumbnailClick = (thumbnail: string) => {
    setSelectedImage(thumbnail);
  };

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    // Fetch product data when the component mounts or when productId changes
    if (productId) {
      // Fetch product data
    }
  }, [productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10 mt-5">
        <div className="container mx-auto px-4">
          <Image
            height={400}
            width={400}
            className="w-full h-[20rem] object-contain overflow-hidden"
            src={selectedImage}
            alt={product.name}
          />

          <div className="mt-3 grid grid-cols-4 gap-4">
            {product.thumbnails.map((thumbnail: string, index: number) => (
              <div key={index} onClick={() => handleThumbnailClick(thumbnail)}>
                <Image
                  height={200}
                  width={200}
                  className="cursor-pointer h-[8rem] overflow-hidden object-contain"
                  src={thumbnail}
                  alt={product.name}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto px-5 lg:px-5">
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">
            {product.description}
          </h2>
          <div className="mt-1">
            <div className="flex items-center my-1">
              {/* Rating SVGs */}
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(product.rating)
                      ? "text-yellow-300"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                {product.rating}
              </span>
            </div>
          </div>

          <p className="flex mt-5 font-bold">
            Availability:{" "}
            <span className="text-green-600 ml-2">
              {product.stock > 1 ? <p>In Stock</p> : <p>Sorry out of stock</p>}
            </span>
          </p>
          <p className="font-bold">
            Brand: <span className="font-normal">{product.brand}</span>
          </p>
          <p className="font-bold">
            Category: <span className="font-normal">{product.category}</span>
          </p>
          <p className="font-bold">
            SKU: <span className="font-normal">{product.sku}</span>
          </p>

          {product.discountPercentage > 0 ? (
            <div className="flex justify-start items-center mt-4">
              <div className="flex gap-1 text-2xl font-bold text-violet-900">
                <p>Price: </p>
                KSH
                <span>
                  {product.price -
                    (product.price * product.discountPercentage) / 100}
                </span>
              </div>
              <p className="text-lg text-red-500 line-through font-bold flex pl-2">
                <span className="pl-1">KSH {product.price}</span>
              </p>
            </div>
          ) : (
            <div className="text-2xl text-violet-900 font-bold flex mt-4">
              Price:
              <span className="pl-2">KSH {product.price}</span>
            </div>
          )}

          <ul>
            {product.category == "Laptop" ? (
              <li className="flex flex-col justify-center">
                <p className="font-bold text-sm italic">
                  Display:{" "}
                  <span className="font-normal">{product.display}</span>
                </p>
                <p className="font-bold text-sm italic">
                  Processor:{" "}
                  <span className="font-normal">{product.processor}</span>
                </p>
                <p className="font-bold text-sm italic">
                  Memory: <span className="font-normal">{product.memory}</span>
                </p>
                <p className="font-bold text-sm italic">
                  Storage:{" "}
                  <span className="font-normal">{product.storage}</span>
                </p>
                <p className="font-bold text-sm italic">
                  Graphics:{" "}
                  <span className="font-normal">{product.graphics}</span>
                </p>
                <p className="font-bold text-sm italic">
                  Operating System:{" "}
                  <span className="font-normal">{product.os}</span>
                </p>
                <p className="font-bold text-sm italic">
                  Connectivity:{" "}
                  <span className="font-normal">{product.connectivity}</span>
                </p>
                <p className="font-bold text-sm italic">
                  Ports: <span className="font-normal">{product.ports}</span>
                </p>
                <p className="font-bold text-sm italic">
                  Battery Life:{" "}
                  <span className="font-normal">{product.battery}</span>
                </p>
                <p className="font-bold text-sm italic">
                  Dimensions:{" "}
                  <span className="font-normal">{product.dimensions}</span>
                </p>
                <p className="font-bold text-sm italic">
                  Can be Used For:{" "}
                  <span className="font-normal">{product.use}</span>
                </p>
              </li>
            ) : (
              <li>Others</li>
            )}
          </ul>

          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Quantity</p>

            <div className="flex">
              <button
                onClick={handleDecrease}
                className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                &minus;
              </button>
              <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                {quantity}
              </div>
              <button
                onClick={handleIncrease}
                className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                &#43;
              </button>
            </div>
          </div>

          <div className="mt-7 flex flex-row items-center gap-6">
            <button className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="mr-3 h-4 w-4">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              Add to cart
            </button>
            <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="mr-3 h-4 w-4">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              Wishlist
            </button>
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-[1200px] px-5 py-5 lg:py-10">
        <h2 className="text-xl">Product details</h2>
        <p className="mt-4 lg:w-3/4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          consequatur temporibus deserunt id labore. Et, iusto nostrum repellat
          laudantium iure fuga quibusdam laborum laboriosam earum. Fugit
          possimus impedit harum dolor? <br />
          Laboriosam quo impedit, reprehenderit eum eaque eius tempore non
          blanditiis, labore quibusdam nesciunt atque doloribus cum autem?
          <br />
          Autem magni ullam alias pariatur corporis officiis animi neque, quo,
          ab aperiam ratione! Similique deserunt dolore dignissimos, iure
          quisquam mollitia perferendis pariatur reprehenderit dolorem, cum enim
          aut ad amet in ducimus sint, commodi neque quis saepe libero dolor
          dolores. Sequi voluptas adipisci minus!
        </p>

        <table className="mt-7 w-full table-auto divide-x divide-y lg:w-1/2">
          <tbody className="divide-x border">
            <tr>
              <td className="border pl-4 font-bold">Color</td>
              <td className="border pl-4">Black, Brown, Red</td>
            </tr>

            <tr>
              <td className="border pl-4 font-bold">Material</td>
              <td className="border pl-4">Latex</td>
            </tr>

            <tr>
              <td className="border pl-4 font-bold">Weight</td>
              <td className="border pl-4">55 Kg</td>
            </tr>
          </tbody>
        </table>
      </section>
      <p className="mx-auto mt-10 mb-5 max-w-[1200px] px-5">RELATED PRODUCTS</p>
      <section className="container mx-auto grid max-w-[1200px] grid-cols-2 gap-3 px-5 pb-10 lg:grid-cols-4">
        <div className="relative flex flex-col">
          <div className="absolute flex h-1/2 w-full justify-center gap-3 pt-16 opacity-0 duration-150 hover:opacity-100">
            <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-amber-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-4 w-4">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-amber-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </span>
          </div>
          <Image
            height={400}
            width={400}
            className="w-full"
            src={product.image}
            alt={product.name}
          />

          <div>
            <p className="mt-2">CHAIR</p>
            <p className="font-medium text-violet-900">
              $45.00
              <span className="text-sm text-gray-500 line-through">
                $500.00
              </span>
            </p>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-gray-200">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>
              <p className="text-sm text-gray-400">(38)</p>
            </div>

            <div>
              <button className="my-5 h-10 w-full bg-violet-900 text-white">
                Add to cart
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <Image
            height={200}
            width={200}
            className="w-full"
            src={product.image}
            alt={product.name}
          />

          <div>
            <p className="mt-2">SOFA</p>
            <p className="font-medium text-violet-900">
              $45.00
              <span className="text-sm text-gray-500 line-through">
                $500.00
              </span>
            </p>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-gray-200">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>
              <p className="text-sm text-gray-400">(38)</p>
            </div>

            <div>
              <button className="my-5 h-10 w-full bg-violet-900 text-white">
                Add to cart
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <Image
            height={200}
            width={200}
            className="w-full"
            src={product.image}
            alt={product.name}
          />

          <div>
            <p className="mt-2">GUYER KITCHEN</p>
            <p className="font-medium text-violet-900">
              $45.00
              <span className="text-sm text-gray-500 line-through">
                $500.00
              </span>
            </p>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-gray-200">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>
              <p className="text-sm text-gray-400">(38)</p>
            </div>

            <div>
              <button className="my-5 h-10 w-full bg-violet-900 text-white">
                Add to cart
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <Image
            height={400}
            width={400}
            className="w-full"
            src={product.image}
            alt={product.name}
          />

          <div>
            <p className="mt-2">GUYER ROOM</p>
            <p className="font-medium text-violet-900">
              $45.00
              <span className="text-sm text-gray-500 line-through">
                $500.00
              </span>
            </p>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-gray-200">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>
              <p className="text-sm text-gray-400">(38)</p>
            </div>

            <div>
              <button className="my-5 h-10 w-full bg-violet-900 text-white">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
