import { Button } from "@mui/material";
import React, { useState } from "react";
import "./Sidebar/calc.css";
import { useDispatch, useSelector } from "react-redux";

const Calc = () => {
  const dispatch = useDispatch();

  return (
    <div className="main">
      <h3>Redux!</h3>

      <Button variant="contained">Connect</Button>
    </div>
  );
};

export default Calc;
