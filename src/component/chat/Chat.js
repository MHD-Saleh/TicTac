import { Input, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ChatBox, { ChatFrame } from "react-chat-plugin";
import { useDispatch, useSelector } from "react-redux";
import { sendMSG, addmsg, setinitial } from "../../redux/LoginSlice";

function Chat() {
  const dispatch = useDispatch();
  const { myaccount, msg } = useSelector((state) => state.userlog);

  const [open, setopen] = useState(false);

  const handleClickIcon = () => {
    // toggle showChatbox and showIcon
    setopen(!open);
  };

  const handleinitial = async () => {
    await dispatch(setinitial());
  };

  useEffect(() => {
    handleinitial();
  }, []);

  const handleOnSendMessage = (message) => {
    let newmessage = {
      room: myaccount.room,
      author: {
        username: `${myaccount.name}`,
        id: 2,
        avatarUrl:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      },
      timestamp: +new Date(),
      text: `${message}`,
      type: "text",
    };
    let mymessage = {
      room: myaccount.room,
      author: {
        username: `${myaccount.name}`,
        id: 1,
        avatarUrl:
          "https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1608/tuktukdesign160800043/61010830-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg?ver=6",
      },
      timestamp: +new Date(),
      text: `${message}`,
      type: "text",
    };

    //setMessageList([...messageList, newmessage]);
    dispatch(addmsg(mymessage));
    dispatch(sendMSG(newmessage));
    //await socket.emit("send_message", messageContent);
    // console.log("new list : " + JSON.stringify(messageList));
  };

  return (
    <>
      <ChatFrame
        chatbox={
          <ChatBox
            //showTypingIndicator={true}
            onSendMessage={handleOnSendMessage}
            userId={1}
            messages={msg}
            width={"300px"}
            activeAuthor={{
              username: `${myaccount.name}`,
              id: 1,
              avatarUrl: "",
            }}
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
