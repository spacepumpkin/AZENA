import React from "react";
import { Link } from "react-router-dom";

import WorkspaceDeleteModal from '../workspace/workspace_delete_modal';
import ProjectDeleteModal from '../projects/project_delete_modal';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      showTitleMenu: false,
      showUserMenu: false,
      titleFlash: false,
      currentModal: null
    }

    // Controlling title blur event
    this.titleInput = React.createRef();
    this.userMenuRef = React.createRef();
    this.titleMenuRef = React.createRef();

    // Title min and max char count
    this.titleMin = 1;
    this.titleMax = 25;

    this.topbarRenderCount = 0;

    this.handleLogout = this.handleLogout.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMenuBlur = this.handleMenuBlur.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    const editedTitle = evt.target.value.replace(/[\r\n\v\t]+/g, '');
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

  handleMenuBlur(evt) {
    // Will close the title menu and/or user menu dropdowns if we blur away or press Esc
    if (this.state.showUserMenu || this.state.showTitleMenu) {
      if (evt.nativeEvent.type === "blur") {
        if (!evt.relatedTarget ||
          !this.userMenuRef.current.contains(evt.relatedTarget) ||
          !this.titleMenuRef.current.contains(evt.relatedTarget) ||
          evt.relatedTarget.id !== "user-avatar-button" ||
          evt.relatedTarget.id !== "title-menu-button") {

          this.setState({ showUserMenu: false, showTitleMenu: false });
        }
      } else if (evt.nativeEvent.type === "keydown") {
        if (evt.key === "Escape") {

          this.setState({ showUserMenu: false, showTitleMenu: false });
        }
      }
    }
  }

  openModal(modalType) {
    return (evt) => {
      this.setState({ currentModal: modalType, showTitleMenu: false });
    }
  }

  closeModal() {
    this.setState({ currentModal: null });
  }

  render() {
    const {
      toggleSidebar,
      sidebarCollapse,
      pageType,
      isCreator,
      title: propsTitle,
      item,
      user,
      setCurrentWorkspaceId
    } = this.props;
    const { title: stateTitle, showUserMenu, showTitleMenu, titleFlash } = this.state; // Will change based on route
    const renderedTitle = stateTitle;

    // Adjusting class of title depending on whether it's editable
    const titleClassName = titleFlash ? ["header-title title-flash"] : ["header-title"];
    if (pageType !== "Home" && isCreator) titleClassName.push("title-editable");

    // Counting Renders
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

          {pageType !== "Home" &&
            <div className="header-icon">
              <button id="title-menu-button" type="button"
                onClick={() => this.setState({ showTitleMenu: !showTitleMenu })}
                onBlur={this.handleMenuBlur}
                onKeyDown={this.handleMenuBlur}
              ></button>
              {/* <div id="user-menu-arrow" className={`${showUserMenu ? "show-sliding-menu" : ""}`}></div> */}
              <div className={`title-sliding-menu${showTitleMenu ? " show-sliding-menu" : ""}`} ref={this.titleMenuRef}>
                {pageType === "Workspace" &&
                  <>
                    <div className="sliding-menu-item" onClick={() => setCurrentWorkspaceId(item.id)}>Create Project</div>
                    <div className="sliding-menu-item" onClick={this.openModal("Workspace Delete")}>Delete Workspace</div>
                  </>
                }
                {pageType === "Project" &&
                  <>
                    <div className="sliding-menu-item" onClick={this.openModal("Project Delete")}>Delete Project</div>
                  </>
                }
              </div>
              {(pageType === "Workspace" && this.state.currentModal === "Workspace Delete") &&
                <WorkspaceDeleteModal
                  workspace={item}
                  closeModal={this.closeModal} />
                // destroyWorkspace={this.props.destroyWorkspace} />
              }
              {(pageType === "Project" && this.state.currentModal === "Project Delete") &&
                <ProjectDeleteModal
                  project={item}
                  closeModal={this.closeModal}
                />
              }
            </div>
          }

          {/* WorkspaceHeader or HomeHeader or ProjectHeader */}
          <div className="header-title-wrapper">
            <input className={titleClassName.join(" ")}
              type="text"
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
              disabled={pageType === "Home" || !isCreator}
              value={renderedTitle}
              onAnimationEnd={() => this.setState({ titleFlash: false })}
            />
            { (pageType !== "Home") && <div id="header-description">{item.description}</div>}
          </div>
        </div>

        <div id="topbar-user">
          {/* User Settings + Global Actions */}
          <div id="user-avatar">
            <button id="user-avatar-button" type="button"
              onClick={() => this.setState({ showUserMenu: !showUserMenu })}
              onBlur={this.handleMenuBlur}
              onKeyDown={this.handleMenuBlur}
            >
              {user.username[0].toUpperCase()}
            </button>
            <div id="user-menu-arrow" className={`${showUserMenu ? "show-sliding-menu" : ""}`}></div>
            <div className={`user-sliding-menu${showUserMenu ? " show-sliding-menu" : ""}`} ref={this.userMenuRef}>
              <div className="sliding-menu-item" onClick={() => this.setState({ showUserMenu: false })} ><Link to="/home">Workspaces</Link></div>
              <div className="sliding-menu-item" onClick={this.handleLogout}>Log Out</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};