import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import UserHome from "./user_home";
import Main from "./main";

import { fetchUserWorkspaces } from "../../actions/workspace_actions";

const mSP = function (store) {
  // console.log(store);
  return {
    payload: store
  };
};

const mDP = function (dispatch) {
  return {
    fetchUserWorkspaces: () => dispatch(fetchUserWorkspaces())
  };
};

// export default connect(mSP, mDP)(UserHome);
export default connect(mSP, mDP)(Main);