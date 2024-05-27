import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../Features/Lister/listSlice";

export const store = configureStore({
  reducer: listReducer,
});

