import React from 'react';

const ProjectForm = function ({ workspaceId, setCurrentWorkspaceId }) {
  // const [name, setName] = React.useState("");
  // const [description, setDescription] = React.useState("");

  const handleClose = () => {
    // history && history.goBack();
    setCurrentWorkspaceId(-1);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData(evt.target); 
    console.log(data);
    for (let [inputName, inputValue] of data.entries()) {
      console.log(`${inputName}: "${inputValue}"`);
    }
    // console.log("New Project Created: ", name);
  }

  return (
    <div id="project-form-modal">
      <div className="modal-backdrop"></div>
      <div id="project-form-box">
        <div className="modal-close" onClick={handleClose}><span>Close</span></div>
        <h1>Create a New Project</h1>
        <form id="project-form" onSubmit={handleSubmit}>
          <label className={`label-input-focused`} > Project Name
              <input type="text" name="name" />
          </label>
          <div className="workspace-error"></div>

          <label> Description
              <textarea name="description" ></textarea>
          </label>
          <div className="workspace-error"></div>

          <button>Create Project</button>
        </form>
      </div>

    </div>
  )
}

export default ProjectForm;