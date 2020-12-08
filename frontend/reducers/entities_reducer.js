import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import workspacesReducer from "./workspaces/workspaces_reducer";
import projectsReducer from "./projects/projects_reducer";
import tasksReducer from "./tasks/tasks_reducer";
import assignedTasksIdsReducer from "./tasks/assigned_tasks_ids_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  workspaces: workspacesReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  assignedTasksIds: assignedTasksIdsReducer
});

export default entitiesReducer;

// entities: {
//     users: {},
//     workspaces: {},
//     projects: {},
//     tasks: {},
//   },