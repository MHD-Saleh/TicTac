import { Input, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ChatBox, { ChatFrame } from "react-chat-plugin";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "http://127.0.0.1:3001/";

function Chat() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("123");
  const [userName, setUserName] = useState("a");

  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([
    {
      author: {
        username: `${userName}`,
        id: 1,
        avatarUrl:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      },
      text: `first`,
      type: "text",
    },
    {
      author: {
        username: `${userName}`,
        id: 2,
        avatarUrl:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      },
      text: `second`,
      type: "text",
    },
  ]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
    socket.emit("join_room", room);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      /* setMessageList([
        ...messageList,
        {
          author: {
            username: `${data.author}`,
            id: 1,
            avatarUrl:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          },
          text: `${data.message}`,
          type: "text",
        },
      ]);*/
      console.log(
        "auther is : " + data.author + " and current is : " + userName
      );

      setMessageList((current) => [
        ...current,
        {
          author: {
            username: `${userName}`,
            id: 2,
            avatarUrl:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          },
          text: `${data.message}`,
          type: "text",
        },
      ]);

      console.log("incoming : " + JSON.stringify(data));
    });
  }, [messageList]);

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const [open, setopen] = useState(false);

  const handleClickIcon = () => {
    // toggle showChatbox and showIcon
    setopen(!open);
  };

  const handleOnSendMessage = async (message) => {
    /*setAttr({
      ...attr,
      messages: attr.messages.concat({
        author: {
          username: "user1",
          id: 1,
          avatarUrl: "https://image.flaticon.com/icons/svg/2446/2446032.svg",
        },
        text: message,
        type: "text",
        timestamp: +new Date(),
      }),
    });*/

    let messageContent = {
      room: room,
      content: {
        author: userName,

        message: message,
      },
    };

    await socket.emit("send_message", messageContent);
    // console.log("new list : " + JSON.stringify(messageList));
  };

  return (
    <>
      <Input
        sx={{
          color: "brown",
          backgroundColor: "white",
          padding: "5px",
          margin: "5px",
        }}
        name="test"
        fullWidth
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
          console.log("new user : " + e.target.value);
        }}
      />
      <ChatFrame
        chatbox={
          <ChatBox
            onSendMessage={handleOnSendMessage}
            userId={1}
            messages={messageList}
            width={"300px"}
            activeAuthor={{ username: `${userName}`, id: 1, avatarUrl: null }}
          />
        }
        clickIcon={handleClickIcon}
        showChatbox={open}
        showIcon={!open}
        iconStyle={{ background: "red", fill: "white" }}
      >
        <div className="Greeting" style={{ width: "50" }}>
          <Typography color="white">👋 Hey, Here you can chat</Typography>
        </div>
      </ChatFrame>
    </>
  );
}

export default Chat;
