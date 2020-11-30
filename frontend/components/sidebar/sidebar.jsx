import React from "react";
import { Link, NavLink } from "react-router-dom";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeWorkspaceId: props.workspaces ? Object.keys(props.workspaces)[0] : -1,
      plusMenuWorkspaceId: -1
    }
    this.showPlusMenu = this.showPlusMenu.bind(this);
  }

  componentDidMount() {
    // console.log(`mounted Sidebar`);
  }

  showPlusMenu(workspaceId) {
    return (e) => {
      if (this.state.plusMenuWorkspaceId === workspaceId) {
        this.setState({ plusMenuWorkspaceId: -1 })
      } else {
        this.setState({ plusMenuWorkspaceId: workspaceId })
      }
    }
  }

  showProjects(workspaceId) {
    return (e) => {
      // if (this.state.activeWorkspaceId === workspaceId) {
      //   this.setState({ activeWorkspaceId: -1 })
      // } else {
        this.setState({ activeWorkspaceId: workspaceId })
      // }
    }
  }

  render() {
    const { workspaces = {}, projects = {}, toggleSidebar, sidebarCollapse } = this.props;

    return (
      <div id="sidebar" className={`${sidebarCollapse ? "collapsed" : ""}`} >
        <div id="sidebar-top">
          <Link id="sidebar-logo" to="/home" > <img src={window.logoMainURL} /> </Link>
          <button onClick={toggleSidebar} className={`sidebar-menu-button chevron-left`} type="button" />
        </div>
        <div id="sidebar-links">
          <Link to="/home"><img className="sidebar-icon" src={window.homeIcon} alt="homeicon" />&nbsp; Home </Link>
          <Link to="/home"><img className="sidebar-icon" src={window.checkCircle} alt="taskicon" />&nbsp; My Tasks </Link>
        </div>
        <div id="sidebar-workspaces">
          {/* for each user's workspace, create workspace title (link to workspace page) + div dropdown */}
          {/* for each workspace div, add list of project links */}
          <h1>My Workspaces</h1>
          {
            Object.values(workspaces).map((workspace) => {
              return (
                <div className="sidebar-workspace-box" key={`workspace-${workspace.id}`}>
                  <div className="sidebar-workspace-title-wrapper">
                    <NavLink activeClassName="selected-primary"
                      to={`/workspaces/${workspace.id}`}
                      className="sidebar-workspace-title"
                      onClick={this.showProjects(workspace.id)}
                    >
                      {workspace.name}
                    </NavLink>
                    <button className={`sidebar-workspace-plus`} onClick={this.showPlusMenu(workspace.id)} type="button" />
                    <div className={`sidebar-workspace-plus-menu ${(this.state.plusMenuWorkspaceId === workspace.id) ? "show-menu" : ""}`}>
                      <Link to={`/projects/new`}>Create New Project</Link>
                    </div>
                  </div>
                  <div className="sidebar-workspace-projects">
                    {
                      (this.state.activeWorkspaceId === workspace.id) &&
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
            }
            )
          }

        </div>
        <div id="sidebar-bottom">
          <p>Invite your team and start collaborating!</p>
          <button type="button">Invite to Asana</button>
        </div>
      </div >
    )
  }
}