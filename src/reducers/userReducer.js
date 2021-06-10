import {
   USER_LOGOUT
  } from "../constants/userConstants";
  export const userReducer = (state = {}, action) => {
    switch (action.type) {
      
        case USER_LOGOUT:
        return { ...state, data: null };
      default:
        return state;
    }
  };
  