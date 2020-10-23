import React from "react";

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    console.log(`mounted Topbar (${this.props.page})`);
  }

  handleLogout(evt) {
    evt.preventDefault();
    this.props.logout() //.then(() => this.props.history.push("/"));
  }

  render() {
    const { title, toggleSidebar, sidebarCollapse } = this.props;

    return (
      <div id="topbar">
        {/* <div className="sidebar-menu-button">
          <img onClick={this.props.toggleSidebar} src={window.chevronCircleRight} alt="sidebar open button" />
        </div> */}
        <button onClick={toggleSidebar} className={
          `sidebar-menu-button chevron-right ${!sidebarCollapse ? "collapsed" : ""}`
          } type="button" />
        <div id="topbar-main-header">
          <div className="header-icon">
            <span></span>
          </div>

          {/* WorkspaceHeader or HomeHeader or ProjectHeader */}
          <div className="header-title-wrapper">
            <div className="header-title"> {title} </div>
          </div>
        </div>
        <div id="topbar-user">
          {/* User Settings + TaskSearch + Global Actions */}
          <button id="logout-button" type="button" onClick={this.handleLogout}>Log Out</button>
        </div>
      </div>
    )
  }
};