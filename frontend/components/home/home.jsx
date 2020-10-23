import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (document.title !== "azena") { document.title = "azena" };
    console.log("routed to Home page");
    // this.props.payload.workspaces !== {} && this.props.fetchUserWorkspaces();
  }

  render() {
    const {entities, session} = this.props.payload;
    const { users, workspaces, projects } = entities;

    let that = this;
    return (
      <div id="home">
        <div id="mainbox">
          {/* Hello I'm home! */}
          <div>
            <h1>Your Workspaces</h1>
            {
              Object.values(workspaces).map((workspace) => {
                return (
                  <div className="sidebar-workspace-box" key={`workspace-${workspace.id}`}>
                    <div className="sidebar-workspace-title-wrapper">
                      <Link to={`/workspaces/${workspace.id}`} className="sidebar-workspace-title">{workspace.name}</Link>
                      <button className={`sidebar-workspace-plus`} type="button" />
                    </div>
                    <div className="sidebar-workspace-projects">
                      {
                        Object.values(projects).map((project) => {
                          return (
                            (project.workspaceId === workspace.id) &&
                            <Link to="/home" key={`project-${project.id}`} className="sidebar-workspace-project"><span></span>&nbsp;{project.name}</Link>
                          )
                        })
                      }
                      {/* <Link to="/home" className="sidebar-workspace-project"> <span></span>&nbsp; Project 1</Link>
                    <Link to="/home" className="sidebar-workspace-project"> <span></span>&nbsp; Project 2</Link> */}
                    </div>
                  </div>
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