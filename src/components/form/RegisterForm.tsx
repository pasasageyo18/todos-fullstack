"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { NextResponse } from "next/server";
import { api } from "@/lib/fetch";

const FormRegisterSchema = z.object({
  username: z.string().min(2, { message: "Username is required." }),
  email: z.string().min(2, {
    message: "Email is required.",
  }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

function RegisterForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormRegisterSchema>>({
    resolver: zodResolver(FormRegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormRegisterSchema>) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const body = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const registerData = await api.post("/register", headers, body);
      if (registerData) {
        router.push("/login");
        return NextResponse.json(
          { message: "Register success!" },
          { status: 200 }
        );
      } else {
        return new Error("Error registering data");
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your Email" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your Username" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Your Password" type="password" {...field} />
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

export default RegisterForm;
