import Nav from "@/components/nav";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Nav />

      {children}

      <Toaster />
    </div>
  );
}
