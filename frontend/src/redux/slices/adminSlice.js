import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const response = await axios.get(`http://localhost:3030/login`);
  // console.log("API RESPONSE", response.data);
  return response.data;
});

export const getLoginUser = createAsyncThunk("getLogin", async (_id) => {
  const response = await axios.get(`http://localhost:3030/login/${_id}`);
  return response.data;
});

export const getUserById = createAsyncThunk("getUserById", async (id) => {
  const response = await axios.get(`http://localhost:3030/login${id}`);
  return response.data;
});

export const addUser = createAsyncThunk("addUser", async (newItem) => {
  try {
    const response = await axios.post(`http://localhost:3030/login`, newItem);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add");
  }
});

export const deleteUsers = createAsyncThunk("deleteUsers", async (id) => {
  try {
    await axios.delete(`http://localhost:3030/login${id}`);
    const response = await axios.get(`http://localhost:3030/login`);
    console.log("Updated Data After Delete:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete");
  }
});

export const postUser = createAsyncThunk("postUser", async (item) => {
  const response = await axios.post(`http://localhost:3030/login`, item);
  return response.data;
});

const userSlice = createSlice({
  name: "login",
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
        console.log("Data Set", action.payload);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Error", action.error.message);
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

export const {} = userSlice.actions;

export default userSlice.reducer;
