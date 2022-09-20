import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addmsg, setTurn, setRest, setboardd } from "../../redux/LoginSlice";
import Appbar from "../appbar/Appbar";
import { useNavigate } from "react-router-dom";
import Chat from "../chat/Chat";
import Main from "../Main";

function MainScreen() {
  const navigate = useNavigate();
  const { connection, myaccount, board } = useSelector(
    (state) => state.userlog
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (connection == null) {
      navigate("/login");
    } else {
      connection.on("receive_message", (data) => {
        //console.log("data from main screen is :" + JSON.stringify(data));
        if (data.type == "rest_game") {
          alert("player reset the game");
          dispatch(setRest());
        }
        if (data.type == "game-move") {
          var tt = data.data.tt === "X" ? "O" : "X";
          console.log("trun ===>  " + data.data.tt);
          console.log("square : " + data.data.square + " simple : " + tt);

          dispatch(setTurn(data.data.tt));

          dispatch(setboardd({ id: data.data.square, val: tt }));

          /*dispatch(
            setboard(
              board.map((val, idx) => {
                if (idx === data.data.square && val === "") {
                  return tt;
                }
                return val;
              })
            )
          );*/
        }

        dispatch(addmsg(data));
      });
    }
  }, [connection]);
  return (
    <>
      <Appbar />
      <Main />
      <Chat />
    </>
  );
}

export default MainScreen;

/*function MainScreen() {
  const [data, setdata] = useState();

  const handleClick = (num) => {
    // 👇️ take parameter passed from Child component
    setdata(num);
  };

  const [sn, setsn] = useState();

  const handlesend = (num) => {
    // 👇️ take parameter passed from Child component
    //setsn(num);
    console.log("i caleed insid child");
  };

  return (
    <>
      <Appbar />
      <Main dataa={data} Send_data={handlesend} />
      <Chats handleClick={handleClick} />
    </>
  );
} */
