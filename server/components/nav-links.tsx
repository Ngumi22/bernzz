import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/invoices",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Products",
    href: "/Products",
    icon: DocumentDuplicateIcon,
  },
  { name: "Customers", href: "/customers", icon: UserGroupIcon },
  {
    name: "Analytics",
    href: "/analytics",
    icon: DocumentDuplicateIcon,
  },
];

export default function NavLinks() {
  return (
    <div className="w-1/4 h-screen">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className="flex grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </div>
  );
}
