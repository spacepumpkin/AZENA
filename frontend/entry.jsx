import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";

/*
Entry point file that renders the `Root` component, with a `store`
prop passed in, inside the div with id 'root'.
*/

// TESTING ONLY
// SessionApiUtil
// import * as SessionApiUtil from "./util/session_api_util";
// SessionActions
import { signup, login, logout } from "./actions/session_actions";

document.addEventListener("DOMContentLoaded", () => {
  // Hook onto root DOM element
  const rootEl = document.getElementById("root");

  // Bootstrap currentUser and currentUser info
  let preloadedState = undefined;
  if (window.currentUser) {
    preloadedState = {
      entities: {
        users: {
          [window.currentUser.id]: window.currentUser
        },
      },
      session: {
        id: window.currentUser.id
      }
    };
    console.log(window.currentUser);
  }

  // Setup store and render main React DOM
  const store = configureStore(preloadedState);
  ReactDOM.render(<Root store={store} />, rootEl);


  // TESTING START
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // SessionApiUtil
  // window.sessionSignUp = SessionApiUtil.signup; // PASS - user should be able to sign up and login in BE
  // window.sessionLogin = SessionApiUtil.login; // PASS - user should be able to login in BE
  // window.sessionLogout = SessionApiUtil.logout; // PASS - user should be able to logout in BE
  // SessionActions
  // window.signup = signup; // PASS - user should be able to sign up and login in BE/FE and be saved to state
  // window.login = login; // PASS - user should be able to login in BE/FE and be saved to state
  // window.logout = logout; // PASS - clears session: id: null

  // TESTING END
})