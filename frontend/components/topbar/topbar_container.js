import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopBar from "./topbar";

import { logout } from "../../actions/session_actions";
import { toggleSidebar } from "../../actions/ui_actions.js";

function getTopBarTitle(path) {
  // if (workspaces !== undefined || workspaces.length !== 0) {
  switch (path) {
    case "/workspaces/:workspaceId":
      return workspaces[that.props.match.params.workspaceId].name;
    default:
      return "Home";
  }
}

const mSP = function (store, ownProps) {
  const title = getTopBarTitle(ownProps.match.path);
  
  return {
    title: "Temp Title"
  };
};

const mDP = function (dispatch) {
  return {
    logout: () => dispatch(logout()),
    toggleSidebar: () => dispatch(toggleSidebar())
  };
};

export default withRouter(connect(mSP, mDP)(TopBar));