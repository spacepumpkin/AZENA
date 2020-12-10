import {
  RECEIVE_TASK,
  REMOVE_TASK
} from "../../actions/task_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const tasksReducer = function (oldState = {}, action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      // console.log("receiving current user (tasksReducer");
      return Object.assign({}, oldState, action.payload.tasks);
    case RECEIVE_TASK:
      // console.log("receiving task (tasksReducer)");
      return Object.assign({}, oldState, { [action.task.id]: action.task });
    case REMOVE_TASK:
      // console.log(`removing task (tasksReducer)`)
      const newState = Object.assign({}, oldState);
      delete newState[action.task.id];
      return newState;
    default:
      return oldState;
  }
}

export default tasksReducer;

// tasks: {
//   1: {
//     id: 1,
//     name: "",
//     description: "",
//     dueDate: "2020-10-21"
//     creatorId: 1,
//     projectId: 1
//   },
// }