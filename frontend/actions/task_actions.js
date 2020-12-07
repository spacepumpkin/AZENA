import * as TaskApiUtil from "../util/task_api_util";
/*
  * createTask(task) -> RECEIVE_TASK
  * updateTask(task) -> RECEIVE_TASK
  * destroyTask(task) -> REMOVE_TASK
*/

// REGULAR ACTIONS --------------------------------------------------
export const RECEIVE_TASK = "RECEIVE_TASK";
export const RECEIVE_TASK_ERRORS = "RECEIVE_TASK_ERRORS";
export const REMOVE_TASK = "REMOVE_TASK";
// export const REMOVE_TASK_FROM_WORKSPACE = "REMOVE_TASK_FROM_WORKSPACE";

const receiveTask = function (task) {
  return {
    type: RECEIVE_TASK,
    task
  }
}

const receiveTaskErrors = function (errors) {
  return {
    type: RECEIVE_TASK_ERRORS,
    errors
  }
}

const removeTask = function (task) {
  return {
    type: REMOVE_TASK,
    task
  }
}

// const removeTaskFromWorkspace = function (taskId) {
//   return {
//     type: REMOVE_TASK_FROM_WORKSPACE,
//     taskId
//   }
// }

// THUNK ACTIONS --------------------------------------------------

// Test Status - PASS
export const createTask = function (task) {
  return function (dispatch) {
    // console.log("dispatching createTask");
    return (
      TaskApiUtil.createTask(task)
        .then(
          (task) => dispatch(receiveTask(task)),
          (errors) => dispatch(receiveTaskErrors(errors.responseJSON))
        )
    );
  };
};

// Test Status - PASS
export const updateTask = function (task) {
  return function (dispatch) {
    // console.log("dispatching updateTask");
    return (
      TaskApiUtil.updateTask(task)
        .then(
          (task) => dispatch(receiveTask(task)),
          (errors) => dispatch(receiveTaskErrors(errors.responseJSON))
        )
    );
  };
};

// Test Status - PASS
export const destroyTask = function (taskId) {
  return function (dispatch) {
    // console.log("dispatching destroyTask");
    return (
      TaskApiUtil.destroyTask(taskId)
        .then(
          (task) => dispatch(removeTask(task)),
          (errors) => dispatch(receiveTaskErrors(errors.responseJSON))
        )
    );
  };
};