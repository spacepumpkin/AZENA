import {combineReducers} from "redux";
import entitiesReducer from "./entities_reducer";
import sessionReducer from "./session_reducer";
import errorsReducer from "./errors_reducer";
import uiReducer from "./ui/ui_reducer";

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer,
  ui: uiReducer
})

export default rootReducer;

// State = {
//   entities: {
//     users: {},
//     workspaces: {},
//     projects: {},
//     tasks: {},
//   },
//   session: {
//     id: null,
//   },
//   errors: {
//     session: [],
//     workspaces: [],
//     projects: [],
//     sections: [],
//     tasks: []
//   },
//   ui: {
//     sidebarCollapse: false,
//     darkTheme: false
//   }
// }