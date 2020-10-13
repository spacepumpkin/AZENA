import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import RootReducer from "../reducers/root_reducer";

// thunk middleware
const thunk = function({dispatch, getState}) {
  return function(nextMiddleWare) {
    return function (action) {
      if (typeof action === "function") {
        return action(dispatch, getState);
      }
      return nextMiddleWare(action);
    }
  }
} 

// generate store that can take in a preloadedState (like current session)
const configureStore = function(preloadedState = {}) {
  return createStore(RootReducer, preloadedState, applyMiddleware(thunk, logger))
};

export default configureStore;
