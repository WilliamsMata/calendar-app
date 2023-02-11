import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});
