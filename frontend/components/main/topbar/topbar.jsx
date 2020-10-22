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

    return (
      <div id="main-header">
        <div className="sidebar-menu-button">
          <img src={window.chevronCircleRight} alt="sidebar open button" />
        </div>

        <div className="header-icon">
          <span></span>
        </div>

        {/* WorkspaceHeader or HomeHeader or ProjectHeader */}
        <div>
          <div className="header-title">
            {this.props.page}
          </div>
          <nav>

          </nav>
        </div>
      </div>
    )
  }
};