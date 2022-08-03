import React, { useState } from "react";
import { addUser } from "../../redux/api";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import { addUserr } from "../../redux/userSlice";
import "@fontsource/roboto/500.css";

function Form() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handelClick = (e) => {
    e.preventDefault();
    // addUser({ name, email }, dispatch);
    dispatch(addUserr({ name, email }));
  };

  return (
    <form onSubmit={handelClick}>
      <div className="form-group">
        <input
          onChange={(e) => setname(e.target.value)}
          type="text"
          placeholder="Enter Name"
        />
      </div>
      <div className="form-group">
        <input
          onChange={(e) => setemail(e.target.value)}
          type="Email"
          placeholder="Enter Email"
        />
      </div>
      <div className="form-group">
        {loading ? "loading" : <input type="submit" placeholder="Add user" />}
      </div>
      {error && "somthing went worng !"}
    </form>
  );
}

export default Form;
