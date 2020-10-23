import React from "react";
import { Link, NavLink } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (document.title !== "azena") { document.title = "azena" };
    console.log("routed to Workspace page");
    // this.props.payload.workspaces !== {} && this.props.fetchUserWorkspaces();
  }

  render() {
    const { users, workspaces, projects } = this.props.entities;
    const workspaceId = this.props.workspaceId;

    // debugger
    return (
      <div id="workspace-page">
        <div id="mainbox">
          <div className="sidebar-workspace-projects">
            <h1>Projects</h1>
            {
              Object.values(projects).map((project) => {
                return (
                  (project.workspaceId === workspaceId) &&
                  <Link to="/home" key={`project-${project.id}`} className="sidebar-workspace-project"><span></span>&nbsp;{project.name}</Link>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

// recent changes: removed window.currentUser requirement for logout button after making it a protected route