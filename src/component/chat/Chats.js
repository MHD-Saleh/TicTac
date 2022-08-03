import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatBox, { ChatFrame } from "react-chat-plugin";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
let socket;

//localhost:3001/
//127.0.0.1:3001/

const CONNECTION_PORT = "192.168.1.103:3001/";

function Chats() {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");

  // After Login

  const { myaccount } = useSelector((state) => state.log);
  const [messageList, setMessageList] = useState([
    {
      text: `Room Id : ${myaccount.room}`,
      timestamp: 1578366389250,
      type: "notification",
    },
  ]);

  useEffect(() => {
    console.log("name: " + myaccount.name + " room: " + myaccount.room);
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      let messageContent = {
        room: data.room,
        author: {
          username: data.author.username,
          id: 2,
          avatarUrl:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        },
        text: data.text,
        type: "text",
        timestamp: +new Date(),
      };
      setMessageList([...messageList, messageContent]);
    });
  });
  const [open, setopen] = useState(false);
  const handleClickIcon = () => {
    // toggle showChatbox and showIcon
    connectToRoom();
    setopen(!open);
  };
  const connectToRoom = async () => {
    setLoggedIn(true);
    await socket.emit("join_room", myaccount.room);
  };

  const sendMessage = async (mm) => {
    let messageContent = {
      room: myaccount.room,

      author: {
        username: myaccount.name,
        id: 1,
        avatarUrl:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      },
      text: mm,
      type: "text",
      timestamp: +new Date(),
    };
    /*{
        author: {
          username: "data.author",
          id: 1,
          avatarUrl:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        },
        text: "data.message",
        type: "text",
      },*/

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent]);
  };

  return (
    <div className="App">
      <ChatFrame
        chatbox={
          <ChatBox
            onSendMessage={sendMessage}
            userId={1}
            placeholder="enter message"
            messages={messageList}
            width={"300px"}
            activeAuthor={{
              username: `${myaccount.name}`,
              id: 1,
              avatarUrl: null,
            }}
          />
        }
        clickIcon={handleClickIcon}
        showChatbox={open}
        showIcon={!open}
        iconStyle={{ background: "red", fill: "white" }}
      >
        <div className="Greeting" style={{ width: "50" }}>
          <Typography color="white">Hey, Here you can chat</Typography>
        </div>
      </ChatFrame>
    </div>
  );
}

export default Chats;
