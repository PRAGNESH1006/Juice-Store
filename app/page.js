"use client";
import { useEffect, useState } from "react";
import supabase from "./supabase/supabaseClient";
import Link from "next/link";
import Head from "next/head";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Update } from "@/app/components/Update";

export default function Home() {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch smoothies data");
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
    };
    newsession();
  }, [orderBy]);

  const handleDelete = async (id) => {
    try {
      const { data, error } = await supabase
        .from("smoothies")
        .delete()
        .eq("id", id)
        .select();

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
    <main className="flex flex-col items-center justify-center my-2 gap-4 py-2 mx-auto max-w-screen-lg">
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-[#16a34a] text-white px-4 py-2 rounded-md">
          Sort
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-green-300">
          <DropdownMenuItem onClick={() => setOrderBy("created_at")}>
            <span className="self-center">
              {orderBy === "created_at" ? "•" : " "}
            </span>
            Time
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOrderBy("rating")}>
            <span className="self-center">
              {orderBy === "rating" ? "•" : " "}
            </span>
            Rating
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOrderBy("title")}>
            <span className="self-center">
              {orderBy === "title" ? "•" : " "}
            </span>
            Title
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-4 px-8">
          {smoothies.map((item) => (
            <Card
              key={item.id}
              className="h-[320px] box-border rounded-lg relative"
            >
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] overflow-auto flex flex-col gap-2">
                  <h3>
                    <span className="text-[#6d15df]">Ingredients: </span>
                    {item.ingredient}
                  </h3>
                  <h3>
                    <span className="text-[#6d15df]">Method: </span>
                    {item.method}
                  </h3>
                </div>

                <div className="flex text-white justify-center items-center absolute top-[-10px] right-[-10px] bg-[#6d15df] rounded-[6px] w-[30px] h-0 text-center p-[20px]">
                  {item.rating}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center items-center gap-4">
                {currentUser?.id === item.user_id && (
                  <>
                    <Update item={item} />
                    <div className="bg-[#16a34a] text-white px-4 py-2 rounded-md">
                      <AlertDialog>
                        <AlertDialogTrigger>Delete</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                handleDelete(item.id);
                              }}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
