import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import Workspace from "./workspace";

const mSP = function ({entities}, ownProps) {
  return {
    entities: entities,
    workspaceId: parseInt(ownProps.match.params.workspaceId)
  };
};

const mDP = function (dispatch) {
  return {

  };
};

export default withRouter(connect(mSP, mDP)(Workspace));