"use client";

import React,{ useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl px-6 py-2 rounded-xl transition-all duration-300 ${
        scrolled
          ? "bg-white/10 backdrop-blur-lg shadow-lg border border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">PrepWise</h1>

        {/* Profile Dropdown Menu */}
        <Menubar className="bg-transparent border-none shadow-none p-0">
          <MenubarMenu>
            <MenubarTrigger className="focus:outline-none">
              <Image
                src="/avatar.jpg" // Replace with dynamic Supabase URL later
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </MenubarTrigger>
            <MenubarContent
              align="end"
              className="bg-[#1A1A1F] text-white border border-gray-700 rounded-md"
            >
              <MenubarItem onClick={() => router.push("/profile")}>
                Profile
              </MenubarItem>
              <MenubarItem onClick={() => router.push("/settings")}>
                Settings
              </MenubarItem>
              <MenubarItem onClick={() => router.push("/privacy")}>
                Privacy Policy
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                onClick={() => {
                  // Add logout logic
                  console.log("Log out");
                }}
              >
                Log Out
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  );
};

export default Navbar;
