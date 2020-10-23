import * as ProjectApiUtil from "../util/project_api_util";

/* Export action constants:

`RECEIVE_PROJECT` - receiveProject (`project` payload)
`RECEIVE_PROJECT_ERRORS` - receiveProjectErrors(errors) (`errors` payload)

Export thunk action creators with the specified parameters:

createProject(project) -> receiveProject or receiveProjectErrors

*/

// REGULAR ACTIONS --------------------------------------------------
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const RECEIVE_PROJECT_ERRORS = "RECEIVE_PROJECT_ERRORS";

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

// THUNK ACTIONS --------------------------------------------------

export const createProject = function (project) {
  return function (dispatch) {
    console.log("dispatching createProject");
    return (
      ProjectApiUtil.createProject(project)
        .then(
          (project) => dispatch(receiveProject(project)),
          (errors) => dispatch(receiveProjectErrors(errors.responseJSON))
        )
    );
  };
};