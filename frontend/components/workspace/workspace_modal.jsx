import React from 'react';

class WorkspaceModal extends React.Component {
  constructor(props) {
    super(props);
    this._nullState = {
      name: "",
      description: ""
    };
    this.state = Object.assign({}, this._nullState);

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return (evt) => {
      this.setState({ [field]: evt.currentTarget.value })
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();

  }

  render() {
    // debugger
    const { workspaceErrors } = this.props;
    let nameErrors = [], descriptionErrors = [], otherErrors = [];
    if (workspaceErrors !== undefined || workspaceErrors.length !== 0) {
      workspaceErrors.forEach((error) => {
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
      <div id="workspace-modal">
        <div id="workspace-modal-backdrop">
          <div>

          </div>
        </div>
        <div id="workspace-modal-box">
          <div id="workspace-modal-top">
            <h1>Create Your New Workspace</h1>
            <div id="workspace-modal-close"><span>Close</span></div>
          </div>
          <form id="workspace-modal-form" onSubmit={this.handleSubmit}>
            <label htmlFor={"workspace-modal-name"}>Workspace Name</label>
            <input id="workspace-modal-name" type="text"
              placeholder={"My Brand New Workspace..."}
              value={this.state.name}
              onChange={this.handleChange("name")} />
            <div className="workspace-error">{nameErrors.join(", ")}</div>

            <label htmlFor={"workspace-modal-description"}>Description</label>
            <textarea id="workspace-modal-description"
              placeholder={"Click to add a description of your workspace..."}
              value={this.state.description}
              onChange={this.handleChange("description")}></textarea>
            <div className="workspace-error">{descriptionErrors.join(", ")}</div>

            <button id="workspace-modal-submit">Create Workspace</button>
          </form>
        </div>
      </div>
    )
  }
}

export default WorkspaceModal;