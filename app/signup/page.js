"use client";
import React, { useState } from "react";
import supabase from "@/app/supabase/supabaseClient";
import Link from "next/link";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSignup = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            setFormError("Please fill all the fields");
            return;
        }
        setFormError(null);
        setLoading(true);

        try {
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            });
            setLoading(false);
            window.location.href = "/signin";
            setSuccessMessage('Successfully signed up')


        } catch (error) {
            console.error("Error signing up:", error.message);
            setFormError(error.message);
        }
    };

    const GoogleAuth = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            })
            setLoading(false);
            window.location.href = "/";
            setSuccessMessage('Successfully signed up')
        } catch (error) {
            setFormError(error.message)
        }


    }

    return (
        <div className="h-[78vh] flex flex-col justify-center items-center gap-4 ">
            <div className="flex flex-col justify-center   gap-4 h-[60vh] w-[60vh] bg-[#102632] rounded-lg ">
                <h2 className="mx-auto">Sign Up</h2>
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
                <button className="mx-6 px-2 py-2 bg-[#92a9a7] text-black rounded-lg h-10" onClick={handleSignup}>  {loading ? 'Loading...' : 'Sign Up'} </button>
                <button onClick={GoogleAuth} className="mx-6 px-2 py-2 bg-[#92a9a7] text-black rounded-lg h-10">  {loading ? 'Loading...' : 'Google'}</button>
                {formError && <p className="text-black text-sm font-bold bg-[red] text-center mx-24 rounded-xl"> {formError}</p>}
                {successMessage && <p className="text-black bg-[green] text-center mx-24 rounded-xl">{successMessage}</p>}

                <span className="text-center text-sm ">Already have an Account ? <Link className="text-[orange]" href={'/signin'}> click here</Link> </span>
            </div>
        </div>
    );
};

export default SignUp;          
