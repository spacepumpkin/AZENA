import React from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapse: false
    }
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  componentDidMount() {
    console.log(`mounted Sidebar`);
  }

  toggleSidebar() {
    this.setState({sidebarCollapse: !this.state.sidebarCollapse});
  }

  render() {
    const { workspaces } = this.props;
    return (
      <div id="sidebar" className={this.state.sidebarCollapse ? "collapsed" : ""} >
        <div id="sidebar-top">
          <div className="logo">
            <img src={window.logoMainURL} alt="azena logo" />
          </div>
          <div className="sidebar-menu-button">
            <img onClick={this.toggleSidebar} src={window.chevronCircleLeft} alt="sidebar close button" />
          </div>
        </div>
        <div id="sidebar-links">
          <Link to="/home"><img className="sidebar-icon" src={window.homeIcon} alt="homeicon" />&nbsp; Home </Link>
          <Link to="/home"><img className="sidebar-icon" src={window.checkCircle} alt="taskicon" />&nbsp; My Tasks </Link>
        </div>
        <div id="sidebar-workspaces">
          {/* for each user's workspace, create workspace title (link to workspace page) + div dropdown */}
          {/* for each workspace div, add list of project links */}
          {(workspaces !== undefined || workspaces.length !== 0) &&
            Object.values(workspaces).map((workspace) => {
              return (
                <div className="sidebar-workspace-box" key={`workspace-${workspace.id}`}>
                  <Link to={`/workspaces/${workspace.id}`} className="sidebar-workspace-title">{workspace.name}</Link>

                  <div className="sidebar-workspace-projects">
                    <Link to="/home" className="sidebar-workspace-project"> <span></span>&nbsp; Project 1</Link>
                    <Link to="/home" className="sidebar-workspace-project"> <span></span>&nbsp; Project 2</Link>
                  </div>
                </div>
              )

            }
            )
          }
        {/* <Link to="/home" className="sidebar-workspace-title">Workspace 1</Link>
          <div className="sidebar-workspace-box">
            <div className="sidebar-workspace-projects">
              <Link to="/home" className="sidebar-workspace-project"> <span></span>&nbsp; Project 1</Link>
              <Link to="/home" className="sidebar-workspace-project"> <span></span>&nbsp; Project 2</Link>
              <Link to="/home" className="sidebar-workspace-project"> <span></span>&nbsp; Project 3</Link>
            </div>
            <div id="sidebar-bottom">
              <p>
                Invite your team and start collaborating!
              </p>
              <button type="button">Invite to Asana</button>
            </div>
          </div> */}

      </div>
        <div id="sidebar-bottom">
          <p>Invite your team and start collaborating!</p>
          <button type="button">Invite to Asana</button>
        </div>
      </div >
    )
  }
}