import User from "@/lib/models/user.models";
import { connectToDB } from "@/lib/mongoose";

export async function GET() {
  try {
    await connectToDB();

    const users = await User.find({});

    return new Response(JSON.stringify(users), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
