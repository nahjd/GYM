import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const response = await axios.get(`https://short-1.onrender.com/stella`);
  return response.data;
});

export const getLoginUser = createAsyncThunk("getLoginUser", async (id) => {
  const response = await axios.get(`https://short-1.onrender.com/stella/${id}`);
  return response.data;
});

export const getUserById = createAsyncThunk("getUserById", async (id) => {
  const response = await axios.get(`https://short-1.onrender.com/stella/${id}`);
  return response.data;
});

export const addUser = createAsyncThunk("addUser", async (newItem) => {
  try {
    const response = await axios.post(
      `https://short-1.onrender.com/stella`,
      newItem
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add");
  }
});

export const deleteUsers = createAsyncThunk("deleteUsers", async (id) => {
  try {
    await axios.delete(`https://short-1.onrender.com/stella/${id}`);
    const response = await axios.get(`https://short-1.onrender.com/stella`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete");
  }
});

export const postUser = createAsyncThunk("postUser", async (item) => {
  const response = await axios.post(
    `https://short-1.onrender.com/stella`,
    item
  );
  return response.data;
});

const userSlice = createSlice({
  name: "stella",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    login: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(deleteUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(postUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(postUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder.addCase(getLoginUser.fulfilled, (state, action) => {
      state.login = action.payload;
    });
  },
});

export default userSlice.reducer;
