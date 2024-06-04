import Link from "next/link";
import { Menu, Package2, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Cart from "@/components/Navigation/cart";

export default function MainNav() {
  return (
    <div className="flex w-full flex-col">
      {/* <div className="bg-black h-14">
        <p>Marquee</p>
      </div> */}
      <header className="sticky top-0 flex justify-between h-28 items-center gap-4 border-b bg-background px-4 md:px-8">
        <div className="hidden flex-col gap-6 md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <h2 className="font-extrabold text-4xl">Bernzz</h2>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link className="text-2xl font-bold" href="/">
              Bernzz
            </Link>
            <nav className="grid gap-6 my-10">
              <Link
                href="#"
                className="hover:text-foreground text-md font-medium">
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-md font-medium">
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-md font-medium">
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-md font-medium">
                Customers
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-md font-medium">
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div>
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[22rem] md:w-[26rem] lg:w-[30rem]"
              />
            </div>
          </form>
        </div>
        <div className="">
          <Cart />
        </div>
      </header>
    </div>
  );
}
