import React, { useState, useRef } from 'react';

const ProjectForm = function (props) {
  const {
    workspaceId,
    setCurrentWorkspaceId,
    projectErrors,
    createProject,
    history
  } = props;
  // const [name, setName] = React.useState("");
  // const [description, setDescription] = React.useState("");

  // For checking if name input is blank
  // const nameRef = useRef(null);

  // function handleFocus(inputId) {
  //   return (evt) => {
  //     activeInput(inputId);
  //   }
  // }

  function handleClose() {
    setCurrentWorkspaceId(-1);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const data = new FormData(evt.target);
    for (let [inputName, inputValue] of data.entries()) {
      console.log(`${inputName}: "${inputValue}"`);
    }
    createProject({
      name: data.get("name"),
      description: data.get("description"),
      workspaceId: workspaceId
    }).then(({ project }) => {
      history.push(`/projects/${project.id}/list`)
      setCurrentWorkspaceId(-1);
    }, ({errors}) => {
      console.log("Project has errors: ", errors);
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

  return (
    <div id="project-form-modal">
      <div className="modal-backdrop"></div>
      <div id="project-form-box">
        <div className="modal-close" onClick={handleClose}><span>Close</span></div>
        <h1>Create a New Project</h1>
        <form id="project-form" onSubmit={handleSubmit}>
          <label>
            Project Name
              <input type="text" name="name" />
          </label>
          <div className="error-message">{nameErrors.join(", ")}</div>

          <label>
            Description
              <textarea name="description"></textarea>
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

export default ProjectForm;