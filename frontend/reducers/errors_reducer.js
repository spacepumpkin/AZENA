import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import workspacesErrorsReducer from "./workspaces/workspaces_errors_reducer";
import projectsErrorsReducer from "./projects/projects_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  workspaces: workspacesErrorsReducer,
  projects: projectsErrorsReducer
})

export default errorsReducer;

// errors: {
//   session: []
// }