import Todo from "@/lib/models/todos.models";
import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.models";

export async function GET(req: any, { params }: { params: { id: string } }) {
  try {
    connectToDB();

    const todos = await Todo.find({ userId: params.id });

    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function POST(req: any, { params }: { params: { id: string } }) {
  try {
    connectToDB();

    const { caption } = await req.json();

    const newTodo = new Todo({
      userId: params.id,
      caption,
    });

    await newTodo.save();

    const userWithTodo = await User.findByIdAndUpdate(params.id, {
      $push: { todos: newTodo },
    });

    return new Response(JSON.stringify(userWithTodo), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
