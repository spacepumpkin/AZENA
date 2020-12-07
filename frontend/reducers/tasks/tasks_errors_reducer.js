import {
  RECEIVE_TASK,
  RECEIVE_TASK_ERRORS
} from "../../actions/task_actions";

const tasksErrorsReducer = function (oldState = [], action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_TASK:
      // console.log("receiving task (tasksErrorsReducer)");
      return [];
    case RECEIVE_TASK_ERRORS:
      // console.log(`receiving task errors (tasksErrorsReducer)`)
      return Object.assign([], oldState, action.errors)
    default:
      return oldState;
  }
}

export default tasksErrorsReducer;