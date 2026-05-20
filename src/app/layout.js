import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/HeroUIProvider";
import AuthProvider from "@/context/AuthContext"; // ✅ fixed
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "DriveFleet — Drive Your Journey with Premium Rentals",
  description: "Explore and book premium cars easily with DriveFleet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={`${geist.className} bg-white min-h-screen flex flex-col`}>
        <Providers>
          <AuthProvider>
            <Toaster position="top-right" />
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}