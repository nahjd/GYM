import { configureStore } from "@reduxjs/toolkit";
import gymReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    gym: gymReducer,
  },
});
