import User from "@/lib/models/user.models";
import { connectToDB } from "@/lib/mongoose";

export async function GET(req: any, { params }: { params: { id: string } }) {
  try {
    connectToDB();

    console.log(params);

    const todos = await User.find({ _id: params.id });

    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
