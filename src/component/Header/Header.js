import React from "react";
import { useSelector } from "react-redux";
import "./Header.css";
function Header() {
  const { name } = useSelector((state) => state.user.userData);

  return (
    <div className="header">
      <h1>My App</h1>
      <p>Hello {name}</p>
    </div>
  );
}

export default Header;
