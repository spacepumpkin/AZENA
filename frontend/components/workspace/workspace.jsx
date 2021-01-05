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
    this.openProjCreateModal = this.openProjCreateModal.bind(this);
    // this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    if (this.props.workspace === undefined) return;
    if (document.title !== this.props.workspace.name) { document.title = this.props.workspace.name };
  }

  componentDidUpdate(prevProps) {
    // Reset title if we changed pages
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

  openProjCreateModal() {
    let items = Object.assign({}, this.props.currentItems, { workspaceId: this.props.workspace.id });
    this.props.setCurrentItems(items);
    this.props.setModal("Project Create");
  }

  render() {
    const { projects, users } = this.props.entities;
    const { description: stateDescription } = this.state;
    const { workspaceId, workspace, members } = this.props;
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
              placeholder={"Click to add a description of the workspace..."}
            ></textarea>
          </div>
          <div id="workspace-members">
            <h1>Members</h1>
            <div>
              {
                members.map((user) => {
                  if (workspace.creatorId === user.id) {
                    return (
                      <div key={`user-${user.id}`} className="workspace-member">
                        <div>{user.username}<span style={{ color: "black" }}> (creator)</span></div>
                        <div>{user.email}</div>
                      </div>
                    )
                  } else {
                    return (
                      <div key={`user-${user.id}`} className="workspace-member">
                        <div>{user.username}</div>
                        <div>{user.email}</div>
                      </div>
                    )
                  }
                })
              }
              <div id="workspace-members-add">
                  <button className="member-button" type="button"
                    // onClick={() => this.setState({ showUserMenu: true })}
                    // onBlur={this.handleMenuBlur}
                    // onKeyDown={this.handleMenuBlur}
                    tabIndex="0"
                  >
                    <div className="plus-button"></div>
                  </button>
                <div>
                  Add Member
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="workspace-projects">
          <h1>Projects</h1>
          {
            Object.values(projects).map((project) => {
              return (
                (project.workspaceId === workspaceId) &&
                <Link to={`/projects/${project.id}/list`} key={`project-${project.id}`}
                  className="sidebar-workspace-project">
                  <span></span>&nbsp;{project.name}
                </Link>
              )
            })
          }
          <button className="create-project-button" onClick={this.openProjCreateModal}>New Project</button>
        </div>
      </div>
    )
  }
}

// recent changes: removed window.currentUser requirement for logout button after making it a protected route