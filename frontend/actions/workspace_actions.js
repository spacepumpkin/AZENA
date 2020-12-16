import * as WorkspaceApiUtil from "../util/workspace_api_util";

/* 
Export thunk action creators with the specified parameters:

* createWorkspace(workspace) -> RECEIVE_WORKSPACE
* updateWorkspace(workspace) -> RECEIVE_WORKSPACE
* destroyWorkspace(workspaceId) -> REMOVE_WORKSPACE
- removeWorkspaceFromUser(workspace) -> REMOVE_WORKSPACE
*/

// REGULAR ACTIONS --------------------------------------------------
// export const RECEIVE_USER_WORKSPACES = "RECEIVE_USER_WORKSPACES";
export const RECEIVE_WORKSPACE = "RECEIVE_WORKSPACE";
export const RECEIVE_WORKSPACE_ERRORS = "RECEIVE_WORKSPACE_ERRORS";
export const REMOVE_WORKSPACE = "REMOVE_WORKSPACE";

export const RECEIVE_USERS_WORKSPACE = "RECEIVE_USERS_WORKSPACE";
export const REMOVE_USERS_WORKSPACE = "REMOVE_USERS_WORKSPACE";
// export const REMOVE_WORKSPACE_FROM_USER = "REMOVE_WORKSPACE_FROM_USER";

const receiveUserWorkspaces = function(workspaces) {
  // console.log("receiving user workspaces");
  return {
    type: RECEIVE_USER_WORKSPACES,
    workspaces
  }
}

const receiveWorkspace = function(workspace) {
  // console.log("receiving workspace");
  return {
    type: RECEIVE_WORKSPACE,
    workspace
  }
}

export const receiveWorkspaceErrors = function(errors) {
  // console.log("receiving workspace errors");
  return {
    type: RECEIVE_WORKSPACE_ERRORS,
    errors
  }
}

const removeWorkspace = function(workspace) {
  return {
    type: REMOVE_WORKSPACE,
    workspace
  }
}

// Add workspace to single user
const receiveUsersWorkspace = function (usersWorkspace) {
  return {
    type: RECEIVE_USERS_WORKSPACE,
    usersWorkspace
  }
}

// Remove workspace from single user
const removeUsersWorkspace = function (usersWorkspace) {
  return {
    type: REMOVE_USERS_WORKSPACE,
    usersWorkspace
  }
}

// THUNK ACTIONS --------------------------------------------------

// PASS
export const createWorkspace = function (workspace) {
  return function (dispatch) {
    // console.log("dispatching createWorkspace");
    return (
      WorkspaceApiUtil.createWorkspace(workspace)
        .then(
          (workspace) => dispatch(receiveWorkspace(workspace)),
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  };
};

// PASS
export const fetchWorkspace = function (workspaceId) {
  return function (dispatch) {
    // console.log("dispatching fetchWorkspace");
    return (
      WorkspaceApiUtil.fetchWorkspace(workspaceId)
        .then(
          (workspace) => dispatch(receiveWorkspace(workspace)),
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  };
};

// PASS
export const fetchUserWorkspaces = function () {
  return function (dispatch) {
    // console.log("dispatching fetchUserWorkspaces");
    return (
      WorkspaceApiUtil.fetchUserWorkspaces()
        .then(
          (workspaces) => dispatch(receiveUserWorkspaces(workspaces)),
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  };
};

// PASS
export const updateWorkspace = function (workspace) {
  return function (dispatch) {
    // console.log("dispatching updateWorkspace");
    return (
      WorkspaceApiUtil.updateWorkspace(workspace)
        .then(
          (workspace) => dispatch(receiveWorkspace(workspace)),
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  };
};

// PASS
export const destroyWorkspace = function (workspaceId) {
  return function (dispatch) {
    console.log("dispatching destroyWorkspace");
    return (
      WorkspaceApiUtil.destroyWorkspace(workspaceId)
        .then(
          (workspace) => dispatch(removeWorkspace(workspace)),
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  }
}

// Test Status - 
export const assignUsersWorkspace = function (userId, workspaceId) {
  return function (dispatch) {
    // console.log("dispatching assignUsersWorkspace");
    return (
      WorkspaceApiUtil.assignUsersWorkspace(userId, workspaceId)
        .then(
          (usersWorkspace) => dispatch(receiveUsersWorkspace(usersWorkspace)),
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  };
};

// Test Status - 
export const unassignUsersWorkspace = function (userId, workspaceId) {
  return function (dispatch) {
    // console.log("dispatching unassignUsersWorkspace");
    return (
      WorkspaceApiUtil.unassignUsersWorkspace(userId, workspaceId)
        .then(
          (usersWorkspace) => dispatch(removeUsersWorkspace(usersWorkspace)),
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  };
};

// ! Save for later
export const removeWorkspaceFromUser = function (userId, workspaceId) {
  return function (dispatch) {
    console.log("dispatching removeWorkspaceFromUser");
    return (
      WorkspaceApiUtil.removeWorkspaceFromUser(userId, workspaceId)
        .then(
          (workspace) => dispatch(removeWorkspace(workspace)),
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  }
}