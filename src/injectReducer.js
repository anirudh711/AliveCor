import React from "react";
import { combineReducers } from "redux";
import { connect, ReactReduxContext } from "react-redux";
import { asyncCombine } from "./reducers";

export function injectReducer(store, asyncReducers, replaceExisting) {
  Object.keys(asyncReducers).forEach(name => {
    if (store.asyncReducers[name]) {
      if (!replaceExisting) {
        return;
      } else {
        console.warn(
          `The reducer ${name} is being replaced with a new async reducer`
        );
      }
    }

    store.asyncReducers[name] = asyncReducers[name];
    store.replaceReducer(asyncCombine(store.asyncReducers));
    console.log('inside injet reducer')
  });
}

export const withInjectReducer = Component => props => (
  <ReactReduxContext.Consumer>
    {({ store }) => (
      <Component injectReducer={injectReducer.bind(null, store)} {...props} />
    )}
  </ReactReduxContext.Consumer>
);
