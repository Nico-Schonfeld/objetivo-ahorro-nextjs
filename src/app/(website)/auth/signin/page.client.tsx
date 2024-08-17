"use client";

import React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "next-view-transitions";

const SigninClient = () => {
  return (
    <section className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/assets/photos/placeholderImage.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="w-full h-screen flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <Link href="/">
            <Button
              variant="outline"
              className="w-full flex items-center gap-4"
            >
              <FcGoogle /> Login with Google
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SigninClient;
