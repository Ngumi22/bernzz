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
        <div className="flex justify-between items-center w-full gap-4 py-4">
          <ul className="flex justify-between items-center w-full">
            <li className="grid grid-flow-row gap-y-4">
              <h2 className="text-sm font-semibold underline underline-offset-8">
                Laptops
              </h2>

              <a href="#" className="text-xs">
                Hp
              </a>
              <a href="#" className="text-xs">
                Lenovo
              </a>
              <a href="#" className="text-xs">
                Dell
              </a>
              <a href="#" className="text-xs">
                MacBook
              </a>
              <a href="#" className="text-xs">
                Asus
              </a>
              <a href="#" className="text-xs">
                Etc
              </a>
            </li>
          </ul>
          <ul className="flex justify-between items-center w-full">
            <li className="grid grid-flow-row gap-y-4">
              <h2 className="text-sm font-semibold underline underline-offset-8">
                Desktops
              </h2>

              <a href="#" className="text-xs">
                Hp
              </a>
              <a href="#" className="text-xs">
                Lenovo
              </a>
              <a href="#" className="text-xs">
                Dell
              </a>
              <a href="#" className="text-xs">
                MacBook
              </a>
              <a href="#" className="text-xs">
                Asus
              </a>
              <a href="#" className="text-xs">
                Etc
              </a>
            </li>
          </ul>
          <ul className="flex justify-between items-center w-full">
            <li className="grid grid-flow-row gap-y-4">
              <h2 className="text-sm font-semibold underline underline-offset-8">
                Monitors
              </h2>

              <a href="#" className="text-xs">
                Hp
              </a>
              <a href="#" className="text-xs">
                Lenovo
              </a>
              <a href="#" className="text-xs">
                Dell
              </a>
              <a href="#" className="text-xs">
                MacBook
              </a>
              <a href="#" className="text-xs">
                Asus
              </a>
              <a href="#" className="text-xs">
                Etc
              </a>
            </li>
          </ul>
          <ul className="flex justify-between items-center w-full">
            <li className="grid grid-flow-row gap-y-4">
              <h2 className="text-sm font-semibold underline underline-offset-8">
                Networking
              </h2>

              <a href="#" className="text-xs">
                Hp
              </a>
              <a href="#" className="text-xs">
                Lenovo
              </a>
              <a href="#" className="text-xs">
                Dell
              </a>
              <a href="#" className="text-xs">
                MacBook
              </a>
              <a href="#" className="text-xs">
                Asus
              </a>
              <a href="#" className="text-xs">
                Etc
              </a>
            </li>
          </ul>
          <ul className="flex justify-between items-center w-full">
            <li className="grid grid-flow-row gap-y-4">
              <h2 className="text-sm font-semibold underline underline-offset-8">
                Accessories
              </h2>

              <a href="#" className="text-xs">
                Hp
              </a>
              <a href="#" className="text-xs">
                Lenovo
              </a>
              <a href="#" className="text-xs">
                Dell
              </a>
              <a href="#" className="text-xs">
                MacBook
              </a>
              <a href="#" className="text-xs">
                Asus
              </a>
              <a href="#" className="text-xs">
                Etc
              </a>
            </li>
          </ul>
          <ul className="flex justify-between items-center w-full">
            <li className="grid grid-flow-row gap-y-4">
              <h2 className="text-sm font-semibold underline underline-offset-8">
                Phones & Tablets
              </h2>

              <a href="#" className="text-xs">
                Hp
              </a>
              <a href="#" className="text-xs">
                Lenovo
              </a>
              <a href="#" className="text-xs">
                Dell
              </a>
              <a href="#" className="text-xs">
                MacBook
              </a>
              <a href="#" className="text-xs">
                Asus
              </a>
              <a href="#" className="text-xs">
                Etc
              </a>
            </li>
          </ul>
          <ul className="flex justify-between items-center w-full">
            <li className="grid grid-flow-row gap-y-4">
              <h2 className="text-sm font-semibold underline underline-offset-8">
                Printers & Scanners
              </h2>

              <a href="#" className="text-xs">
                Hp
              </a>
              <a href="#" className="text-xs">
                Lenovo
              </a>
              <a href="#" className="text-xs">
                Dell
              </a>
              <a href="#" className="text-xs">
                MacBook
              </a>
              <a href="#" className="text-xs">
                Asus
              </a>
              <a href="#" className="text-xs">
                Etc
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
