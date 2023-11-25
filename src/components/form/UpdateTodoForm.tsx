"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { NextResponse } from "next/server";
import { api } from "@/lib/fetch";
import { Textarea } from "../ui/textarea";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchTodoDetails } from "@/redux/todoSlice";

const FormTodoSchema = z.object({
  caption: z.string(),
});

function UpdateTodoForm({
  id,
  todoId,
}: {
  id: string | undefined;
  todoId: string | undefined;
}) {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const params = { id, todoId };

  useEffect(() => {
    dispatch(fetchTodoDetails(params));
  }, [params]);

  const todoDetail = useAppSelector((state) => state.todo.todoDetails);

  const form = useForm<z.infer<typeof FormTodoSchema>>({
    resolver: zodResolver(FormTodoSchema),
    defaultValues: {
      caption: todoDetail ? todoDetail.caption : "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormTodoSchema>) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const body = {
        newCaption: data.caption,
      };

      const updatedTodoData = await api.put(
        `/user/${id}/todos/${todoId}`,
        headers,
        body
      );
      if (updatedTodoData) {
        router.push("/home");
        return NextResponse.json(
          { message: "Register todo success!" },
          { status: 200 }
        );
      } else {
        return new Error("Error registering todo");
      }
    } catch (error: any) {
      return NextResponse.json({ error: error }, { status: 404 });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Todo</FormLabel>
              <FormControl>
                <Textarea placeholder="Your Todo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default UpdateTodoForm;
