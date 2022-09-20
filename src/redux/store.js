import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./LoginSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    userlog: LoginSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

/*const store = configureStore({
  reducer: {
    user: userSlice,
    userlog: LoginSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(listenerMiddleware.middleware),
}); */
