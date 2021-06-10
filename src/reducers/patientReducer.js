import {
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  DELETE_PATIENT,
  EDIT_PATIENT_REQUEST,
  EDIT_PATIENT_SUCCESS,
  RESET_DATA,
} from "../constants/patientConstants";
export const patientReducer = (state = {data:[]}, action) => {
  switch (action.type) {
    case ADD_PATIENT_REQUEST:
      return { ...state, loading: true };
    case ADD_PATIENT_SUCCESS:
      return { ...state, data: action.payload };
      case EDIT_PATIENT_REQUEST:
      return { ...state, loading: true };
    case EDIT_PATIENT_SUCCESS:
      return { ...state, data: action.payload };
      case DELETE_PATIENT:
      return { ...state, data: action.payload };
      case RESET_DATA:
      return { ...state, data: [] };
    default:
      return state;
  }
};
