import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "./components/navbar";
import Providers from "../../provider/session-provider";
import NimeProviders from "../../provider/nime-provider";
import { ToastProvider } from "../../provider/toast-provider";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Quatronime",
  description: "Dibuat Oleh Kelompok 8",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "";

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className={isAdminRoute ? "bg-white" : "bg-[#121212] min-h-screen"}>
        <Providers>
          <ToastProvider />
          <NimeProviders />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
