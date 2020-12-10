import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

/*
Entry point file that renders the `Root` component, with a `store`
prop passed in, inside the div with id 'root'.
*/

// ------------------------------ TESTING START -------------------------------
// * Session
// import * as SessionApiUtil from './util/session_api_util';
// import { signup, login, logout } from './actions/session_actions';
// * Workspaces
// import * as WorkspaceApiUtil from './util/workspace_api_util';
// import { createWorkspace, fetchWorkspace, updateWorkspace, destroyWorkspace } from './actions/workspace_actions';
// * Projects
// import { createProject, updateProject, destroyProject } from './actions/project_actions';
// * Tasks
import { createTask, updateTask, destroyTask, assignUsersTask, unassignUsersTask } from './actions/task_actions';

// ------------------------------ TESTING END ---------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");

  // ! Bootstrap currentUser and currentUser info - updated to get payload instead
  let preloadedState = undefined;
  if (window.currentUserPayload) {
    const { currentUserPayload } = window;
    const { 
      currentUser, 
      users, 
      workspaces, 
      projects,
      tasks,
      usersWorkspaces, 
      usersProjects,
      usersTasks } = currentUserPayload;
    // const currentWorkspaces = (window.workspaces) ? window.workspaces : {} ;
    // console.info("currentUser:", currentUser);
    preloadedState = {
      entities: {
        users: users,
        workspaces: workspaces,
        projects: projects,
        tasks: tasks,
        // usersWorkspaces: usersWorkspaces,
        // usersProjects: usersProjects,
        usersTasks: usersTasks,
      },
      session: {
        id: currentUser.id
      }
    };
    delete window.currentUserPayload;
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
  // window.updateWorkspaceApi = WorkspaceApiUtil.updateWorkspace; // PASS - can update own workspaces
  // window.updateWorkspace = updateWorkspace; // PASS - can update workspace in State quickly
  // window.destroyWorkspaceApi = WorkspaceApiUtil.destroyWorkspace; // PASS - should be able to destroy workspace in BE
  // window.destroyWorkspace = destroyWorkspace; // PASS - should be able to destroy workspace in BE and FE
  // window.createProject = createProject; // PASS - should be able to create project in BE and FE
  // window.updateProject = updateProject; // PASS - should be able to update project in BE and FE
  // window.destroyProject = destroyProject; // PASS - should be able to destroy project in BE and FE
  // window.createTask = createTask; // PASS - should be able to create task in BE and FE + assign task to user (create usersTask)
  // window.updateTask = updateTask; // PASS - should be able to update task in BE and FE
  // window.destroyTask = destroyTask; // PASS - should be able to destroy task in BE and FE + unassign all users from task (delete usersTask)
  window.assignUsersTask = assignUsersTask; // PASS - should be able to assign user to a specific task
  window.unassignUsersTask = unassignUsersTask; // PASS - should be able to unassign user from a specific tasks

  // ------------------------------ TESTING END --------------------------------
})