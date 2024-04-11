import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function MegaMenu() {
  return (
    <div className="droppable">
      <h2 className="text-white text-sm cursor-pointer flex justify-center items-center h-full">
        All Categories
        <span className="ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-down"
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
          </svg>
        </span>
      </h2>
      <div className="mega-menu hidden absolute left-0 right-0 z-50 w-[95.5%] mx-auto px-8 bg-white">
        <div className="flex justify-between items-center">
          <Tabs defaultValue="Laptops" className="flex justify-center gap-8">
            <TabsList className="flex flex-col justify-center items-start w-[18rem]">
              <TabsTrigger value="Laptops">
                <div className="flex flex-col items-start">
                  <p>Laptops</p>
                  <p className="text-sm font-normal">Trusted Laptops Shop</p>
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-right"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </span>
              </TabsTrigger>
              <TabsTrigger value="Computer">
                <div className="flex flex-col items-start">
                  <p>Computers</p>
                  <p className="text-sm font-normal text-wrap">
                    Quality Computers in Kenya
                  </p>
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-right"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </span>
              </TabsTrigger>
              <TabsTrigger value="Phones">
                <div className="flex flex-col items-start">
                  <p>Phones</p>
                  <p className="text-sm font-normal">Affordable phones</p>
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-right"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </span>
              </TabsTrigger>
              <TabsTrigger value="Desktops">
                <div className="flex flex-col items-start">
                  <p>Desktops</p>
                  <p className="text-sm font-normal">Wide range of Desktops</p>
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-right"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </span>
              </TabsTrigger>
              <TabsTrigger value="Printers">
                <div className="flex flex-col items-start">
                  <p>Printers</p>
                  <p className="text-sm font-normal">
                    Cheapest quality Printers
                  </p>
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-right"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </span>
              </TabsTrigger>
              <TabsTrigger value="Accessories">
                <div className="flex flex-col items-start">
                  <p>Accessories</p>
                  <p className="text-sm font-normal">All Tech Accessories</p>
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-right"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </span>
              </TabsTrigger>
              <TabsTrigger value="Networking">
                <div className="flex flex-col items-start">
                  <p>Networking</p>
                  <p className="text-sm font-normal">All Tech Networking</p>
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-right"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </span>
              </TabsTrigger>
            </TabsList>
            <Separator orientation="vertical" />
            <TabsContent value="Laptops">
              <div className="flex justify-between items-start pt-4 pb-8 text-sm flex-col gap-8">
                <h1 className="uppercase font-bold">Featured Laptops</h1>
                <ul className="flex justify-center items-center gap-4">
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                </ul>
                <Link
                  href="/products"
                  className="uppercase py-2 px-6 bg-gray-300 text-black w-64 text-start font-bold">
                  See all laptops
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="Computer">
              <div className="flex justify-between items-start pt-4 pb-8 text-sm flex-col gap-8">
                <h1 className="uppercase font-bold">Featured Computers</h1>
                <ul className="flex justify-center items-center gap-4">
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                </ul>
                <Link
                  href="/products"
                  className="uppercase py-2 px-6 bg-gray-300 text-black w-64 text-start font-bold">
                  See all Computers
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="Phones">
              <div className="flex justify-between items-start pt-4 pb-8 text-sm flex-col gap-8">
                <h1 className="uppercase font-bold">Featured Phones</h1>
                <ul className="flex justify-center items-center gap-4">
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                </ul>
                <Link
                  href="/products"
                  className="uppercase py-2 px-6 bg-gray-300 text-black w-64 text-start font-bold">
                  See all phones
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="Desktops">
              <div className="flex justify-between items-start pt-4 pb-8 text-sm flex-col gap-8">
                <h1 className="uppercase font-bold">Featured Desktops</h1>
                <ul className="flex justify-center items-center gap-4">
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                </ul>
                <Link
                  href="/products"
                  className="uppercase py-2 px-6 bg-gray-300 text-black w-64 text-start font-bold">
                  See all Desktop
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="Printers">
              <div className="flex justify-between items-start pt-4 pb-8 text-sm flex-col gap-8">
                <h1 className="uppercase font-bold">Featured Printers</h1>
                <ul className="flex justify-center items-center gap-4">
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                </ul>
                <Link
                  href="/products"
                  className="uppercase py-2 px-6 bg-gray-300 text-black w-64 text-start font-bold">
                  See all printers
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="Accessories">
              <div className="flex justify-between items-start pt-4 pb-8 text-sm flex-col gap-8">
                <h1 className="uppercase font-bold">Featured Accessories</h1>
                <ul className="flex justify-center items-center gap-4">
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                </ul>
                <Link
                  href="/products"
                  className="uppercase py-2 px-6 bg-gray-300 text-black w-64 text-start font-bold">
                  See all Accessories
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="Networking">
              <div className="flex justify-between items-start pt-4 pb-8 text-sm flex-col gap-8">
                <h1 className="uppercase font-bold">Featured Networking</h1>
                <ul className="flex justify-center items-center gap-4">
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                  <Image
                    src="/sam.png"
                    className="object-contain h-full"
                    alt="Image"
                    height={200}
                    width={200}
                  />
                </ul>
                <Link
                  href="/products"
                  className="uppercase py-2 px-6 bg-gray-300 text-black w-64 text-start font-bold">
                  See all Networking
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
