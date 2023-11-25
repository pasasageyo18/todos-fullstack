"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import Todos from "../todos/Todos";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchUserTodos } from "@/redux/todoSlice";

function GetSession() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }
  const userId = session?.user.id;

  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo.todo);

  useEffect(() => {
    dispatch(fetchUserTodos(userId));
  }, [userId]);

  return (
    <div className="flex mt-16 w-full justify-center">
      <div className="flex flex-col gap-4 w-1/3 rounded-md shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-8">
        <p className="font-bold text-2xl">Welcome, {session?.user.name}</p>
        <p className="font-medium text-lg">Your Todo List</p>
        <Todos todos={todos} userId={userId} />
      </div>
    </div>
  );
}

export default GetSession;
