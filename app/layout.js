import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Navbar/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smoothie",
  description: "Rate Smoothie",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${inter.className} absolute top-0  h-[100%] w-[100%] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white `}
      >
        <Header />
        <div className="min-h-[78.6vh] w-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
