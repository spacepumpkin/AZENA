import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";

/*
Entry point file that renders the `Root` component, with a `store`
prop passed in, inside the div with id 'root'.
*/

// ------------------------------ TESTING START -------------------------------
// * Session
import * as SessionApiUtil from "./util/session_api_util";
import { signup, login, logout } from "./actions/session_actions";
// * Workspaces
import * as WorkspaceApiUtil from "./util/workspace_api_util";
import { createWorkspace, fetchWorkspace } from "./actions/workspace_actions";
// ------------------------------ TESTING END ---------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");

  // Bootstrap currentUser and currentUser info
  let preloadedState = undefined;
  if (window.currentUser) {
    const { currentUser } = window;
    const { id } = currentUser;
    const currentWorkspaces = (window.workspaces) ? window.workspaces : {} ;
    console.info("currentUser:", currentUser);
    preloadedState = {
      entities: {
        users: {
          [id]: currentUser
        },
        workspaces: currentWorkspaces
      },
      session: {
        id: id
      }
    };
    
    // ! uncomment later: delete window.currentUser;
  }

  // Setup store and render main React DOM
  const store = configureStore(preloadedState);
  ReactDOM.render(<Root store={store} />, rootEl);
  
  // THEME SWITCH --------------------------------------------------------------
  // saved theme on localStorage (can also save to State)

  // const applyTheme = function(theme) {
  //   if (document.body.className !== theme) { 
  //     document.body.className = theme;
  //     console.log(`switched to ${theme}`);
  //   }
  // };
  
  // const savedTheme = localStorage.getItem("theme") || "theme-light";
  // applyTheme(savedTheme);

  // document.getElementById("theme-switch").addEventListener("click", () => {
  //   let switchedTheme = (document.body.className === "theme-light") ? "theme-dark" : "theme-light";
  //   applyTheme(switchedTheme);
  //   localStorage.setItem("theme", switchedTheme);
  // })

  // CLOSING DROPDOWNS ---------------------------------------------------------
  // closes dropdown menus if user clicks outside
  // function closeDropDowns() {
  //   Array.from(document.querySelectorAll("[id$=-'dropdown']"))
  //     .forEach((dropdown) => {
  //       dropdown.classList.add("hide")
  //     });
  // } 
  // ---------------------------------------------------------------------------


  // ------------------------------ TESTING START ------------------------------
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  // * SessionApiUtil
  // window.sessionSignUp = SessionApiUtil.signup; // PASS - user should be able to sign up and login in BE
  // window.sessionLogin = SessionApiUtil.login; // PASS - user should be able to login in BE
  // window.sessionLogout = SessionApiUtil.logout; // PASS - user should be able to logout in BE
  // * SessionActions
  // window.signup = signup; // PASS - user should be able to sign up and login in BE/FE and be saved to state
  // window.login = login; // PASS - user should be able to login in BE/FE and be saved to state, or errors shown
  // window.logout = logout; // PASS - clears session: id: null
  // * WorkspaceApiUtil
  // window.createWorkspaceApi = WorkspaceApiUtil.createWorkspace; // PASS - in BE user should be able to create a workspace unique to them
  // window.createWorkspace = createWorkspace; // PASS - FE State should be updated with new workspace or errors
  // window.fetchUserWorkspacesApi = WorkspaceApiUtil.fetchUserWorkspaces; // PASS - should be able to GET current users workspaces
  // window.fetchWorkspaceApi = WorkspaceApiUtil.fetchWorkspace; // PASS - should be able to GET specific workspace
  // window.fetchWorkspace = fetchWorkspace; // PASS - should be able to GET specific workspace
  

  // ------------------------------ TESTING END --------------------------------
})