"use client";
import React from "react";
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

const FormTodoSchema = z.object({
  caption: z.string(),
});

function CreateTodoForm({ userId }: { userId: string | undefined }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormTodoSchema>>({
    resolver: zodResolver(FormTodoSchema),
    defaultValues: {
      caption: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormTodoSchema>) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const body = {
        caption: data.caption,
      };

      const todoData = await api.post(`/user/${userId}/todos`, headers, body);
      if (todoData) {
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

export default CreateTodoForm;
