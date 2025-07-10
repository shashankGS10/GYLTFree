// components/ProfileMenu.tsx
"use client";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProfileMenu = () => {
  const router = useRouter();

  return (
    <div className="relative">
      <Menubar className="border-none bg-transparent p-0">
        <MenubarMenu>
          <MenubarTrigger className="focus:outline-none">
            <Image
              src="/avatar.jpg" // replace with dynamic profile image from Supabase or session later
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
          </MenubarTrigger>
          <MenubarContent align="end" className="bg-[#1A1A1F] text-white border border-gray-700 rounded-md">
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
            <MenubarItem onClick={() => {/* Call your signOut() */}}>
              Log Out
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default ProfileMenu;
