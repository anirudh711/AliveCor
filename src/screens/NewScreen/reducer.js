/*
 * NewScreen Reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */


import { MOUNTING_SCREEN } from "./constants";

const initialState = {
   mount:false
  };
  
  export const reducer=function(state = initialState, action) {
    switch (action.type) {
      case MOUNTING_SCREEN: {
        return { ...state, mount: action.payload };
      }
      default: {
        return state;
      }
    }
  }
  