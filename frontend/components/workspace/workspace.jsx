import React from "react";
import { Link, NavLink } from "react-router-dom";

export default class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description,
      // editMode: false
    };
    // Controlling description blur event
    this.descriptionInput = React.createRef();

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    // this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    if (this.props.workspace === undefined) return;
    if (document.title !== this.props.workspace.name) { document.title = this.props.workspace.name };
  }

  componentDidUpdate(prevProps) {
    // Reset title if we changed pages
    // console.log(`prev title: "${prevProps.title}", new title: "${this.props.title}"`);
    if (this.props.workspace === undefined) return;
    if (document.title !== this.props.workspace.name) { document.title = this.props.workspace.name };
    if (prevProps.description !== this.props.description) {
      this.setState({ description: this.props.description })
    }
  }

  componentWillUnmount() {
    this.props.receiveWorkspaceErrors([]);
  }

  // Update workspace description in local state
  handleDescriptionChange(evt) {
    const editedDescription = evt.target.value.replace(/[\t]+/g, '');

    const { description: currentDescription } = this.state;
    if (editedDescription === currentDescription) return;
    this.setState({ description: editedDescription });
  }

  // Update workspace description in backend when blurred away, if it's changed
  handleDescriptionUpdate(evt) {
    const { description: stateDescription } = this.state;
    const { description: propsDescription, workspaceId, updateWorkspace } = this.props;

    if (stateDescription !== propsDescription) {
      console.log(`description has changed from "${propsDescription}" to "${stateDescription}"`);
      updateWorkspace({ id: workspaceId, description: stateDescription });
    }
  }

  // Catch any enter presses within description input textarea to defocus instead of adding \n
  handleKeyDown(evt) {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      evt.preventDefault();
      this.descriptionInput.current.blur();
    }
  }

  // Update description in state when focused on a new workspace's description textarea
  // handleFocus(evt) {
  //   if (this.state.editMode === false) this.setState({ description: evt.target.value, editMode: true });
  // }

  render() {
    const { projects, users } = this.props.entities;
    const { description: stateDescription } = this.state;
    const { workspaceId, workspace } = this.props;
    if (typeof workspaceId !== 'number' || workspace === undefined) return null;

    return (
      <div id="workspace">
        <div id="workspace-leftpane">
          <div id="workspace-description">
            <h1>Description</h1>
            <textarea
              // onFocus={this.handleFocus}
              // onKeyDown={this.handleKeyDown}
              onChange={this.handleDescriptionChange}
              onBlur={this.handleDescriptionUpdate}
              ref={this.descriptionInput}
              // minLength={this.titleMin}
              // maxLength={this.titleMax}
              // cols={this.titleMax}
              // rows={"1"}
              autoComplete="off" autoCorrect="off" autoCapitalize="off"
              spellCheck="false"
              value={stateDescription}
              placeholder={"Click to add a description of your workspace..."}
            ></textarea>
          </div>
          <div id="workspace-members">
            <h1>Members</h1>
            <div>
              {
                Object.values(users).map((user) => {
                  return (
                    <div key={`user-${user.id}`}>
                      <div style={{ fontWeight: "bold" }}>{user.username}</div>
                      <div style={{ color: "gray" }}>{user.email}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="sidebar-workspace-projects">
          <h1>Projects</h1>
          {
            Object.values(projects).map((project) => {
              return (
                (project.workspaceId === workspaceId) &&
                <Link to={`/projects/${project.id}/list`} key={`project-${project.id}`} className="sidebar-workspace-project"><span></span>&nbsp;{project.name}</Link>
              )
            })
          }
          <Link to={`/projects/new`}>New Project</Link>
        </div>
      </div>
    )
  }
}

// recent changes: removed window.currentUser requirement for logout button after making it a protected route