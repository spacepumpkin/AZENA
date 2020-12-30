import React, { useState, useRef, useCallback, useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProject } from '../../actions/project_actions';
import { setCurrentItems, setModal } from '../../actions/ui_actions';

const mSP = function ({ entities, ui, errors }) {
  // const workspaceId = parseInt(ownProps.match.params.workspaceId);
  return {
    projectErrors: errors.projects,
    workspace: entities.workspaces[ui.currentItems.workspaceId]
  }
};

const mDP = function (dispatch) {
  return {
    createProject: (project) => dispatch(createProject(project)),
    setModal: (modalType) => dispatch(setModal(modalType)),
    setCurrentItems: (items) => dispatch(setCurrentItems(items))
  }
};

const ProjectCreateModal = function (props) {
  const {
    workspace,
    // workspaceId,
    // setCurrentWorkspaceId,
    projectErrors,
    createProject,
    setModal,
    setCurrentItems,
    history
  } = props;
  // const [name, setName] = React.useState("");
  // const [description, setDescription] = React.useState("");

  // For checking if name input is blank
  // const nameRef = useRef(null);

  function closeModal() {
    // setCurrentWorkspaceId(-1);
    setModal(null);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const data = new FormData(evt.target);

    createProject({
      name: data.get("name"),
      description: data.get("description"),
      workspaceId: workspace.id
    }).then(({ project }) => {
      history.push(`/projects/${project.id}/list`);
      setCurrentItems({ workspaceId: workspace.id, projectId: project.id });
      setModal(null);
      // setCurrentWorkspaceId(-1);
    }, ({errors}) => {
    });
  }

  // Project errors
  let nameErrors = [], descriptionErrors = [], otherErrors = [];
  if (projectErrors !== undefined || projectErrors.length !== 0) {
    projectErrors.forEach((error) => {
      switch (error.split(" ")[0]) {
        case ("Name"):
          nameErrors.push(error);
          break;
        case ("Description"):
          descriptionErrors.push(error);
          break;
        default:
          otherErrors.push(error);
          break;
      }
    })
  }

  // Trying to autofocus name input with useCallback
  const focusRef = useCallback(inputElm => {
    // debugger // only works with debugger??
    if (inputElm) { inputElm.focus() };
  }, []);


  // Second try with useEffect
  // const focusRef = useRef(null);
  // useEffect(() => {
  //   debugger // only works with debugger??
  //   if (focusRef.current) {
  //     focusRef.current.focus();
  //   }
  // }, []);

  return (
    <div className="basic-modal-wrapper">
      <div className="modal-backdrop"></div>
      <div id="project-form-box">
        <div className="modal-close" onClick={closeModal}><span>Close</span></div>
        <h1>Create a New Project within <span>{workspace.name}</span></h1>
        <form id="project-form" onSubmit={handleSubmit}>
          <label>
            Project Name
              <input type="text" name="name" placeholder="e.g. World Domination" ref={focusRef} />
          </label>
          <div className="error-message">{nameErrors.join(", ")}</div>

          <label>
            Description (optional)
              <textarea name="description" placeholder="Click to add a project description..." ></textarea>
          </label>
          <div className="error-message">{descriptionErrors.join(", ")}</div>

          {/* <button disabled={!nameRef.current || nameRef.current.value === ""}>Create Project</button> */}
          <button>Create Project</button>
          <div className="error-message">{otherErrors.join(", ")}</div>
        </form>
      </div>

    </div>
  )
}

export default withRouter(connect(mSP, mDP)(ProjectCreateModal));