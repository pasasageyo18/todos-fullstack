import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.models";
import { hashSync } from "bcrypt-ts";

export async function POST(req: any) {
  try {
    connectToDB();

    const { username, email, password } = await req.json();

    const isExisting = await User.findOne({ email });

    if (isExisting) {
      throw new Error("User already exists");
    }
    const hashPassword = hashSync(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
