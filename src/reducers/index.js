import { combineReducers } from "redux";
import { patientReducer } from "./patientReducer";
import { userReducer } from "./userReducer";

export const asyncCombine = (asyncReducers) =>
  combineReducers({
    patientData: patientReducer,
    user: userReducer,
    ...asyncReducers
  });
