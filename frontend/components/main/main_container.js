import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import UserHome from "./user_home";
import Main from "./main";

const mSP = function (store) {
  // console.log(store);
  return {
  };
};

const mDP = function (dispatch) {
  return {
  };
};

// export default connect(mSP, mDP)(UserHome);
export default connect(mSP, mDP)(Main);