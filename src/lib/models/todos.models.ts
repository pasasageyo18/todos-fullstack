import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    caption: { type: String, required: true },
  },
  { timestamps: true }
);

const Todo = mongoose?.models?.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
