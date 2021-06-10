import {
  EDIT_PATIENT_SUCCESS,
  EDIT_PATIENT_REQUEST,
  ADD_PATIENT_FAIL,
  EDIT_PATIENT_FAIL,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  DELETE_PATIENT,
} from "../constants/patientConstants";
import { v4 as uuidv4 } from "uuid";
export const addPatient = (data) => async (dispatch, getState) => {
  try {
    //cherry picking existing data from the state
    const tableData = getState().patientData.data;
    console.log(tableData);
    //state to request before api call
    dispatch({
      type: ADD_PATIENT_REQUEST,
    });
    //add data to the existing array of data (supposed to be an api call)
    tableData.push({ ...data, id: uuidv4() });
    dispatch({
      type: ADD_PATIENT_SUCCESS,
      payload: tableData,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_PATIENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editPatient = (data, id) => async (dispatch, getState) => {
  try {
    console.log(data);
    //cherry picking existing data from the state
    const tableData = getState().patientData.data;
    //state to request before api call
    dispatch({
      type: EDIT_PATIENT_REQUEST,
    });
    //add data to the existing array of data (supposed to be an api call)
    const elementsIndex = tableData.findIndex((element) => element.id === id);
    if (elementsIndex >= 0) {
      let newTableData = [...tableData];
      newTableData[elementsIndex] = {id,...data};
      dispatch({
        type: EDIT_PATIENT_SUCCESS,
        payload: newTableData,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_PATIENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePatient = (id) => async (dispatch, getState) => {
  try {
    //cherry picking existing data from the state
    const tableData = getState().patientData.data;
    //state to request before api call
    dispatch({
      type: EDIT_PATIENT_REQUEST,
    });
    //add data to the existing array of data (supposed to be an api call)
    const elementsIndex = tableData.findIndex((element) => element.id === id);
    
    if (elementsIndex >= 0) {
      tableData.splice(elementsIndex,1);
      dispatch({
        type: DELETE_PATIENT,
        payload: tableData,
      });
    }
  } catch (error) {
    console.log(error);
    
  }
};
