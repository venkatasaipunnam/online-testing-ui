import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "../reducers/UserReducers";
import ExamReducers from "../reducers/ExamReducers";

export const ConfigureStore = configureStore({
  reducer: {
    user: UserReducers,
    exam: ExamReducers,
  }
});