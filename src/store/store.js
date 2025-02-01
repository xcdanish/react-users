import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../store/slice/userSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
