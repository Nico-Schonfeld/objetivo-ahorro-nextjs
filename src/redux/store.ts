"use client";

import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/OpenSlice";

export const store = configureStore({
  reducer: {
    open: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
