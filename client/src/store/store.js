// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import greetReducer from "./slice/greetSlice";

const store = configureStore({
  reducer: {
    greet: greetReducer,
  },
});

export default store;
