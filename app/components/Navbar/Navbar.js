// import Image from 'next/image'
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <>
      <nav className="flex justify-evenly items-center h-[50px] bg-slate-800 text-white ">
        <Link href={"/"}>
          <div className="text-2xl flex justify-evenly items-center">
            <span>
              {" "}
              <img
                alt="new"
                src="https://media.tenor.com/5OtR9QMc2wEAAAAi/dancing-its-time-to-party.gif"
                className="h-10"
              />{" "}
            </span>{" "}
            Smoothie
          </div>
        </Link>
        <div className="text-base">
          <ul className="flex justify-between items-center gap-3">
            <Link href={"/"}>
              <button className="w-24 bg-[#102632] border-solid border-2 border-sky-500 rounded-md">
                Home
              </button>
            </Link>
            <Link href={"/create"}>
              <button className="w-24 bg-[#102632] border-solid border-2 border-sky-500 rounded-md">
                Add New
              </button>
            </Link>
            <Link href={"/signup"}>
              <button className="w-24 bg-[#102632] border-solid border-2 border-sky-500 rounded-md">
                Sign Up
              </button>
            </Link>

            <Link href={"/about"}>
              <button className="w-24 bg-[#102632] border-solid border-2 border-sky-500 rounded-md">
                About Us
              </button>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
