import * as ProjectApiUtil from "../util/project_api_util";

// REGULAR ACTIONS --------------------------------------------------
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const RECEIVE_PROJECT_ERRORS = "RECEIVE_PROJECT_ERRORS";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const REMOVE_PROJECT_FROM_WORKSPACE = "REMOVE_PROJECT_FROM_WORKSPACE";

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

const deleteProject = function (projectId) {
  return {
    type: DELETE_PROJECT,
    projectId
  }
}

// const removeProjectFromWorkspace = function (projectId) {
//   return {
//     type: REMOVE_PROJECT_FROM_WORKSPACE,
//     projectId
//   }
// }

// THUNK ACTIONS --------------------------------------------------

// Test Status - not tested
export const createProject = function (project) {
  return function (dispatch) {
    // console.log("dispatching createProject");
    return (
      ProjectApiUtil.createProject(project)
        .then(
          (project) => dispatch(receiveProject(project)),
          (errors) => dispatch(receiveProjectErrors(errors.responseJSON))
        )
    );
  };
};

// Test Status - not tested
export const updateProject = function (project) {
  return function (dispatch) {
    // console.log("dispatching updateProject");
    return (
      ProjectApiUtil.updateProject(project)
        .then(
          (project) => dispatch(receiveProject(project)),
          (errors) => dispatch(receiveProjectErrors(errors.responseJSON))
        )
    );
  };
};

// Test Status - not tested
export const destroyProject = function (projectId) {
  return function (dispatch) {
    // console.log("dispatching destroyProject");
    return (
      ProjectApiUtil.destroyProject(projectId)
        .then(
          (project) => dispatch(deleteProject(project.id)),
          (errors) => dispatch(receiveProjectErrors(errors.responseJSON))
        )
    );
  };
};