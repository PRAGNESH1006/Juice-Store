"use client";
import supabase from "@/app/supabase/supabaseClient";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    console.log("signOut");
    setCurrentUser(null);
    router.push("/");
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
      <nav className=" flex justify-around items-center h-[50px] bg-slate-300 text-black">
        <Link href="/">
          <div className="text-2xl flex justify-evenly items-center mx-0 hover:cursor-pointer ">
            <span>
              <img
                alt="new"
                src="https://media.tenor.com/5OtR9QMc2wEAAAAi/dancing-its-time-to-party.gif"
                className="h-10"
              />
            </span>
            Smoothie
          </div>
        </Link>

        <div className="text-base">
          <ul className="flex justify-between items-center gap-3">
            {currentUser ? (
              <>
                <DropdownMenu asChild>
                  <DropdownMenuTrigger>
                    <span>{currentUser.name}</span>
                    <img
                      src={currentUser.user_metadata.avatar_url}
                      className="h-10 w-10 rounded-[50%] bg-white"
                      alt="err"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 ">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/dashboard");
                        }}
                      >
                        <User className="mr-2 h-4 w-4 hover:cursor-pointer " />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/create");
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4 hover:cursor-pointer " />
                        <span>Add New</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Github className="mr-2 h-4 w-4 hover:cursor-pointer " />
                      <span>GitHub</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LifeBuoy className="mr-2 h-4 w-4 hover:cursor-pointer " />
                      <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut
                        className="mr-2 h-4 w-4 hover:cursor-pointer "
                        onClick={handleSignOut}
                      />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild>
                <Link href="/signin">Login</Link>
              </Button>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
