import React from 'react';

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="project-form-modal-wrapper">
        <div id="project-form-box">

          <h1>Create a New Project</h1>
          <form id="project-form" action="">
            <label> Project Name
          <input type="text" />
            </label>
            <label> Description
          <textarea></textarea>
            </label>
            <label> Description
          <textarea></textarea>
            </label>
            <button type="button">Submit</button>
          </form>
        </div>

      </div>
    )
  }
}

export default ProjectForm;