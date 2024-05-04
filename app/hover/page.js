"use client";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

const AboutButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      <Head>
        <title>Home | Your Website</title>
        <meta name="description" content="Your description here" />
        {/* Add more metadata here */}
      </Head>
      <Link href="/about">
        <button
          className="w-24 bg-[#102632] border-solid border-2 rounded-md relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? (
            <span className="absolute top-full left-0 bg-gray-800 text-white p-2 rounded opacity-100 hover:opacity-100 transition-opacity duration-300">
              Different Text on Hover
            </span>
          ) : (
            <span className="absolute top-full left-0 bg-gray-800 text-white p-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
              About Us Text
            </span>
          )}
          About Us
        </button>
      </Link>
    </div>
  );
};

export default AboutButton;
