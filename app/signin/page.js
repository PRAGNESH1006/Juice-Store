"use client";
import supabase from "@/app/supabase/supabaseClient";
import React, { useState } from "react";
import Link from "next/link";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleLogIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError("Please fill all the fields");
      return;
    }
    setFormError(null);
    setLoading(true);
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      window.location.href = "/";
      setLoading(false);
      setSuccessMessage("Successfully logged in");
      console.log(user);
    } catch (error) {
      setFormError(error.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-[78vh] flex flex-col justify-center items-center gap-4 ">
      <div className="flex flex-col justify-center   gap-4 h-[50vh] w-[60vh] bg-[#102632] rounded-lg ">
        <h2 className="mx-auto">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mx-6 px-2 py-2 bg-[white]  text-black rounded-lg h-10"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mx-6 px-2 py-2 bg-[white] text-black rounded-lg h-10"
        />
        <button
          className="mx-6 px-2 py-2 bg-[#92a9a7] text-black rounded-lg h-10"
          onClick={handleLogIn}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        {formError && (
          <p className="text-black text-sm font-bold bg-[red] text-center mx-24 rounded-xl">
            {" "}
            {formError}
          </p>
        )}
        {successMessage && (
          <p className="text-black text-sm bg-[green] text-center mx-24 rounded-xl">
            {successMessage}
          </p>
        )}

        <span className="text-center text-sm ">
          Don&apos;t have an Account ?{" "}
          <Link className="text-[orange]" href={"/signup"}>
            {" "}
            click here
          </Link>{" "}
        </span>
      </div>
    </div>
  );
}

export default LogIn;
