import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "../reducers/UserReducers";

export const ConfigureStore = configureStore({
  reducer: {
    user: UserReducers,
  }
});