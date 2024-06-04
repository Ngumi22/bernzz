import type { Metadata } from "next";
import { Inter, Noto_Sans, Montserrat, Lato } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/provider";
import MainNav from "@/components/Navigation/main-nav";
import Footer from "@/components/Navigation/footer";

const inter = Inter({ subsets: ["latin"] });
const sans = Lato({ subsets: ["latin"], weight: "400" });

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
          {children}
          {/* <Footer /> */}
        </StoreProvider>
      </body>
    </html>
  );
}
