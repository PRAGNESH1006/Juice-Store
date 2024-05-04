import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white text-center py-4 my-0 ">
      <div>Smoothie data, method, and rating by Pragnesh Padhiyar</div>
      <div>
        &copy; {currentYear} Pragnesh Padhiyar. All rights reserved.{" "}
        <Link href={"/about"}>
          <button className="w-auto px-1 bg-[#102632] border-solid border-2 rounded-md ">
            About Us
            <span className="absolute  bg-gray-800 text-white  rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
              About Us Text
            </span>
          </button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
