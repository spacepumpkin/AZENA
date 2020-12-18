import React from 'react';

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this._nullState = {
      name: "",
      description: ""
    }
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.history && this.props.history.goBack();
  }

  handleSubmit(evt) {
    evt.preventDefault();

  }

  render() {
    return (
      <div id="project-form-modal-wrapper">
        <div className="modal-backdrop"></div>
        <div id="project-form-box">
          <div className="modal-close" onClick={this.handleClose}><span>Close</span></div>
          <h1>Create a New Project</h1>
          <form id="project-form" onSubmit={this.handleSubmit}>
            <label> Project Name
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
}

export default ProjectForm;