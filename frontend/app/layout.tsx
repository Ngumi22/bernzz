import type { Metadata } from "next";
import { Inter, Noto_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/provider";
import MainNav from "@/components/main-nav";
import Footer from "@/components/footer";
import NextBreadcrumb from "@/components/breadcrumbs";

const inter = Inter({ subsets: ["latin"] });
const sans = Noto_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Bernzz Digital Solutions",
  description: "Bernzz Digital Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <StoreProvider>
          <MainNav />

          <NextBreadcrumb
            homeElement={"Home"}
            separator={<span> | </span>}
            activeClasses="text-amber-500"
            containerClasses="flex py-5 bg-gradient-to-r from-purple-600 to-blue-600"
            listClasses="hover:underline mx-2 font-bold"
            capitalizeLinks={true}
          />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
