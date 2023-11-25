"use client";
import { api } from "@/lib/fetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

function Todos({ userId, todos }: { userId: string; todos: any }) {
  const router = useRouter();

  const onDeleteHandler = async (postId: string) => {
    try {
      const confirmed = confirm("Are you sure?");

      if (confirmed) {
        const deletePostData = await api.del(`/user/${userId}/todos/${postId}`);
        if (deletePostData) {
          setTimeout(() => {
            router.refresh();
          }, 5000);
          return NextResponse.json(
            { message: "Delete todo success!" },
            { status: 200 }
          );
        }
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Delete todo failed!" },
        { status: 400 }
      );
    }
  };
  return (
    <>
      {todos.length === 0 && <h1>No todo list today</h1>}
      {todos &&
        todos.length > 0 &&
        todos.map((todo: any, index: number) => (
          <div
            key={index}
            className="mt-4 p-4 border border-gray-500 rounded-md flex justify-between items-center"
          >
            <p className="text-xl font-semibold">{todo.caption}</p>
            <div className="flex gap-2">
              <Link
                href={`/update/${todo._id}`}
                className="py-2 px-4 flex items-center"
              >
                <Image
                  src="/assets/icons/edit.svg"
                  alt="delete icon"
                  height={20}
                  width={20}
                />
              </Link>
              <Button
                onClick={() => onDeleteHandler(todo._id)}
                className="bg-transparent hover:bg-transparent"
              >
                <Image
                  src="/assets/icons/delete.svg"
                  alt="delete icon"
                  height={20}
                  width={20}
                />
              </Button>
            </div>
          </div>
        ))}
      <Link
        href="/create"
        className="py-2 px-4 w-fit bg-blue-600 rounded-md text-white"
      >
        Create Todo
      </Link>
    </>
  );
}

export default Todos;
