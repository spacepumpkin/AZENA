import * as WorkspaceApiUtil from "../util/workspace_api_util";

/* Export action constants:

* `RECEIVE_USER_WORKSPACES` - receiveWorkspace (`workspace` payload)
* `RECEIVE_WORKSPACE` - receiveWorkspace (`workspace` payload)
* `RECEIVE_WORKSPACE_ERRORS` - receiveWorkspaceErrors(errors) (`errors` payload)

Export thunk action creators with the specified parameters:

* createWorkspace(workspace) -> receiveWorkspace or receiveWorkspaceErrors

*/

// REGULAR ACTIONS --------------------------------------------------
export const RECEIVE_USER_WORKSPACES = "RECEIVE_USER_WORKSPACES";
export const RECEIVE_WORKSPACE = "RECEIVE_WORKSPACE";
export const RECEIVE_WORKSPACE_ERRORS = "RECEIVE_WORKSPACE_ERRORS";
export const REMOVE_WORKSPACE = "REMOVE_WORKSPACE";

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

const receiveWorkspaceErrors = function(errors) {
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

//
export const deleteWorkspace = function (workspaceId) {
  return function (dispatch) {
    console.log("dispatching deleteWorkspace");
    return (
      WorkspaceApiUtil.deleteWorkspace(workspaceId)
        .then(
          (workspace) => dispatch(removeWorkspace(workspace)),
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  }
}