"use client";
import CreateTodoForm from "@/components/form/CreateTodoForm";
import { useSession } from "next-auth/react";
import React from "react";

function Page() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-1/3 p-8 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <h1 className="text-4xl font-bold mb-4">Create Todo</h1>
        <CreateTodoForm userId={session?.user.id} />
      </div>
    </div>
  );
}

export default Page;
