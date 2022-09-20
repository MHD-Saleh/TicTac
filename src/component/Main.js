import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  sendMSG,
  setType,
  setboard,
  setPlayer,
  setTurn,
  setRest,
} from "../redux/LoginSlice";

const Main = () => {
  const { myaccount, Turn, player, board } = useSelector(
    (state) => state.userlog
  );
  const dispatch = useDispatch();

  const [isSelectedturn, setisSelectedturn] = useState(false);
  const [myType, setmyType] = useState("");

  //const [board, setboard] = useState(["", "", "", "", "", "", "", "", ""]);

  //const [turn, setTurn] = useState("X");
  //const [player, setPlayer] = useState("X");

  const chooseSquare = async (square) => {
    if (Turn === player && board[square] === "") {
      console.log("clicked : " + square);
      dispatch(setTurn(player === "X" ? "O" : "X"));

      var tt = player === "X" ? "O" : "X";

      dispatch(
        sendMSG({
          room: myaccount.room,
          name: myaccount.name,
          type: "game-move",
          data: { square, tt },
        })
      );
      //await socket.emit("send_game", player);
      dispatch(
        setboard(
          board.map((val, idx) => {
            if (idx === square && val === "") {
              return player;
            }
            return val;
          })
        )
      );
    } else {
      console.log("not my turn " + Turn);
    }
  };

  const Patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const chick_win = () => {
    if (
      (board[0] === "X" && board[1] === "X" && board[2] === "X") ||
      (board[3] === "X" && board[4] === "X" && board[5] === "X") ||
      (board[6] === "X" && board[7] === "X" && board[8] === "X") ||
      (board[0] === "X" && board[3] === "X" && board[6] === "X") ||
      (board[1] === "X" && board[4] === "X" && board[7] === "X") ||
      (board[2] === "X" && board[5] === "X" && board[8] === "X") ||
      (board[0] === "X" && board[4] === "X" && board[8] === "X") ||
      (board[2] === "X" && board[4] === "X" && board[6] === "X")
    ) {
      alert("player X win the game !");
      dispatch(setRest());
    }
    if (
      (board[0] === "O" && board[1] === "O" && board[2] === "O") ||
      (board[3] === "O" && board[4] === "O" && board[5] === "O") ||
      (board[6] === "O" && board[7] === "O" && board[8] === "O") ||
      (board[0] === "O" && board[3] === "O" && board[6] === "O") ||
      (board[1] === "O" && board[4] === "O" && board[7] === "O") ||
      (board[2] === "O" && board[5] === "O" && board[8] === "O") ||
      (board[0] === "O" && board[4] === "O" && board[8] === "O") ||
      (board[2] === "O" && board[4] === "O" && board[6] === "O")
    ) {
      alert("player O win the game !");
      dispatch(setRest());
    }
  };
  useEffect(() => {
    chick_win();
  }, [board]);

  const handelSelectO = () => {
    setisSelectedturn(true);
    dispatch(setType("O"));
    setmyType("o");
    dispatch(setPlayer("O"));
    //setPlayer("O");
  };
  const handelSelectX = () => {
    setisSelectedturn(true);
    dispatch(setType("X"));
    setmyType("X");
    dispatch(setPlayer("X"));
    //setPlayer("X");
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        {!isSelectedturn ? (
          <Paper
            elevation={0}
            style={{
              marginTop: "30px",
              background: "linear-gradient(to right bottom, #171926, #2C2E45)",
              borderRadius: 20,

              border: `2px solid #2E3B55`,
            }}
          >
            <SelectTurn
              Select_O={() => handelSelectO()}
              Select_X={() => handelSelectX()}
            />
          </Paper>
        ) : (
          <div>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item xs={4}>
                <Box
                  sx={{
                    "& > :not(style)": {
                      m: 1,
                      width: 400,
                      height: 500,
                      marginTop: "40px",
                    },
                  }}
                >
                  <Paper
                    elevation={0}
                    style={{
                      boxShadow:
                        "10px 10px 5px -2px rgba(23, 25, 40,0.9),-3px -3px 2px 0px rgba(200,200,200,0.1)",
                      background:
                        "linear-gradient(to right bottom, #171926, #2C2E45)",
                      borderRadius: 20,

                      border: `2px solid #2E3B55`,
                    }}
                  >
                    <Grid
                      container
                      spacing={{ xs: 1, md: 1 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      {board.map((item, index) => (
                        <Grid key={item.index} item>
                          <Box
                            onClick={() => {
                              chooseSquare(index);
                            }}
                            sx={{
                              marginLeft: "14px",
                              marginTop: "15px",

                              "&:hover": {
                                backgroundColor: "primary.main",
                                opacity: [0.5, 0.5, 0.5],
                              },
                              width: 100,
                              height: 100,
                              boxShadow:
                                "10px 10px 5px -2px rgba(23, 25, 40,0.9),-1px -1px 0px 0px rgba(200,200,200,0.1)",
                              background:
                                "linear-gradient(to right bottom, #171926, #2C2E45)",
                              borderRadius: 5,
                              border: `2px solid #2E3B55`,
                              paddingTop: "10px",
                              paddingLeft: "30px",
                            }}
                          >
                            <Typography variant="h2" color={"#2ACDE0"}>
                              {item}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </div>
        )}
      </Box>
    </>
  );
};

export default Main;

const SelectTurn = (props) => {
  return (
    <div>
      <Box margin={2} padding={2}>
        <div>
          <Typography sx={{ marginBottom: "20px" }} color="white">
            Select your Type
          </Typography>
          <ButtonGroup
            size="large"
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={props.Select_X}>X</Button>
            <Button onClick={props.Select_O}>O</Button>
          </ButtonGroup>
        </div>
      </Box>
    </div>
  );
};
