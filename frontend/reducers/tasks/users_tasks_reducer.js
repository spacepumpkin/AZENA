import {
  RECEIVE_TASK,
  REMOVE_TASK,
  RECEIVE_USERS_TASK,
  REMOVE_USERS_TASK
} from "../../actions/task_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const userTasksReducer = function (oldState = {}, action) {
  Object.freeze(oldState);
  
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      // console.log("receiving current user (userTasksReducer");
      return action.payload.usersTasks;
    default:
      return oldState;
  }
}

export default userTasksReducer;