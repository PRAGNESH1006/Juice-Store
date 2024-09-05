"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";
import supabase from "@/app/supabase/supabaseClient";
import { Toaster, toast } from "react-hot-toast";
import GoogleIcon from "@mui/icons-material/Google";
import { FaDiscord } from "react-icons/fa";
export default function SignIn() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setError("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        toast.success("Signed in successfully!");
        router.push("/"); // Redirect to home page
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });
      if (error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        toast.success("Account created successfully!");
        setIsSignIn(true); // Switch to sign-in form after successful sign-up
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        toast.success("Password reset email sent!");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        toast.success("Signed in successfully!");
        router.push("/"); // Redirect to home page
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6  py-1 lg:px-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <img
        alt="Your Company"
        src="/resources/cover.png"
        className="mx-auto h-[50px] w-[100px] rounded-[10px] shadow-lg mb-2 animate-pulse"
      />

      {isSignIn ? (
        <>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg p-2 shadow-md">
            <h2 className=" text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg p-6 shadow-md">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      onClick={handlePasswordReset}
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out duration-150 transform ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>

            {error && (
              <p className="mt-2 text-center text-sm text-red-500">{error}</p>
            )}

            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => handleOAuthSignIn("google")}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white shadow-sm hover:bg-red-500 focus:outline-none transition ease-in-out duration-150 transform hover:scale-105"
                aria-label="Sign in with Google"
              >
                <span className="sr-only">Sign in with Google</span>
                <GoogleIcon />
              </button>
              <button
                onClick={() => handleOAuthSignIn("discord")}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white shadow-sm hover:bg-gray-700 focus:outline-none transition ease-in-out duration-150 transform hover:scale-105"
                aria-label="Sign in with Discord"
              >
                <span className="sr-only">Sign in with Discord</span>
                <FaDiscord />
              </button>
            </div>

            <p className="mt-2 text-center text-sm text-gray-500">
              Dont have an account?{" "}
              <Button
                onClick={toggleForm}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                SignUp Here
              </Button>
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg p-2 shadow-md">
            <h2 className=" text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg p-6 shadow-md">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  UserName
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out duration-150 transform ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>

            {error && (
              <p className="mt-2 text-center text-sm text-red-500">{error}</p>
            )}

            <div className="mt-3 flex justify-center space-x-4">
              <button
                onClick={() => handleOAuthSignIn("google")}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white shadow-sm hover:bg-red-500 focus:outline-none transition ease-in-out duration-150 transform hover:scale-105"
                aria-label="Sign up with Google"
              >
                <span className="sr-only">Sign up with Google</span>
                <GoogleIcon />
              </button>
              <button
                onClick={() => handleOAuthSignIn("discord")}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white shadow-sm hover:bg-gray-700 focus:outline-none transition ease-in-out duration-150 transform hover:scale-105"
                aria-label="Sign up with Discord"
              >
                <span className="sr-only">Sign up with Discord</span>
                <FaDiscord />
              </button>
            </div>

            <p className="mt-2 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Button
                onClick={toggleForm}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                SignIn Here
              </Button>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
