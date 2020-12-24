import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { destroyWorkspace } from '../../actions/workspace_actions';

const mDP = function (dispatch) {
  return {
    destroyWorkspace: (workspaceId) => dispatch(destroyWorkspace(workspaceId))
  }
};

function WorkspaceDeleteModal(props) {

  const { workspace = { id: -1, name: "" }, closeModal, destroyWorkspace, history } = props;

  const deleteWorkspace = function (workspaceId) {
    closeModal();
    destroyWorkspace(workspaceId).then(() => history.push("/home"));
  };

  return (
    <div className="basic-modal-wrapper">
      <div className="modal-backdrop"></div>
      <div id="workspace-delete-modal-box">
        <div className={`modal-close`} onClick={closeModal}><span>Close</span></div>
        <h1>Delete <span>{workspace.name}</span> ?</h1>
        <p>
          <span>All associated projects and tasks</span> will also be deleted. This cannot be undone.
        </p>
        <p>
          Are you sure?
        </p>
        <div className="modal-delete-buttons">
          <button type="button" onClick={() => deleteWorkspace(workspace.id)}>Yes</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </div>

      </div>
    </div>
  )
}

export default withRouter(connect(null, mDP)(WorkspaceDeleteModal));