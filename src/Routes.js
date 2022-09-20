import { Navigate, useRoutes } from "react-router-dom";
import React from "react";
import MainScreen from "./component/Main/MainScreen";
import MyLogin from "./component/Login/MyLogin";
export default function Router() {
  return useRoutes([
    {
      path: "/Main",
      element: <MainScreen />,
      children: [{ path: "main", element: <MainScreen /> }],
    },
    {
      path: "/",
      element: <MainScreen />,
    },
    {
      path: "/login",
      element: <MyLogin />,
    },
  ]);
}
