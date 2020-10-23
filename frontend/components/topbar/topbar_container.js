import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopBar from "./topbar";

import { logout } from "../../actions/session_actions";
import { toggleSidebar } from "../../actions/ui_actions.js";

function getTopBarTitle(entities, ownProps) {
  // if (workspaces !== undefined || workspaces.length !== 0) {
  // switch (ownProps.match.path) {
  //   case "/workspaces/:workspaceId":
  //     return entities.workspaces[ownProps.match.params.workspaceId].name;
  //   case "/projects/:projectId/board":
  //     return entities.projects[ownProps.match.params.projectId].name;
  //   default:
  //     return "Home";
  // }
  let pathname = ownProps.location.pathname;
  if (pathname.includes("workspaces")) {
    return entities.workspaces[pathname.slice("/workspaces/".length)].name;
  } else {
    return "Home";
  }
}

const mSP = function ({entities, ui}, ownProps) {
  const title = getTopBarTitle(entities, ownProps);
  return {
    title: title,
    sidebarCollapse: ui.sidebarCollapse
  };
};

const mDP = function (dispatch) {
  return {
    logout: () => dispatch(logout()),
    toggleSidebar: () => dispatch(toggleSidebar())
  };
};

export default withRouter(connect(mSP, mDP)(TopBar));