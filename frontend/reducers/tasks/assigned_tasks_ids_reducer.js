// import {
//   RECEIVE_TASK,
//   REMOVE_TASK
// } from "../../actions/task_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const assignedTasksIdsReducer = function (oldState = [], action) {
  Object.freeze(oldState);
  
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      // console.log("receiving current user (assignedTasksIdsReducer");
      return action.payload.assignedTasksIds;
    default:
      return oldState;
  }
}

export default assignedTasksIdsReducer;