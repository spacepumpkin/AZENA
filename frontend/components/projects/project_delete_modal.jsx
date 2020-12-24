import React from 'react';
import { connect } from 'react-redux';
import { destroyProject } from '../../actions/project_actions';
// import { withRouter } from 'react-router-dom';


const mDP = function (dispatch) {
  return {
    destroyProject: (projectId) => dispatch(destroyProject(projectId))
  }
};

function ProjectDeleteModal(props) {

  const { project = { id: -1, name: "" }, closeModal, destroyProject } = props;

  const deleteProject = function (projectId) {
    closeModal();
    destroyProject(projectId).then(() => console.log(`Project #${projectId} destroyed`));
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

// export default withRouter(connect(null, mDP)(ProjectDeleteModal));
export default connect(null, mDP)(ProjectDeleteModal);