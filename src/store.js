import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { asyncCombine } from "./reducers";

const initialState = { patientData: { data: [] }, user: {} };
const middleware = [thunk];
const store = createStore(
  asyncCombine({}),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
store.asyncReducers = {};
export default store;
