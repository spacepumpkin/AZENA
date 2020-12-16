import { connect } from 'react-redux';
import WorkspaceModal from './workspace_modal';

import { createWorkspace, receiveWorkspaceErrors } from '../../actions/workspace_actions';

const mSP = function ({entities, errors, session}) {
  return {
    workspaceErrors: errors.workspaces,
    currentUser: entities.users[session.id]
  }
};

const mDP = function (dispatch) {
  return {
    createWorkspace: (workspace) => dispatch(createWorkspace(workspace)),
    receiveWorkspaceErrors: (errors) => dispatch(receiveWorkspaceErrors(errors))
  }
};

export default connect(mSP, mDP)(WorkspaceModal);