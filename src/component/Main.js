import { Box, Grid, Paper, Stack, Switch, Typography } from "@mui/material";
import React, { useState } from "react";

const Main = () => {
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

  return (
    <>
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
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
                <Stack
                  sx={{ marginLeft: "150px" }}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Typography color="white">X</Typography>
                  <Switch
                    onChange={handleChange}
                    checked={checked}
                    name="type"
                  />
                  <Typography color="white">O</Typography>
                </Stack>
                <Grid
                  container
                  spacing={{ xs: 1, md: 1 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {board.map((item, index) => (
                    <Grid key={item.index} item xs={2} sm={4} md={4}>
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
                            "10px 10px 5px -2px rgba(23, 25, 40,0.9),-2px -2px 0px 0px rgba(200,200,200,0.1)",
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
    </>
  );
};

export default Main;
