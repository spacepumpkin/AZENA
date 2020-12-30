import { RESET_ALL_ERRORS } from "../../actions/error_actions";
import {
  RECEIVE_TASK,
  RECEIVE_TASK_ERRORS
} from "../../actions/task_actions";

const tasksErrorsReducer = function (oldState = [], action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_TASK:
      return [];
    case RECEIVE_TASK_ERRORS:
      return Object.assign([], oldState, action.errors);
    case RESET_ALL_ERRORS:
      return [];
    default:
      return oldState;
  }
}

export default tasksErrorsReducer;