import React from "react";
import Appbar from "../appbar/Appbar";
import Chats from "../chat/Chats";
import Main from "../Main";

function MainScreen() {
  return (
    <>
      <Appbar />
      <Main />
      <Chats />
    </>
  );
}

export default MainScreen;
