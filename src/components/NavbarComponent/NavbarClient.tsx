"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleButton } from "@/redux/features/modal/OpenSlice";

const NavbarClient = () => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(toggleButton());
  };

  return (
    <header className="sticky top-0 left-0 bg-background flex w-full h-16 items-center justify-end gap-4 border-b px-4 md:px-6 z-10">
      <Button size={"sm"} variant={"outline"} onClick={handleButtonClick}>
        <Plus />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default NavbarClient;
