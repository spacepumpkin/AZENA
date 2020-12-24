import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { destroyProject } from '../../actions/project_actions';
import { setCurrentItems, setModal } from '../../actions/ui_actions';

const mSP = function ({ entities, ui }) {
  return {
    project: entities.projects[ui.items.projectId],
    currentItems: ui.items
  };
};

const mDP = function (dispatch) {
  return {
    destroyProject: (projectId) => dispatch(destroyProject(projectId)),
    setModal: (modalType) => dispatch(setModal(modalType)),
    setCurrentItems: (items) => dispatch(setCurrentItems(items))
  };
};

function ProjectDeleteModal(props) {

  // const { project = { id: -1, name: "" }, closeModal, destroyProject } = props;
  const { project = { id: -1, name: "" }, currentItems, setCurrentItems, setModal, destroyProject, match } = props;

  const closeModal = function () {
    let items = Object.assign({}, currentItems, { projectId: -1 });
    setCurrentItems(items);
    setModal(null);
  };

  const deleteProject = function (projectId) {
    closeModal();
    destroyProject(projectId).then(() => {
      console.log(`Project #${projectId} destroyed`);
      console.log(`Currently at ${match.path}`);
      debugger
    });
  };

  return (
    <div className="basic-modal-wrapper">
      <div className="modal-backdrop"></div>
      <div id="project-delete-modal-box">
        <div className={`modal-close`} onClick={closeModal}><span>Close</span></div>
        <h1>Delete <span>{project.name}</span> ?</h1>
        <p>
          <span>All associated tasks</span> will also be deleted. This cannot be undone.
        </p>
        <p>
          Are you sure?
        </p>
        <div className="modal-delete-buttons">
          <button type="button" onClick={() => deleteProject(project.id)}>Yes</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </div>

      </div>
    </div>
  )
}

// export default connect(null, mDP)(ProjectDeleteModal);
// export default connect(mSP, mDP)(ProjectDeleteModal);
export default withRouter(connect(mSP, mDP)(ProjectDeleteModal));