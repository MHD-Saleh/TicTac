import React from "react";
import { useSelector } from "react-redux";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
function Header() {
  const { name } = useSelector((state) => state.user.userData);
  //setboardd

  return (
    <div className="header">
      <h1>My App</h1>
      <p>Hello {name}</p>
    </div>
  );
}

export default Header;
