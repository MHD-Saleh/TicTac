import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const addUserr = createAsyncThunk("user/add", async (user) => {
  const res = await axios.post("http://localhost:5000/api/users", user);
  return res.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: { name: "", email: "" },

    loading: null,
    error: false,
  },
  reducers: {
    // addUser: (state, action) => {
    //   state.name = action.payload.name;
    //   state.email = action.payload.email;
    // },
    startUser: (state) => {
      state.loading = true;
    },

    successUser: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },

    errorUser: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
  extraReducers: {
    [addUserr.pending]: (state) => {
      state.loading = true;
    },
    [addUserr.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    [addUserr.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  addUser,

  startUser,
  successUser,
  errorUser,
} = userSlice.actions;

export default userSlice.reducer;
