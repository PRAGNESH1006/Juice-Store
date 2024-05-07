"use client";
import React from "react";
import { useEffect, useState } from "react";
import supabase from "@/app/supabase/supabaseClient";
import Link from "next/link";
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
import { Update } from "../components/Update";
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

export default function Dashboard() {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) {
          throw userError;
        }
        setCurrentUser(user);

        const { data: smoothieData, error: smoothieError } = await supabase
          .from("smoothies")
          .select()
          .order(orderBy, { ascending: false });

        if (smoothieError) {
          throw smoothieError;
        }

        const userSmoothies = smoothieData.filter(
          (item) => item.user_id === user?.id
        );

        setSmoothies(userSmoothies || []);
        setFetchError(null);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setFetchError("Could not fetch smoothies data");
        setSmoothies(null);
      }
    };

    fetchData();
  }, [orderBy]);

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
    <div className="flex items-center justify-center flex-col my-2  gap-4 py-2 ">
      <div className="profile">
        <p className="profile-heading">Profile</p>
        <div className="profile-details">
          <div className="profile-picture">
            <img
              src={currentUser?.user_metadata.avatar_url}
              alt=""
              className="rounded-[50%]"
            />
          </div>
          <div className="profile-info">
            <p>Name: {currentUser?.user_metadata.name}</p>
            <p>User Id: {currentUser?.email}</p>
          </div>
        </div>
      </div>
      <hr className="separator" />
      <DropdownMenu className="">
        <DropdownMenuTrigger>Short</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
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
        <div className=" mx-10 ">
          <div className=" grid grid-cols-3 gap-8 py-4 px-8">
            {smoothies.map((item) => (
              // info about smoothies
              <Card
                key={item.id}
                className=" h-[320px] box-border rounded-lg relative"
              >
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className=" h-[200px] overflow-auto ">
                    <h3>
                      <span className="text-[#6d15df]">Ingredients: </span>
                      {item.ingredient}
                    </h3>
                    <h3>
                      <span className="text-[#6d15df]">Method: </span>
                      {item.method}
                    </h3>
                  </div>

                  <div className="flex text-white justify-center items-center absolute top-[-10px] right-[-10px] bg-[#6d15df] rounded-[6px] w-[30px] h-0  text-center p-[20px]  ">
                    {item.rating}
                  </div>
                </CardContent>
                <CardFooter className=" flex justify-center items-center gap-4">
                  {currentUser.id === item.user_id && (
                    <>
                      {" "}
                      {/* updates */}
                      <Update item={item} />
                      {/* delete */}
                      <Button variant="destructive">
                        <AlertDialog className="">
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
                      </Button>{" "}
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
