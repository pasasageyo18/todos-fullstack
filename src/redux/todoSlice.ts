import { api } from "@/lib/fetch";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todo: [{}],
  todoDetails: { caption: "" },
};

export const fetchUserTodos = createAsyncThunk(
  "/fetch-user-todo",
  async (id: string) => {
    const data = await api.get(`user/${id}/todos`);

    return data;
  }
);

export const fetchTodoDetails = createAsyncThunk(
  "fetch-todo-details",
  async ({
    id,
    todoId,
  }: {
    id: string | undefined;
    todoId: string | undefined;
  }) => {
    const data = await api.get(`user/${id}/todos/${todoId}`);

    return data;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserTodos.fulfilled, (state, action) => {
      return {
        ...state,
        todo: action.payload,
      };
    }),
      builder.addCase(fetchTodoDetails.fulfilled, (state, action) => {
        return {
          ...state,
          todoDetails: action.payload,
        };
      });
  },
});

export default todoSlice.reducer;
