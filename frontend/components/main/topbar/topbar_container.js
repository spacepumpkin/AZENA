import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopBar from "./topbar";

import { logout } from "../../../actions/session_actions";


function getTopBarTitle (path) {
  
}


const mSP = function (store, ownProps) {
  // if ownProps.ownProps.match.params[:workspaceId]

  return {
    
  };
};

const mDP = function (dispatch) {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(connect(mSP, mDP)(TopBar));