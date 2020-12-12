import React from "react";
import { Link, NavLink } from "react-router-dom";

export default class Workspace extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (document.title !== "azena") { document.title = "azena" };
    // console.log("routed to Workspace page");
    // this.props.payload.workspaces !== {} && this.props.fetchUserWorkspaces();
  }

  render() {
    const { projects, workspaces, users } = this.props.entities;
    const workspaceId = this.props.workspaceId;
    const thisWorkspace = Object.values(workspaces).find(workspace => workspace.id === workspaceId)

    return (
      <div id="workspace">
        <div id="workspace-leftpane">
          <div id="workspace-description">
            <h1>Description</h1>
            <textarea
              // onKeyDown={this.handleKeyDown}
              // onChange={this.handleTitleChange}
              // onBlur={this.handleTitleUpdate}
              // ref={this.titleInput}
              // minLength={this.titleMin}
              // maxLength={this.titleMax}
              // cols={this.titleMax}
              // rows={"1"}
              autoComplete="off" autoCorrect="off" autoCapitalize="off"
              spellCheck="false"
              value={thisWorkspace.description}
            ></textarea>
          </div>
          <div id="workspace-members">
            <h1>Members</h1>
            <div>
              {
                Object.values(users).map((user) => {
                  return (
                    <div>
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