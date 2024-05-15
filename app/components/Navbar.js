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
  GithubIcon,
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
    };
    newsession();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    setCurrentUser(null);
    router.push("/");
  };

  return (
    <>
      <nav className="flex justify-between items-center h-[50px] bg-slate-300 text-black px-4">
        <Link href="/">
          <div className="text-2xl flex items-center hover:cursor-pointer  shadow-lg filter drop-shadow-black ">
            <img
              alt="logo"
              src="https://media.tenor.com/5OtR9QMc2wEAAAAi/dancing-its-time-to-party.gif"
              className="h-10"
            />
            <span>Smoothie</span>
          </div>
        </Link>
        <div className="text-base flex items-center gap-4 ">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="transition-shadow hover:shadow-2xl ">
                <img
                  src={currentUser?.user_metadata.avatar_url}
                  className="h-10 w-10 rounded-[50%] bg-white"
                  alt="avatar"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-300 text-black ">
                <DropdownMenuLabel>
                  {currentUser?.user_metadata.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <User className="mr-2 h-4 w-4 hover:cursor-pointer" />
                    <span className="hover:cursor-pointer">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/create")}>
                    <Plus className="mr-2 h-4 w-4 hover:cursor-pointer" />
                    <span className="hover:cursor-pointer">Add New</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <a
                    href="https://github.com/PRAGNESH1006"
                    className="flex item-center"
                    target="_blank"
                  >
                    <Github className="mr-2 h-4 w-4 hover:cursor-pointer" />
                    <span className="hover:cursor-pointer">Github</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4 hover:cursor-pointer" />
                  <span className="hover:cursor-pointer">Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4 hover:cursor-pointer" />
                  <span className="hover:cursor-pointer">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button>
              <Link href="/signin">Login</Link>
            </Button>
          )}
          {currentUser && (
            <Button onClick={() => router.push("/create")}>
              <Plus className="mr-2 h-4 w-4 hover:cursor-pointer" />
              <span>Add</span>
            </Button>
          )}
          <Button>
            <Link href={"/components/about"}>About</Link>
          </Button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
