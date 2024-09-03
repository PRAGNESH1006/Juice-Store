"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }) => {
  useEffect(() => {
    // Ensure footer sticks to bottom even on page reload
    const handleResize = () => {
      const body = document.body;
      const footer = document.querySelector("footer");
      const bodyHeight = body.offsetHeight;
      const windowHeight = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen  `}>
        <div className="flex-grow">
          {/* <Navbar /> */}
          <Nav />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
