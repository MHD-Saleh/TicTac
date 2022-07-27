import React from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";

function Sidebar() {
  const { name } = useSelector((state) => state.user.userData);

  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">content</a>
        </li>
        <li>
          <a href="#">Bloge</a>
        </li>
        <li>
          <a href="#">hello {name}</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
