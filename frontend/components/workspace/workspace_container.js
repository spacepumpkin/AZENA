import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { updateWorkspace, destroyWorkspace } from '../../actions/workspace_actions';
import Workspace from "./workspace";

const mSP = function ({entities}, ownProps) {
  const workspaceId = parseInt(ownProps.match.params.workspaceId);
  const workspace = entities.workspaces[workspaceId];
  const description = (workspace === undefined || workspace.description === null) ? "" : workspace.description;

  return {
    entities: entities,
    workspace: workspace,
    description: description,
    workspaceId: workspaceId
  };
};

const mDP = function (dispatch) {
  return {
    updateWorkspace: (workspace) => dispatch(updateWorkspace(workspace)),
    destroyWorkspace: (workspaceId) => dispatch(destroyWorkspace(workspaceId))
  };
};

export default withRouter(connect(mSP, mDP)(Workspace));