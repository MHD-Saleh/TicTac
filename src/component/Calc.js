import React, { useState } from "react";

//import this file as your location
import "../calc.css";

const Calc = () => {
  const [reasult, setResult] = useState("");

  const [FirstInput, setFirstInput] = useState("");

  const [secondInput, setsecondInput] = useState("");

  const handelFirstInput = (val1) => {
    setFirstInput(val1.target.value);
  };

  const handelSecondInput = (val2) => {
    setsecondInput(val2.target.value);
  };

  const handeloperation = (op) => {
    const p1 = parseInt(FirstInput);
    const p2 = parseInt(secondInput);
    switch (op) {
      case "add":
        if (Number.isNaN(p1 + p2)) {
          setResult("please enter only numbers");
        } else {
          setResult(p1 + p2);
        }
        break;

      case "sub":
        if (Number.isNaN(p1 - p2)) {
          setResult("please enter only numbers");
        } else {
          setResult(p1 - p2);
        }
        break;

      case "divide":
        if (Number.isNaN(p1 / p2)) {
          setResult("please enter only numbers");
        } else {
          setResult(p1 / p2);
        }
        break;

      case "multi":
        if (Number.isNaN(p1 * p2)) {
          setResult("please enter only numbers");
        } else {
          setResult(p1 * p2);
        }

        break;
    }
  };

  return (
    <div className="main">
      <h3>Calculator!</h3>
      <div className="firstrow">
        <input
          value={FirstInput}
          onChange={(e) => handelFirstInput(e)}
          className="input"
          placeholder="NUMBER "
        />
        <input
          value={secondInput}
          onChange={(e) => handelSecondInput(e)}
          className="input"
          placeholder="NUMBER"
        />
      </div>
      <div>
        <button
          onClick={() => {
            handeloperation("add");
          }}
          className="bt1"
        >
          ADD
        </button>

        <button
          onClick={() => {
            handeloperation("sub");
          }}
          className="bt1"
        >
          SUBTRACT
        </button>
        <button
          onClick={() => {
            handeloperation("multi");
          }}
          className="bt1"
        >
          MULTYPLY
        </button>
        <button
          onClick={() => {
            handeloperation("divide");
          }}
          className="bt1"
        >
          DIVIDE
        </button>
        <button
          onClick={() => {
            setFirstInput("");
            setsecondInput("");
            setResult("");
          }}
          className="bt2"
        >
          CLEAR
        </button>
      </div>
      <div className="res">Result: {reasult}</div>
    </div>
  );
};

export default Calc;
