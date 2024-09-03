"use client";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import HomeIcon from "@mui/icons-material/Home";
import "@/app/globals.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Drower } from "./Drower";

import supabase from "@/app/supabase/supabaseClient";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Cloud,
  CreditCard,
  Github,
  GithubIcon,
  InfoIcon,
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
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [value, setValue] = React.useState(0);

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

  const handleNavigation = (path) => {
    router.push(path);
    setOpen(false); // Close sidebar after navigation
  };

  return (
    <header className="sticky top-0 z-50  bg-white">
      <div className="bg-transparent">
        {/* Mobile menu */}

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Links */}
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <Button onClick={() => handleNavigation("/")}>Home</Button>
                </div>
                <div className="flow-root">
                  <Button
                    onClick={() => handleNavigation("/components/collection")}
                  >
                    Collection
                  </Button>
                </div>
                <div className="flow-root">
                  <Button onClick={() => handleNavigation("/components/about")}>
                    About Us
                  </Button>
                </div>
                <div className="flow-root">
                  <Button onClick={() => handleNavigation("/components/blog")}>
                    Blog
                  </Button>
                </div>
                <div className="flow-root">
                  <Button onClick={() => handleNavigation("/components/cart")}>
                    Cart
                  </Button>
                </div>
                <div className="flow-root">
                  <Button
                    onClick={() => handleNavigation("/components/sell-juice")}
                  >
                    Sell Juice
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="h-[50px] w-[100px]  flex justify-center ml-4 items-center">
                <a href="/">
                  <span className="sr-only">Pulp Juice</span>
                  <img
                    alt=""
                    src="/resources/cover.png"
                    className=" rounded-lg  "
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch border-none">
                <div className="flex h-full space-x-8 border-none justify-center items-center">
                  <Popover>
                    <Box
                      sx={{
                        width: 500,
                      }}
                      className="bottom"
                    >
                      <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      >
                        <BottomNavigationAction
                          label="Home"
                          icon={<HomeIcon />}
                          onClick={() => router.push("/")}
                        />
                        <BottomNavigationAction
                          label="Collection"
                          icon={<CollectionsBookmarkIcon />}
                          onClick={() => router.push("/components/collection")}
                        />
                        <BottomNavigationAction
                          label="About Us"
                          icon={<InfoIcon />}
                          onClick={() => router.push("/components/about")}
                        />
                      </BottomNavigation>
                    </Box>
                  </Popover>
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center mx-2">
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {currentUser ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="transition-shadow hover:shadow-2xl ">
                        <img
                          src={
                            currentUser?.user_metadata.avatar_url ||
                            "/resources/juice1.jpg"
                          }
                          className="h-10 w-10 rounded-[15%]  bg-white"
                          alt="avatar"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-300 text-black ">
                        <DropdownMenuLabel>
                          {currentUser?.user_metadata.name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => router.push("/components/profile")}
                          >
                            <User className="mr-2 h-4 w-4 hover:cursor-pointer" />
                            <span className="hover:cursor-pointer">
                              Profile
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push("/components/create")}
                          >
                            <Plus className="mr-2 h-4 w-4 hover:cursor-pointer" />
                            <span className="hover:cursor-pointer">
                              Add New
                            </span>
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
                    <Drower />
                  )}
                </div>
                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </a>
                </div> */}

                {/* Cart */}
                {/* <div className="ml-4 flow-root lg:ml-6">
                    <a href="#" className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        aria-hidden="true"
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        0
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
