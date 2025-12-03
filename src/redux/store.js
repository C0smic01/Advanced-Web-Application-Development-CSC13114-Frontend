import { configureStore } from "@reduxjs/toolkit";
import threadReducer from "./threadSlice";
const store = configureStore({
  reducer: {
    threads: threadReducer,
  },
});
export default store;
