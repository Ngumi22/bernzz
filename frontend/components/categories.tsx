"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string }[] = [
  {
    title: "HP",
    href: "/docs/primitives/alert-dialog",
  },
  {
    title: "Lenovo",
    href: "/docs/primitives/hover-card",
  },
  {
    title: "MacBooks",
    href: "/docs/primitives/progress",
  },
  {
    title: "Dell",
    href: "/docs/primitives/scroll-area",
  },
  {
    title: "Asus",
    href: "/docs/primitives/tabs",
  },
  {
    title: "Microsoft",
    href: "/docs/primitives/tooltip",
  },
];

export default function Categories() {
  return (
    <NavigationMenu className="py-4 bg-black hidden md:flex container list-none">
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-inherit text-white">
          Laptops
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid grid-cols-2 bg-black text-yellow-400 p-4 mt-2">
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}></ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-inherit text-white">
          Desktops
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid grid-cols-2 bg-black text-yellow-400 p-4 mt-2">
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}></ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-inherit text-white">
          Accessories
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid grid-cols-2 bg-black text-yellow-400 p-4 mt-2">
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}></ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-inherit text-white">
          SoftWares
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid grid-cols-2 bg-black text-yellow-400 p-4 mt-2">
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}></ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-inherit text-white">
          Tablets
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid grid-cols-2 bg-black text-yellow-400 p-4 mt-2">
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}></ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-inherit text-white">
          Kid's Zone
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid grid-cols-2 bg-black text-yellow-400 p-4 mt-2">
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}></ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-inherit text-white">
          Offers & Discounts
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid grid-cols-2 bg-black text-yellow-400 p-4 mt-2">
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}></ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none w-full space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
