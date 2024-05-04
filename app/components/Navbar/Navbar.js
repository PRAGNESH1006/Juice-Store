"use client";
// import Image from 'next/image'
import supabase from "@/app/supabase/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const newsession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
      console.log(user);
    };
    newsession();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    console.log("signOut");
    setCurrentUser(null);
  };

  const getUSerData = () => {
    window.location.href = "/dashboard";
  };

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
            {currentUser ? (
              <button
                onClick={signOut}
                className="w-24 bg-[#102632] border-solid border-2 border-sky-500 rounded-md"
              >
                Log Out
              </button>
            ) : (
              <Link href={"/signin"}>
                <button className="w-24 bg-[#102632] border-solid border-2 border-sky-500 rounded-md">
                  Sign In
                </button>
              </Link>
            )}

            <Link href={"/about"}>
              <button className="w-24 bg-[#102632] border-solid border-2 border-sky-500 rounded-md">
                About Us
              </button>
            </Link>
          </ul>
        </div>
        {currentUser && (
          <div
            className="flex justify-center items-center gap-2 hover:cursor-pointer"
            onClick={getUSerData}
          >
            <p>{currentUser.user_metadata.name}</p>
            <img
              src={currentUser.user_metadata.avatar_url}
              className="h-10 w-10 rounded-[50%]"
              alt="err"
            />
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
