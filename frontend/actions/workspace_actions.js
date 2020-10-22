import * as WorkspaceApiUtil from "../util/workspace_api_util";

/* Export action constants:

* `RECEIVE_WORKSPACE` - receiveWorkspace (`workspace` payload)
* `RECEIVE_WORKSPACE_ERRORS` - receiveWorkspaceErrors(errors) (`errors` payload)

Export thunk action creators with the specified parameters:

* createWorkspace(workspace) -> receiveWorkspace or receiveWorkspaceErrors

*/

// REGULAR ACTIONS --------------------------------------------------
export const RECEIVE_WORKSPACE = "RECEIVE_WORKSPACE";
export const RECEIVE_WORKSPACE_ERRORS = "RECEIVE_WORKSPACE_ERRORS";

const receiveWorkspace = function(workspace) {
  console.log("receiving workspace");
  return {
    type: RECEIVE_WORKSPACE,
    workspace
  }
}

const receiveWorkspaceErrors = function(errors) {
  console.log("receiving workspace errors");
  return {
    type: RECEIVE_WORKSPACE_ERRORS,
    errors
  }
}

// THUNK ACTIONS --------------------------------------------------

export const createWorkspace = function (workspace) {
  return function (dispatch) {
    console.log("dispatching createWorkspace");
    return (
      WorkspaceApiUtil.createWorkspace(workspace)
        .then(
          (workspace) => dispatch(receiveWorkspace(workspace)),
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  };
};

export const fetchWorkspace = function (workspaceId) {
  return function (dispatch) {
    console.log("dispatching fetchWorkspace");
    return (
      WorkspaceApiUtil.fetchWorkspace(workspaceId)
        .then(
          (workspace) => dispatch(receiveWorkspace(workspace)),
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  };
};

// export const deleteWorkspace = function (workspaceId) {
//   return function (dispatch) {
//     console.log("dispatching deleteWorkspace");
//     return (
//       WorkspaceApiUtil.deleteWorkspace(workspaceId)
//         .then(
//           (workspace) => dispatch(removeWorkspace(workspace)),
//           (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
//         )
//     );
//   }
// }