import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    todos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Todo",
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose?.models?.User || mongoose.model("User", userSchema);

export default User;
