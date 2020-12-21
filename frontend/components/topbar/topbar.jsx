import React from "react";
import { Link } from "react-router-dom";

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      showUserMenu: false,
      titleFlash: false
    }

    // Controlling title blur event
    this.titleInput = React.createRef();
    this.userMenuRef = React.createRef();

    // Title min and max char count
    this.titleMin = 1;
    this.titleMax = 25;

    this.topbarRenderCount = 0;

    this.handleLogout = this.handleLogout.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    // console.log(`mounted Topbar (${this.props.page})`);
  }

  componentDidUpdate(prevProps) {
    // Reset title if we changed pages
    // console.log(`prev title: "${prevProps.title}", new title: "${this.props.title}"`);
    if (prevProps.title !== this.props.title) {
      this.setState({ title: this.props.title, titleFlash: true });
    }
  }

  handleLogout(evt) {
    evt.preventDefault();
    this.props.logout() //.then(() => this.props.history.push("/"));
  }

  // Remove all tabs, new lines + check if we're within allowable char range
  handleTitleChange(evt) {
    // const editedTitle = evt.target.value.replace(/[\r\n\v\t]+/g, '');
    const editedTitle = evt.target.innerText.replace(/[\r\n\v\t]+/g, '');
    // console.log(`evt.target.value: "${evt.target.value}"`)
    // console.log(`old title: "${this.state.title}", new title: "${editedTitle}", length: ${editedTitle.length}, changed?: ${editedTitle !== this.state.title}`);

    // Avoid re-rendering if title hasn't changed
    if (editedTitle === this.state.title) return;
    if (editedTitle.length >= this.titleMin && editedTitle.length <= this.titleMax) this.setState({ title: editedTitle });
  }

  // If edited title differs from original, update in BE
  handleTitleUpdate(evt) {
    const { title: currentTitle, pageType, isCreator } = this.props;

    if (pageType !== "Home" && isCreator && this.state.title !== currentTitle) {
      // console.log(`title has changed from "${currentTitle}" to "${this.state.title}"`);
      const { updateItem, item } = this.props;
      if (item.id !== undefined && item.id !== null) updateItem({ id: item.id, name: this.state.title })
    }
  }

  // Catch any enter presses within title input textarea to defocus instead of adding \n
  handleKeyDown(evt) {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      evt.preventDefault();
      this.titleInput.current.blur();
    }
  }

  render() {
    const { toggleSidebar, sidebarCollapse, pageType, isCreator, title: propsTitle, user } = this.props;
    const { title: stateTitle, showUserMenu, titleFlash } = this.state; // Will change based on route
    // console.log("propsTitle: ", propsTitle, "stateTitle: ", stateTitle);
    const renderedTitle = stateTitle;

    const titleClassName = titleFlash ? ["header-title title-flash"] : ["header-title"];
    if (pageType !== "Home" && isCreator) titleClassName.push("title-editable");

    this.topbarRenderCount += 1;
    console.log("topbar render count: ", this.topbarRenderCount);

    return (
      <div id="topbar">
        {/* <div className="sidebar-menu-button">
          <img onClick={this.props.toggleSidebar} src={window.chevronCircleRight} alt="sidebar open button" />
        </div> */}

        <div id="topbar-main-header">
          <button onClick={toggleSidebar} className={
            `sidebar-menu-button chevron-right ${!sidebarCollapse ? "collapsed" : ""}`
          } type="button" />
          <div className="header-icon">
            <span></span>
          </div>

          {/* WorkspaceHeader or HomeHeader or ProjectHeader */}
          <div className="header-title-wrapper">
            <div className={titleClassName.join(" ")}
              // type="text"
              onKeyDown={this.handleKeyDown}
              onChange={this.handleTitleChange}
              onBlur={this.handleTitleUpdate}
              ref={this.titleInput}
              // minLength={this.titleMin}
              // maxLength={this.titleMax}
              // cols={this.titleMax}
              // rows={"1"}
              autoComplete="off" autoCorrect="off" autoCapitalize="off"
              spellCheck="false"
              // disabled={pageType === "Home" || !isCreator}
              // value=
              onAnimationEnd={() => this.setState({ titleFlash: false })}
              contentEditable={pageType !== "Home" && isCreator}
              suppressContentEditableWarning={true}
            >{renderedTitle}</div>
          </div>
        </div>
        <div id="topbar-user">
          {/* User Settings + TaskSearch + Global Actions */}
          <div id="user-avatar">
            <button id="user-avatar-button" type="button" onClick={() => this.setState({ showUserMenu: !showUserMenu })}>
              {user.username[0].toUpperCase()}
            </button>
            <div id="user-menu-arrow" className={`${showUserMenu ? "show-user-menu" : ""}`}></div>
            <div id="user-menu" className={`${showUserMenu ? "show-user-menu" : ""}`} ref={this.userMenuRef}>
              <div className="user-menu-item" onClick={() => this.setState({ showUserMenu: !showUserMenu })}><Link to="/home">Workspaces</Link></div>
              <div className="user-menu-item" onClick={this.handleLogout}>Log Out</div>
            </div>
          </div>
          {/* <button id="logout-button" type="button" onClick={this.handleLogout}>Log Out</button> */}
        </div>
      </div>
    )
  }
};