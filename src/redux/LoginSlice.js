import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import io from "socket.io-client";

export const addUserr = createAsyncThunk("user/add", async (user) => {
  const res = await axios.post("localhost:3001/", user);
  return res.data;
});

let socket;
export const userSlice = createSlice({
  name: "user",
  initialState: {
    myaccount: {
      name: "",
      room: "",
    },

    loading: null,
    error: false,
    Turn: "X",
    player: "X",
    Type: "",
    connection: null,
    board: ["", "", "", "", "", "", "", "", ""],
    msg: [
      {
        text: "please note that all your messages is end to end encrypted",
        type: "notification",
      },
    ],
  },
  reducers: {
    setRest: (state) => {
      state.board = ["", "", "", "", "", "", "", "", ""];
    },
    setTurn: (state, action) => {
      state.Turn = action.payload;
    },
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    setboard: (state, action) => {
      state.board = action.payload;
    },
    setboardd: (state, action) => {
      state.board[action.payload.id] = action.payload.val;
    },
    setType: (state, action) => {
      state.Type = action.payload;
    },
    setconnection: (state) => {
      //127.0.0.1:3001/
      // socket = io("https://nodejs-chat-react.herokuapp.com/");
            // socket = io("localhost:5000/");
      socket = io("wss://slow-big-comic.glitch.me");
      state.connection = socket;
      console.log("set connection from redux ");
      /*socket.on("receive_message", (data) => {
        console.log("from redux " + JSON.stringify(data));
        //state.msg.message(...state.message, data);
      });*/
    },

    sendMSG: (state, action) => {
      state.connection.emit("send_message", action.payload);
    },
    setinitial: (state) => {
      state.msg.push({
        buttons: [
          {
            type: "URL",
            title: "My GitHub page",
            payload: "https://github.com/MHD-Saleh",
          },
          {
            type: "URL",
            title: "Example",
            payload: "http://www.example.com",
          },
        ],
        author: {
          username: "system",
          id: 2,
          avatarUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwudMZ5aSzsJOTbpqJAneFhPVoubxsLkh7qA&usqp=CAU",
        },
        text: `your room id is : ${state.myaccount.room}`,
        type: "text",
      });
    },
    setNameRoom: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    loguser: (state, action) => {
      state.myaccount = action.payload;
    },
    addmsg: (state, action) => {
      state.msg.push(action.payload);
    },
    setmyroom: (state, action) => {
      state.connection.emit("join_room", state.myaccount.room);
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
  setRest,
  setboardd,
  setTurn,
  setPlayer,
  setboard,
  addUser,
  startUser,
  successUser,
  errorUser,
  setNameRoom,
  loguser,
  setType,
  setconnection,
  sendMSG,
  setmyroom,
  addmsg,
  setinitial,
} = userSlice.actions;

export default userSlice.reducer;
