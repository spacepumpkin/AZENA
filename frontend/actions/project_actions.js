import * as ProjectApiUtil from "../util/project_api_util";
/*
  * createProject(project) -> RECEIVE_PROJECT
  * updateProject(project) -> RECEIVE_PROJECT
  * destroyProject(projectId) -> REMOVE_PROJECT
*/

// REGULAR ACTIONS --------------------------------------------------
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const RECEIVE_PROJECT_ERRORS = "RECEIVE_PROJECT_ERRORS";
export const REMOVE_PROJECT = "REMOVE_PROJECT";
// export const REMOVE_PROJECT_FROM_WORKSPACE = "REMOVE_PROJECT_FROM_WORKSPACE";

const receiveProject = function (project) {
  return {
    type: RECEIVE_PROJECT,
    project
  }
}

const receiveProjectErrors = function (errors) {
  return {
    type: RECEIVE_PROJECT_ERRORS,
    errors
  }
}

const removeProject = function (project) {
  return {
    type: REMOVE_PROJECT,
    project
  }
}

// const removeProjectFromWorkspace = function (projectId) {
//   return {
//     type: REMOVE_PROJECT_FROM_WORKSPACE,
//     projectId
//   }
// }

// THUNK ACTIONS --------------------------------------------------

// Test Status - PASS
export const createProject = function (project) {
  return function (dispatch) {
    return (
      ProjectApiUtil.createProject(project)
        .then(
          (project) => dispatch(receiveProject(project)),
          (errors) => dispatch(receiveProjectErrors(errors.responseJSON))
        )
    );
  };
};

// Test Status - PASS
export const updateProject = function (project) {
  return function (dispatch) {
    return (
      ProjectApiUtil.updateProject(project)
        .then(
          (project) => dispatch(receiveProject(project)),
          (errors) => dispatch(receiveProjectErrors(errors.responseJSON))
        )
    );
  };
};

// Test Status - PASS
export const destroyProject = function (projectId) {
  return function (dispatch) {
    return (
      ProjectApiUtil.destroyProject(projectId)
        .then(
          (project) => dispatch(removeProject(project)),
          (errors) => dispatch(receiveProjectErrors(errors.responseJSON))
        )
    );
  };
};