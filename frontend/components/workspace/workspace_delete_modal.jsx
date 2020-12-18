import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mDP = function (dispatch) {
  return {
    destroyWorkspace: (workspaceId) => dispatch(destroyWorkspace(workspaceId))
  }
};

function WorkspaceDeleteModal(props) {

  const { workspace = { id: -1, name: "" }, closeModal, destroyWorkspace } = props;

  debugger

  const deleteWorkspace = function (workspaceId) {
    closeModal();
    destroyWorkspace(workspaceId);
  };

  return (
    <div className="workspace-modal">
      <div className="modal-backdrop"></div>
      <div id="workspace-delete-modal-box">
        <div className={`modal-close`} onClick={closeModal}><span>Close</span></div>
        <h1>Delete <span>{workspace.name}</span> ?</h1>
        <p>
          If you delete this workspace, <span>all associated projects and tasks</span> will also be deleted and other members
          will no longer be able to access it.
        </p>
        <p>
          Are you sure?
        </p>
        <div className="modal-buttons">
          <button type="button" onClick={() => deleteWorkspace(workspace.id)}>Yes</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </div>

      </div>
    </div>
  )
}

export default withRouter(connect(null, mDP)(WorkspaceDeleteModal));