import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "DriveFleet — Car Rental Platform",
  description: "Explore, book, and manage cars with DriveFleet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} flex flex-col min-h-screen bg-gray-50`}>
        <AuthProvider>
          <Toaster position="top-right" />
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}