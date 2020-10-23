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
    const { topbarTitle } = this.props;
    
    return (
      <div id="main-header">
        <div className="sidebar-menu-button">
          <img onClick={this.props.toggleSidebar} src={window.chevronCircleRight} alt="sidebar open button" />
        </div>

        <div className="header-icon">
          <span></span>
        </div>

        {/* WorkspaceHeader or HomeHeader or ProjectHeader */}
        <div>
          <div className="header-title">
            {topbarTitle}
          </div>
          <nav>

          </nav>
        </div>
      </div>
    )
  }
};