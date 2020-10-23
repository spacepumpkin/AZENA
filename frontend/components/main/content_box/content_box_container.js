import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ContentBox from "./content_box";

const mSP = function (store) {
  return {
    payload: store
  };
};

const mDP = function (dispatch) {
  return {

  };
};

export default withRouter(connect(mSP, mDP)(ContentBox));