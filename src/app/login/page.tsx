"use client";

import SignInForm from "@/components/form/SignInForm";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

function Page() {
  const { data: session } = useSession();
  if (session) {
    redirect("/home");
  }
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-1/3 p-8 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <SignInForm />
        <div className="flex gap-2 mt-4">
          <p>Not have an account? </p>
          <Link href="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
