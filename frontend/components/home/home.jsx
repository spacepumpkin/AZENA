import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plusMenuWorkspaceId: -1
    }
    this.showPlusMenu = this.showPlusMenu.bind(this);
  }

  componentDidMount() {
    if (document.title !== "azena") { document.title = "azena" };
  }

  showPlusMenu(workspaceId) {
    return (evt) => {
      if (this.state.plusMenuWorkspaceId === workspaceId) {
        this.setState({ plusMenuWorkspaceId: -1 });
      } else {
        this.setState({ plusMenuWorkspaceId: workspaceId });
      }
    }
  }

  render() {
    const { entities, session } = this.props.reduxState;
    const { users, workspaces, projects } = entities;

    const { plusMenuWorkspaceId } = this.state;

    let that = this;
    return (
      <div id="home">
        {/* <div id="mainbox"> */}
        {/* Hello I'm home! */}
        <div>
          <h1>Your Workspaces</h1>
          {
            Object.values(workspaces).map((workspace) => {
              const showMenu = (workspace.id === plusMenuWorkspaceId);

              return (

                <div className="home-workspace-box" key={`workspace-${workspace.id}`}>

                  <div className="workspace-title-wrapper">
                    <Link to={`/workspaces/${workspace.id}`} className="home-workspace-title">
                      {workspace.name}
                    </Link>
                    <button className={`workspace-plus ${(showMenu) ? "rotated-plus" : ""}`}
                      onClick={this.showPlusMenu(workspace.id)} type="button" />
                  </div>

                  <div className="home-workspace-projects">
                    {
                      Object.values(projects).map((project) => {
                        return (
                          (project.workspaceId === workspace.id) &&
                          <Link to={`/projects/${project.id}/list`}
                            key={`project-${project.id}`}
                            className="home-workspace-project">
                            <span></span>&nbsp;{project.name}
                          </Link>
                        )
                      })
                    }
                  </div>

                </div>
              )
            })
          }

        </div>
      </div>
      // </div>
    )
  }
}

// recent changes: removed window.currentUser requirement for logout button after making it a protected route