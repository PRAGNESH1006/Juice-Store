"use client";
import supabase from "@/app/supabase/supabaseClient";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

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

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "home") {
      router.push("/");
    } else if (value === "dashboard") {
      router.push("/dashboard");
    } else if (value === "addItem") {
      router.push("/create");
    } else if (value === "signOut") {
      handleSignOut();
    }
  };

  return (
    <>
      <nav className="flex justify-around items-center h-[50px] bg-slate-800 text-white ">
        <Link href={"/"}>
          <div className="text-2xl flex justify-evenly items-center mx-0">
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
            {currentUser ? (
              <div
                className="flex justify-center items-center gap-2 "
                // onClick={getUSerData}
              >
                <p className="self-center">{currentUser.user_metadata.name}</p>
                <img
                  src={currentUser.user_metadata.avatar_url}
                  className="h-10 w-10 rounded-[50%] bg-white"
                  alt="err"
                />
                <select
                  className="bg-[#102632] h-10 w-[136px] rounded-lg flex items-center justify-center"
                  onChange={handleChange}
                >
                  <option value="home">Home</option>
                  <option value="dashboard">Dashboard</option>
                  <option value="addItem">Add Item</option>
                  <option value="signOut">Sign Out</option>
                </select>
              </div>
            ) : (
              <Link href={"/signin"}>
                <button className="w-24 bg-[#102632] border-solid border-2 border-sky-500 rounded-md">
                  Sign In
                </button>
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
