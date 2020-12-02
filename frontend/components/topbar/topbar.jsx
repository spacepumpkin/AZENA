import React from "react";

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title
    }

    this.titleInput = React.createRef();

    this.handleLogout = this.handleLogout.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    // console.log(`mounted Topbar (${this.props.page})`);
    // document.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    // document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleLogout(evt) {
    evt.preventDefault();
    this.props.logout() //.then(() => this.props.history.push("/"));
  }

  handleTitleChange(evt) {
    // Remove all tabs, new lines
    const val = evt.target.value.replace(/[\r\n\v\t]+/g, '');
    console.log(`current title: "${val}", length: ${val.length}, changed?: ${val === this.state.title}`);
    // Avoid re-rendering if title hasn't changed
    if (val === this.state.title) return;
    // debugger
    if (val.length >= 1) this.setState({ title: val });
  }

  handleTitleUpdate(evt) {
    if (evt.target.value !== this.props.title) {
    // if (evt.target.value !== this.state.title) {
      console.log(`title has changed from "${this.props.title}" to "${evt.target.value}"`);
      debugger
    }
  }

  handleKeyDown(evt) {
    // Catch any enter presses within title input textarea to defocus instead of adding \n
    if (evt.key === "Enter" || evt.keyCode === 13) {
      evt.preventDefault();
      this.titleInput.current.blur();
      console.log("Moved away from title input");
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
              onKeyDown={this.handleKeyDown}
              ref={this.titleInput}
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