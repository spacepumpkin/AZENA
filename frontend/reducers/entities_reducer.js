import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import workspacesReducer from "./workspaces/workspaces_reducer";
import projectsReducer from "./projects/projects_reducer";
import sectionsReducer from "./sections/sections_reducer";
import tasksReducer from "./tasks/tasks_reducer";
import usersTasksReducer from "./tasks/users_tasks_reducer";
import userWorkspacesReducer from "./workspaces/users_workspaces_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  workspaces: workspacesReducer,
  projects: projectsReducer,
  sections: sectionsReducer,
  tasks: tasksReducer,
  usersTasks: usersTasksReducer,
  usersWorkspaces: userWorkspacesReducer
});

export default entitiesReducer;

// entities: {
//     users: {},
//     workspaces: {},
//     projects: {},
//     sections: {},
//     tasks: {},
//     usersTasks: {},
//     usersWorkspaces: {}
//   },