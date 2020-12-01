import React from "react";

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
  }

  componentDidMount() {
    // console.log(`mounted Topbar (${this.props.page})`);
  }

  handleLogout(evt) {
    evt.preventDefault();
    this.props.logout() //.then(() => this.props.history.push("/"));
  }

  handleTitleChange(evt) {
    console.log("current title: ", evt.target.value);
    if (evt.target.value.length > 1) this.setState({ title: evt.target.value });
  }

  handleTitleUpdate(evt) {
    if (evt.target.value !== this.props.title) {
      debugger
      console.log("title has changed from", this.props.title, "to", evt.target.value);
    }
  }

  render() {
    const { toggleSidebar, sidebarCollapse } = this.props;
    const { title } = this.state;

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
            <textarea className="header-title"
              onChange={this.handleTitleChange}
              onBlur={this.handleTitleUpdate}
              minLength={"2"}
              maxLength={"25"}
              cols={"25"}
              rows={"1"}
              autoComplete="off" autoCorrect="off" autoCapitalize="off"
              spellCheck="false"
              value={title}
            >
            </textarea>
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