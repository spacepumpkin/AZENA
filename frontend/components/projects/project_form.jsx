import React from 'react';

const ProjectForm = function ({ workspaceId = -1, history }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleClose = () => {
    history && history.goBack();
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("New Project Created: ", name);
  }

  return (
    <div id="project-form-modal">
      <div className="modal-backdrop"></div>
      <div id="project-form-box">
        <div className="modal-close" onClick={handleClose}><span>Close</span></div>
        <h1>Create a New Project</h1>
        <form id="project-form" onSubmit={handleSubmit}>
          <label className={`label-input-focused`} > Project Name
              <input type="text" />
          </label>
          <div className="workspace-error"></div>

          <label> Description
              <textarea></textarea>
          </label>
          <div className="workspace-error"></div>
          <button type="button">Submit</button>
        </form>
      </div>

    </div>
  )
}

export default ProjectForm;