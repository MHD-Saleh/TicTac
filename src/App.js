import React from "react";
//import "./App.css";

import { BrowserRouter } from "react-router-dom";

import Router from "./Routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

/*function App() {
  return (
    <div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}
 */

export default App;

/* <Sidebar /> */
/* <Header /> */
/* <Form /> */
