import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const addUserr = createAsyncThunk("user/add", async (user) => {
  const res = await axios.post("localhost:3001/", user);
  return res.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    myaccount: {
      name: "",
      room: "",
    },
    userData: { name: "", room: "" },

    loading: null,
    error: false,
    Type: "",
    turn: false,
  },
  reducers: {
    setType: (state, action) => {
      state.Type = action.payload;
    },
    setNameRoom: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    testset: (state, action) => {
      state.myaccount = action.payload;
    },

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
  setNameRoom,
  testset,
  setType,
} = userSlice.actions;

export default userSlice.reducer;
