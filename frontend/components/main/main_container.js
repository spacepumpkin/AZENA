// ! Not using this component anymore

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Main from "./main";

// import { fetchUserWorkspaces } from "../../actions/workspace_actions";

const mSP = function (store) {
  return {
    payload: store
  };
};

const mDP = function (dispatch) {
  return {
    // fetchUserWorkspaces: () => dispatch(fetchUserWorkspaces())
  };
};

export default connect(mSP, mDP)(Main);