import type { Metadata } from "next";
import moment from "moment";
import { BoxIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const year = moment().format("YYYY");

export const metadata: Metadata = {
  title: `Ahorro Objetivo ${year}`,
  description: "...",
};

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="bg-background border-t py-3 fixed bottom-0 left-0 w-full z-[1]">
        <nav className="relative container max-w-[30rem] py-0 px-5 flex items-center justify-center gap-20">
          <Button size={"icon"} variant={"outline"} className="rounded-full">
            <BoxIcon width={24} height={24} />{" "}
          </Button>

          <Drawer>
            <DrawerTrigger className="bg-teal-500 rounded-full text-white p-2">
              <Plus width={24} height={24} />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Button size={"icon"} variant={"outline"} className="rounded-full">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/Nico-Schonfeld.png" />
              <AvatarFallback>Nico</AvatarFallback>
            </Avatar>
          </Button>
        </nav>
      </header>
      {children}
      <footer className=" h-40 bg-black">Lorem, ipsum.</footer>
    </>
  );
}
