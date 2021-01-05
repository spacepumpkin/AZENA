import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { updateWorkspace, destroyWorkspace, receiveWorkspaceErrors } from '../../actions/workspace_actions';
import { setCurrentItems, setModal } from '../../actions/ui_actions'
import Workspace from "./workspace";

const mSP = function ({ entities, ui }, ownProps) {
  const workspaceId = parseInt(ownProps.match.params.workspaceId);
  const workspace = entities.workspaces[workspaceId];
  const description = (workspace === undefined || workspace.description === null) ? "" : workspace.description;

  const workspaceMembers = [];
  const users = entities.users;
  const usersWorkspaces = entities.usersWorkspaces;
  for (let id in usersWorkspaces) {
    if (usersWorkspaces[id].workspaceId === workspaceId) {
      workspaceMembers.push(users[usersWorkspaces[id].userId]);
    }
  }

  return {
    entities: entities,
    members: workspaceMembers,
    workspace: workspace,
    description: description,
    workspaceId: workspaceId,
    currentItems: ui.currentItems
  };
};

const mDP = function (dispatch) {
  return {
    updateWorkspace: (workspace) => dispatch(updateWorkspace(workspace)),
    destroyWorkspace: (workspaceId) => dispatch(destroyWorkspace(workspaceId)),
    receiveWorkspaceErrors: (errors) => dispatch(receiveWorkspaceErrors(errors)),
    setCurrentItems: (items) => dispatch(setCurrentItems(items)),
    setModal: (modalType) => dispatch(setModal(modalType))
  };
};

export default withRouter(connect(mSP, mDP)(Workspace));