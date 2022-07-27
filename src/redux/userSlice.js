import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: { name: "", email: "" },

    loading: null,
    error: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    startUser: (state) => {
      state.loading = true;
    },

    successUser: (state, action) => {
      state.userData = action.payload;
      state.loading = null;
    },

    errorUser: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const { addUser, startUser, successUser, errorUser } = userSlice.actions;

export default userSlice.reducer;
