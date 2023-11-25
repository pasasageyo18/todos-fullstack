import Todo from "@/lib/models/todos.models";
import User from "@/lib/models/user.models";
import { connectToDB } from "@/lib/mongoose";

export async function GET(
  req: any,
  { params }: { params: { postId: string } }
) {
  try {
    connectToDB();

    const specificTodo = await Todo.findById(params.postId);
    return new Response(JSON.stringify(specificTodo), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function DELETE(
  req: any,
  { params }: { params: { id: string; postId: string } }
) {
  try {
    connectToDB();

    const deletedTodo = await Todo.findByIdAndDelete(params.postId);

    const UserWithDeletedTodo = await User.findByIdAndUpdate(params.id, {
      $pull: { todos: params.postId },
    });

    return new Response(JSON.stringify(UserWithDeletedTodo), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function PUT(
  req: any,
  { params }: { params: { id: string; postId: string } }
) {
  try {
    connectToDB();
    const { newCaption } = await req.json();

    const updatedTodo = await Todo.findByIdAndUpdate(params.postId, {
      $set: { caption: newCaption },
    });

    return new Response(JSON.stringify(updatedTodo), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
