"use client";
import { useEffect, useState } from "react";
import supabase from "./supabase/supabaseClient";
import Link from "next/link";
export default function Home() {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    //fatching smppthies
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("could not fetch smoothies data");
        console.log(error);
        setSmoothies(false);
      }

      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };
    fetchData();
    const newsession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
      console.log(user);
      console.log(user.id);
    };
    newsession();
  }, [orderBy]);

  // deleting smoothies
  const handleDelete = async (id) => {
    try {
      const { data, error } = await supabase
        .from("smoothies")
        .delete()
        .eq("id", id)
        .select();

      // for clearing smoothie from page
      setSmoothies((smoothies) => {
        return smoothies.filter((sm) => sm.id !== id);
      });

      if (error) {
        throw error;
      }

      console.log("User deleted successfully:", data);
      return data;
    } catch (error) {
      console.error("Error deleting user:", error.message);
      throw error;
    }
  };

  return (
    <div className="flex items-center justify-center flex-col  gap-4 py-2 ">
      <div className="flex justify-evenly gap-2 items-center">
        <p>Order By:</p>
        <button
          onClick={() => setOrderBy("created_at")}
          className={`${
            orderBy === "created_at"
              ? "px-2 py-2 bg-[#373d7d] hover:bg-[#373d7d] text-black rounded-lg h-10"
              : "px-2 py-2 bg-[#8ea3a1] hover:bg-[#373d7d] text-black rounded-lg h-10"
          }`}
        >
          Time Created
        </button>
        <button
          onClick={() => setOrderBy("rating")}
          className={`${
            orderBy === "rating"
              ? "px-2 py-2 bg-[#373d7d] hover:bg-[#373d7d] text-black rounded-lg h-10"
              : "px-2 py-2 bg-[#8ea3a1] hover:bg-[#373d7d] text-black rounded-lg h-10"
          }`}
        >
          Rating
        </button>
        <button
          onClick={() => setOrderBy("title")}
          className={`${
            orderBy === "title"
              ? "px-2 py-2 bg-[#373d7d] hover:bg-[#373d7d] text-black rounded-lg h-10"
              : "px-2 py-2 bg-[#8ea3a1] hover:bg-[#373d7d] text-black rounded-lg h-10"
          }`}
        >
          Title
        </button>
      </div>
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className=" mx-10 ">
          <div className=" grid grid-cols-3 gap-[40px] py-4 px-8">
            {smoothies.map((item) => (
              <div
                key={item.id}
                className="h-[320px] text-[ffebf2] p-[10px] box-border rounded-lg relative gap-x-[20px] w-auto  bg-[#102632]  "
              >
                <h2 className="text-[1.5rem] text-center w-full h-[50px] bg-[#92a9a7] text-[#201a0e] rounded-lg pt-2">
                  {item.title}
                </h2>
                <div className="pt-2 px-2 h-[200px] overflow-auto ">
                  <h3>
                    <span className="text-[#6d15df]">Ingredients: </span>
                    {item.ingredient}
                  </h3>
                  <h3>
                    <span className="text-[#6d15df]">Method: </span>
                    {item.method}
                  </h3>
                </div>

                <div className="flex justify-center items-center absolute top-[-10px] right-[-10px] bg-[#6d15df] rounded-[6px] w-[30px] h-0  text-center p-[20px]  ">
                  {item.rating}
                </div>
                {item.user_id === currentUser?.id && (
                  <div className="  px-2 my-2 flex justify-evenly  ">
                    <Link href={`/update/${item.id}`}>
                      <button className="rounded-xl w-24 h-10  bg-[#6d15df]">
                        Update
                      </button>
                    </Link>
                    <button
                      className="rounded-xl w-24 h-10 bg-red-800"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
