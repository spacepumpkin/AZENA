import {
  // RECEIVE_TASK,
  REMOVE_TASK,
  RECEIVE_USERS_TASK,
  REMOVE_USERS_TASK
} from "../../actions/task_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const userTasksReducer = function (oldState = {}, action) {
  Object.freeze(oldState);
  const newState = Object.assign({}, oldState);
  
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      // console.log("receiving current user (userTasksReducer");
      return action.payload.usersTasks;
    case RECEIVE_USERS_TASK:
      return Object.assign(newState, { [action.usersTask.id]: action.usersTask })
    case REMOVE_USERS_TASK:
      delete newState[action.usersTask.id];
      return newState;
    case REMOVE_TASK:
      for (let id in newState) {
        if (newState[id].taskId === action.task.id) { delete newState[id] }
      }
      return newState;
    default:
      return oldState;
  }
}

export default userTasksReducer;

// usersTasks: {
//   1: {
//     id: 1,
//     userId: 1,
//     taskId: 1,
//   },
// }