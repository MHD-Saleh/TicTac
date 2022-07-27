import { errorUser, startUser, successUser } from "./userSlice";
//import { useDispatch } from "react-redux";
import axios from "axios";

export const addUser = async (user, dispatch) => {
  dispatch(startUser());

  try {
    const res = await axios.post("http://localhost:5000/api/users", user);
    dispatch(successUser(res.data));
  } catch (err) {
    dispatch(errorUser());
  }
};
