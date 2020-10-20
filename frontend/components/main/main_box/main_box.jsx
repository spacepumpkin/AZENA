import React from "react";


export default class MainBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(evt) {
    evt.preventDefault();
    this.props.logout() //.then(() => this.props.history.push("/"));
  }

  render() {

    return (
      <div id="mainbox">
        <div id="topbar">
          <div id="main-header">
            <div className="sidebar-menu-button">
              <img src={window.chevronCircleRight} alt="sidebar open button"/>
            </div>
            {/* WorkspaceHeader or HomeHeader or ProjectHeader */}
            <div>
              <div>
                Workspace 
              </div> 
              <nav>

              </nav>
            </div>
          </div>
          <div id="user-header">
            {/* User Settings + TaskSearch + Global Actions */}
            <button type="button" onClick={this.handleLogout}>Log Out</button>
          </div>
        </div>
        <div id="main-content-wrapper">
          <h1>&#x2692; {this.props.page} page under construction &#x2692;</h1>
          {/* WorkspaceBox or HomeBox or ProjectHeader or UserBox */}
        </div>
      </div>
    )
  }
};