import { RESET_DATA } from "../constants/patientConstants";
import { USER_LOGOUT } from "../constants/userConstants";
export const userLogout = (history) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_DATA,
    });
    dispatch({
      type: USER_LOGOUT,
    });
    window.localStorage.clear();
    history.push('/')
  } catch (error) {
    console.log(error);
  }
};
