import React from "react";

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapse: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  componentDidMount() {
    console.log(`mounted Topbar (${this.props.page})`);
  }

  handleLogout(evt) {
    evt.preventDefault();
    this.props.logout() //.then(() => this.props.history.push("/"));
  }

  toggleSidebar() {
    this.setState({ sidebarCollapse: !sidebarCollapse });
  }

  render() {

    return (
      <div id="main-header">
        <div className="sidebar-menu-button">
          <img onClick={this.toggleSidebar} src={window.chevronCircleRight} alt="sidebar open button" />
        </div>

        <div className="header-icon">
          <span></span>
        </div>

        {/* WorkspaceHeader or HomeHeader or ProjectHeader */}
        <div>
          <div className="header-title">
            {this.props.title}
          </div>
          <nav>

          </nav>
        </div>
      </div>
    )
  }
};