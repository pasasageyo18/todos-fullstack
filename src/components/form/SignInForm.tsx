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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

const FormLoginSchema = z.object({
  email: z.string().min(2, {
    message: "Email is required.",
  }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormLoginSchema>>({
    resolver: zodResolver(FormLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormLoginSchema>) {
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (signInData?.status === 404) {
      return NextResponse.json({ error: "Failed to login" }, { status: 404 });
    } else if (signInData?.status === 200) {
      router.push("/home");
      return NextResponse.json({ message: "Login success!" }, { status: 200 });
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

export default SignInForm;
