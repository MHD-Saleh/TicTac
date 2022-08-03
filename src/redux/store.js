import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./LoginSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    log: LoginSlice,
  },
});

export default store;
