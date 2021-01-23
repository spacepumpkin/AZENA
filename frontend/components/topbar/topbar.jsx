import React from "react";
import { Link } from "react-router-dom";

import WorkspaceDeleteModal from '../workspace/workspace_delete_modal';
import ProjectDeleteModal from '../projects/project_delete_modal';

const getRandomColor = function () {
  const randomRGB = () => Math.floor(Math.random() * 256);
  return (`rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`);
}

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      itemDescription: props.item.description ? props.item.description : "",
      showTitleMenu: false,
      showUserMenu: false,
      titleFlash: false,
      headerIconColor: getRandomColor() // temporarily until we can get icon colors from BE
    }

    // Controlling title blur event
    // this.titleInput = React.createRef();
    this.userMenuRef = React.createRef();
    this.titleMenuRef = React.createRef();

    // Title min and max char count
    // this.titleMin = 1;
    this.titleMax = 25;

    this.topbarRenderCount = 0;

    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
    this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind(this);
    // this.handleDescriptionFocus = this.handleDescriptionFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMenuBlur = this.handleMenuBlur.bind(this);

    this.openModal = this.openModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Reset title & description if we changed pages; don't change header icon color if it's the same item
    let description = this.props.item.description ? this.props.item.description : "";

    if (prevProps.title !== this.props.title &&
      prevProps.pageType === this.props.pageType &&
      prevProps.item && this.props.item && prevProps.item.id === this.props.item.id) {
      this.setState({ title: this.props.title, titleFlash: true, itemDescription: description });
    } else if (prevProps.title !== this.props.title) {
      this.setState({ title: this.props.title, titleFlash: true, itemDescription: description, headerIconColor: getRandomColor() });
    } else if (prevProps.item.description !== this.props.item.description) {
      this.setState({ itemDescription: this.props.item.description });
    }
  }

  handleLogout(evt) {
    evt.preventDefault();
    this.props.logout();
  }

  // Remove all tabs, new lines + check if we're within allowable char range
  handleChange(field) {
    return (evt) => {
      let updatedValue = evt.target.value;
      // Avoid re-rendering if title/description hasn't changed
      if (updatedValue === this.state[field]) return;
      if (field === "title") {
        updatedValue = updatedValue.replace(/[\r\n\v\t]+/g, '');
        // if (updatedValue.length < this.titleMin || updatedValue.length > this.titleMax) {
        if (updatedValue.length > this.titleMax) {
          // this.setState({ title: editedTitle });
          return;
        }
      }
      this.setState({ [field]: updatedValue });
    }
  }

  // If edited title differs from original, update in BE
  handleTitleUpdate(evt) {
    const { title: currentTitle, pageType, isCreator } = this.props;
    const { title: stateTitle } = this.state;
    const updatedTitle = stateTitle.replace(/^ +|[\r\n\v\t]+/g, '');

    if (pageType !== "Home" && isCreator) {
      if (!updatedTitle) {
        // If title is blank, reset with previous title
        this.setState({ title: currentTitle });
      } else if (updatedTitle !== currentTitle) {
        const { updateItem, item } = this.props;
        if (item.id !== undefined && item.id !== null) {
          updateItem({ id: item.id, name: updatedTitle });
        }
      } else {
        this.setState({ title: updatedTitle });
      }
    }
  }

  // handleDescriptionFocus(evt) {
  //   // Replacement for placeholder functionality in contentEditable div
  //   if (this.state.itemDescription === "Add Description...") {
  //     this.setState({ itemDescription: "" });
  //   }
  // }

  handleDescriptionUpdate(evt) {
    // Updates description on blur
    // let updatedDescription = evt.target.innerText;

    // Replacement for placeholder functionality in contentEditable div
    // if (updatedDescription === "") this.setState({ itemDescription: "Add Description..." });

    if (this.props.item.description !== this.state.itemDescription) {
      const { updateItem, item } = this.props;
      updateItem({ id: item.id, description: this.state.itemDescription });
    }
  }

  handleKeyDown(evt) {
    // Catch any enter presses within title input textarea to defocus instead of adding \n
    if (evt.key === "Enter" || evt.keyCode === 13) {
      evt.preventDefault();
      evt.target.blur();
      // this.titleInput.current.blur();
    }
  }

  handleMenuBlur(evt) {
    // Will close the title menu and/or user menu dropdowns if we blur away or press Esc
    if (this.state.showUserMenu || this.state.showTitleMenu) {
      if (evt.nativeEvent.type === "blur") {
        if (!evt.relatedTarget ||
          (this.userMenuRef && this.userMenuRef.current &&
            !this.userMenuRef.current.contains(evt.relatedTarget)) ||
          (this.titleMenuRef && this.titleMenuRef.current &&
            !this.titleMenuRef.current.contains(evt.relatedTarget)) ||
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
      switch (modalType) {
        case "Project Delete":
          let project = this.props.item;
          this.props.setCurrentItems({ workspaceId: project.workspaceId, projectId: project.id });
          this.props.setModal(modalType);
          break;
        case "Workspace Delete":
          // this.setState({ currentModal: modalType, showTitleMenu: false });
          this.props.setCurrentItems({ workspaceId: this.props.item.id, projectId: -1 });
          this.props.setModal(modalType);
          break;
        case "Project Create":
          this.props.setCurrentItems({ workspaceId: this.props.item.id, projectId: -1 });
          this.props.setModal(modalType);
          break;
        default:
          break;
      }
    }
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
    const { title: stateTitle, showUserMenu, showTitleMenu, titleFlash, itemDescription, headerIconColor } = this.state; // Will change based on route
    const renderedTitle = stateTitle;

    // Adjusting class of title depending on whether it's editable
    const titleClassName = titleFlash ? ["header-input title-flash"] : ["header-input"];
    if (pageType !== "Home" && isCreator) titleClassName.push("title-editable");

    // Counting Renders
    this.topbarRenderCount += 1;
    // console.log("topbar render count: ", this.topbarRenderCount);

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
                style={{ backgroundColor: headerIconColor }}
                onClick={() => this.setState({ showTitleMenu: !showTitleMenu })}
                onBlur={this.handleMenuBlur}
                onKeyDown={this.handleMenuBlur}
                tabIndex="0"
              ></button>
              {/* <div id="user-menu-arrow" className={`${showUserMenu ? "show-sliding-menu" : ""}`}></div> */}
              <div className={`title-sliding-menu${showTitleMenu ? " show-sliding-menu" : ""}`} ref={this.titleMenuRef}>
                {pageType === "Workspace" &&
                  <>
                    <div className="sliding-menu-item" onClick={this.openModal("Project Create")}>Create Project</div>
                    <div className="sliding-menu-item" onClick={this.openModal("Workspace Delete")}>Delete Workspace</div>
                  </>
                }
                {pageType === "Project" &&
                  <>
                    <div className="sliding-menu-item" onClick={this.openModal("Project Delete")}>Delete Project</div>
                  </>
                }
              </div>
            </div>
          }

          {/* WorkspaceHeader or HomeHeader or ProjectHeader */}
          <div className="header-title-wrapper">
            <input id="header-title" className={titleClassName.join(" ")}
              type="text"
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange("title")}
              onBlur={this.handleTitleUpdate}
              // ref={this.titleInput}
              // minLength={this.titleMin}
              // maxLength={this.titleMax}
              // cols={this.titleMax}
              // rows={"1"}
              autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
              disabled={pageType === "Home" || !isCreator}
              value={renderedTitle}
              onAnimationEnd={() => this.setState({ titleFlash: false })}
            />
            {(pageType !== "Home") &&
              <input className={"header-input title-editable"}
                onChange={this.handleChange("itemDescription")}
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleDescriptionUpdate}
                autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                disabled={pageType === "Home" || !isCreator}
                placeholder={"Add Description..."}
                value={itemDescription}
              />
              // <div id="header-description" className={"header-input title-editable"} contentEditable
              //   onFocus={this.handleDescriptionFocus}
              //   onChange={this.handleChange("itemDescription")}
              //   onKeyDown={this.handleKeyDown}
              //   onBlur={this.handleDescriptionUpdate}
              //   autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
              //   disabled={pageType === "Home" || !isCreator}
              //   dangerouslySetInnerHTML={{ __html: itemDescription }}
              // // value={description}  
              // >
              // </div>
            }
          </div>
        </div>

        <div id="topbar-user">
          <div className="profile-links">
            <a className="profile-icon-link" href="https://github.com/spacepumpkin/AZENA" target={"_blank"} rel="noreferrer noopener"
              onClick={(evt) => evt.currentTarget.blur()}
            >
              <img className="profile-icon" src={window.github} alt="github profile" />
            </a>
            <a className="profile-icon-link" href="https://www.linkedin.com/in/gary-w-269749ba/" target={"_blank"} rel="noreferrer noopener"
              onClick={(evt) => evt.currentTarget.blur()}
            >
              <img className="profile-icon" src={window.linkedin} alt="linkedin profile" />
            </a>
          </div>
          {/* User Settings + Global Actions */}
          <div id="user-avatar">
            <button id="user-avatar-button" type="button"
              onClick={() => this.setState({ showUserMenu: !showUserMenu })}
              onBlur={this.handleMenuBlur}
              onKeyDown={this.handleMenuBlur}
              tabIndex="0"
            >
              {user.username[0].concat(user.username[1]).toLowerCase()}
              {/* <img className={"avatar-logo"} src={window.logoIcon1} alt="small azena icon" /> */}
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