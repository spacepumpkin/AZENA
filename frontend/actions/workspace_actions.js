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
  return {
    type: RECEIVE_USER_WORKSPACES,
    workspaces
  }
}

const receiveWorkspace = function(workspace) {
  return {
    type: RECEIVE_WORKSPACE,
    workspace
  }
}

export const receiveWorkspaceErrors = function(errors) {
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
const removeUsersWorkspace = function (usersWorkspace, usersTaskIds) {
  return {
    type: REMOVE_USERS_WORKSPACE,
    usersWorkspace,
    // userId,
    usersTaskIds
  }
}

// THUNK ACTIONS --------------------------------------------------

// PASS
export const createWorkspace = function (workspace) {
  return function (dispatch) {
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
  return function (dispatch, getState) {
    return (
      WorkspaceApiUtil.unassignUsersWorkspace(userId, workspaceId)
        .then(
          // (usersWorkspace) => { 
            // Filter out list of user's assigned tasks that were associated with workspace
            // * METHOD 1 - Filter in FE
            // let workspaceId = usersWorkspace.workspaceId;
            // let userId = usersWorkspace.userId;
            // let workspaceProjectsIds = [];
            // Object.values(getState().entities.projects).forEach(project => {
            //   if (project.workspaceId === workspaceId) workspaceProjectIds.push(project.id);
            // });
            // let allTasks = Object.values(getState().entities.tasks);
            // let usersTasksIds = []
            // for (let task of allTasks) {
            //   if (workspaceProjectsIds.includes(task.projectId)) usersTasksIds.push(task.id);
            // }

            // dispatch(removeUsersWorkspace(usersWorkspace, userId, usersTasksIds))
          ({ usersWorkspace, usersTaskIds }) => { 
            // * METHOD 2 - Get pre-made array of usersTask ids from BE
            dispatch(removeUsersWorkspace(usersWorkspace, usersTaskIds))
          },
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  };
};

// ! Save for later
export const removeWorkspaceFromUser = function (userId, workspaceId) {
  return function (dispatch) {
    return (
      WorkspaceApiUtil.removeWorkspaceFromUser(userId, workspaceId)
        .then(
          (workspace) => dispatch(removeWorkspace(workspace)),
          (errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON))
        )
    );
  }
}