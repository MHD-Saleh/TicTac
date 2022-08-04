import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setType } from "../redux/LoginSlice";

const Main = () => {
  const dispatch = useDispatch();
  const { Type } = useSelector((state) => state.userlog);

  const [isSelectedturn, setisSelectedturn] = useState(false);
  const [myType, setmyType] = useState("");
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [board, setboard] = useState([
    "x",
    "o",
    "x",
    "x",
    "o",
    "x",
    "x",
    "o",
    "o",
  ]);

  const [open, setOpen] = useState(false);

  const handelSelectO = () => {
    setisSelectedturn(true);
    dispatch(setType("o"));
    setmyType("o");
    console.log("select o");
  };
  const handelSelectX = () => {
    setisSelectedturn(true);
    dispatch(setType("x"));
    setmyType("x");
    console.log("select x");
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
                    {Type && (
                      <Box sx={{ marginLeft: "50px" }}>
                        <Typography color={"white"}>
                          my Type is : {Type}
                        </Typography>
                      </Box>
                    )}
                    <Grid
                      container
                      spacing={{ xs: 1, md: 1 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      {board.map((item, index) => (
                        <Grid key={item.index} item>
                          <Box
                            onClick={() => console.log(index)}
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
