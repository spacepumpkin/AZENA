import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import workspacesReducer from "./workspaces/workspaces_reducer";
import projectsReducer from "./projects/projects_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  workspaces: workspacesReducer,
  projects: projectsReducer
});

export default entitiesReducer;

// entities: {
//     users: {},
//     workspaces: {},
//     projects: {},
//     tasks: {},
//   },