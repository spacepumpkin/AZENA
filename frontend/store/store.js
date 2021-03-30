import { applyMiddleware, createStore } from "redux";
// import logger from "redux-logger"; // use 'require' below
import rootReducer from "../reducers/root_reducer";

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

const middlewares = [thunk];

if (process.env.NODE_ENV !== "production") {
  // must use 'require' (import only allowed at top of file)
  const { logger } = require("redux-logger");
  middlewares.push(logger);
} 

// generate store that can take in a preloadedState (like current session)
const configureStore = function(preloadedState = {}) {
  return createStore(rootReducer, preloadedState, applyMiddleware(...middlewares))
};

export default configureStore;
