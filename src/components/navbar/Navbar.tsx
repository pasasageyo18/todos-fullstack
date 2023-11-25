"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";

function Navbar() {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <div className="flex w-full justify-between shadow-md px-8 py-2">
          <div>
            <Link href={session ? "/home" : "/"}>
              <Image
                src="/assets/logo/logo.png"
                alt="logo"
                height={28}
                width={80}
              />
            </Link>
          </div>
          <div className="flex gap-4">
            <Link
              href="/register"
              className="py-2 px-4 bg-blue-600 rounded-md text-white"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="py-2 px-4 bg-blue-600 rounded-md text-white"
            >
              Login
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-between shadow-md px-8 py-2">
          <div>
            <Link href={session ? "/home" : "/"}>
              <Image
                src="/assets/logo/logo.png"
                alt="logo"
                height={28}
                width={80}
              />
            </Link>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => signOut({ callbackUrl: "/login" })}>
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
