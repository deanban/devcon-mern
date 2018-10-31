import axios from "axios";
import { GET_ERRORS } from "../actions/types";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  //   return {
  //     type: "TEST_DISPATCH",
  //     payload: userData
  //   };
};
