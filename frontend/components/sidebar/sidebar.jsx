import React from "react";
import { Link, NavLink } from "react-router-dom";
import WorkspaceDeleteModal from '../workspace/workspace_delete_modal';
import ProjectDeleteModal from '../projects/project_delete_modal';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    // Keep track of which workspace is selected, which plus button is selected
    this.state = {
      activeWorkspaceId: -1,
      plusMenuWorkspaceId: -1,
      plusMenuShow: false,
      showWkspDelModal: false,
    }
    this.sidebarRenderCount = 0;
    this.sidebarDropdownRef = React.createRef();

    this.showPlusMenu = this.showPlusMenu.bind(this);
    this.openWkspDeleteModal = this.openWkspDeleteModal.bind(this);
    // this.closeWkspDeleteModal = this.closeWkspDeleteModal.bind(this);
    this.openProjCreateModal = this.openProjCreateModal.bind(this);
    this.openProjDeleteModal = this.openProjDeleteModal.bind(this);
    // this.handleDestroyWorkspace = this.handleDestroyWorkspace.bind(this);
  }

  componentDidMount() {
    // console.log(`mounted Sidebar`);
    // document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    // document.removeEventListener('mousedown', this.handleClickOutside)
  }

  // handleClickOutside(evt) {
  //   console.log("handleClickOutside");
  //   // Only react if a plusMenu dropdown is open & if click target is not something 
  //   // on which we already have a listener, otherwise do nothing
  //   if (this.state.plusMenuWorkspaceId !== -1
  //     && !evt.target.classList.contains("sidebar-workspace-plus")
  //     && !evt.target.classList.contains("sidebar-workspace-title")) {
  //     if (this.sidebarDropdownRef && !this.sidebarDropdownRef.current.contains(evt.target)) {
  //       // alert("You clicked outside the sidebar dropdown menu!");
  //       this.setState({ plusMenuWorkspaceId: -1 });
  //     }
  //   }
  // }

  showPlusMenu(workspaceId) {
    let that = this;
    return (evt) => {
      // if this is the blur event
      if (evt.nativeEvent.type === "blur") {
        // if we're not clicking another plus or title, or inside the plus menu, close current plus menu; 
        // else stop and let click handler go
        if (evt.relatedTarget === null
          || (
            evt.relatedTarget.classList[0] !== "sidebar-workspace-plus"
            && evt.relatedTarget.classList[0] !== "sidebar-workspace-title"
            && that.sidebarDropdownRef && that.sidebarDropdownRef.current && !that.sidebarDropdownRef.current.contains(evt.relatedTarget)
          )
        ) {
          this.setState({ plusMenuWorkspaceId: -1, plusMenuShow: false });
        }
        return;
      }
      // if this is the click event
      if (this.state.plusMenuWorkspaceId === workspaceId) {
        this.setState({ plusMenuWorkspaceId: -1, plusMenuShow: false });
      } else {
        this.setState({ plusMenuWorkspaceId: workspaceId, activeWorkspaceId: workspaceId, plusMenuShow: true })
      }
    }
  }

  showProjects(workspaceId) {
    return (evt) => {
      if (this.state.activeWorkspaceId === workspaceId) {
        this.setState({ activeWorkspaceId: -1, plusMenuWorkspaceId: -1, plusMenuShow: false })
      } else {
        this.setState({ activeWorkspaceId: workspaceId, plusMenuWorkspaceId: -1, plusMenuShow: false })
      }
    }
  }

  // toggleModal(status) {
  //   // evt.preventDefault();
  //   // this.setState({ showWkspDelModal: !this.state.showWkspDelModal, plusMenuWorkspaceId: -1 })
  //   return (evt) => {
  //     if (status === "open") {
  //       // Want to keep plusMenuWorkspaceId but close the plus menu
  //       this.setState({ showWkspDelModal: !this.state.showWkspDelModal, plusMenuShow: false });
  //     } else {
  //       // Want to reset plusMenuWorkspaceId when closing the modal
  //       this.setState({ showWkspDelModal: !this.state.showWkspDelModal, plusMenuWorkspaceId: -1 });
  //     }
  //   }
  // }

  openWkspDeleteModal(evt) {
    // Want to keep plusMenuWorkspaceId for deleting workspace or creating projects, but close the plus menu
    // this.setState({ showWkspDelModal: true, plusMenuShow: false });
    this.setState({ plusMenuShow: false, plusMenuWorkspaceId: -1 });
    let items = Object.assign({}, this.props.currentItems, { workspaceId: this.state.plusMenuWorkspaceId });
    this.props.setCurrentItems(items);
    this.props.setModal("Workspace Delete");
  }

  // ! Refactor closeWkspDeleteModal to WorkspaceDeleteModal

  openProjCreateModal(evt) {
    this.props.setCurrentWorkspaceId(this.state.plusMenuWorkspaceId);
    this.setState({ plusMenuShow: false, plusMenuWorkspaceId: -1 });
  }

  openProjDeleteModal(projectId) {
    return (evt) => {
      let project = this.props.projects[projectId];
      this.props.setCurrentItems({ workspaceId: project.workspaceId, projectId: projectId });
      this.props.setModal("Project Delete");
    }
  }

  // ! closeProjDeleteModal refactored into ProjectDeleteModal

  // handleDestroyWorkspace(workspaceId) {
  //   this.props.destroyWorkspace(workspaceId);
  //   this.setState({ showWkspDelModal: false, plusMenuWorkspaceId: -1 });
  // }

  render() {
    const {
      workspaces = {},
      projects = {},
      toggleSidebar,
      sidebarCollapse,
      currentUserId
    } = this.props;

    const {
      activeWorkspaceId,
      plusMenuWorkspaceId,
      plusMenuShow,
    } = this.state;
    // 

    this.sidebarRenderCount += 1;
    console.log("sidebar render count: ", this.sidebarRenderCount);

    // Separate user's workspaces into own and other workspaces
    const ownWorkspaces = [];
    const otherWorkspaces = [];

    Object.values(workspaces).forEach((workspace) => {
      if (workspace.creatorId === currentUserId) {
        ownWorkspaces.push(workspace);
      } else {
        otherWorkspaces.push(workspace);
      }
    })

    const mappedWorkspaces = (selectedWorkspaces) => (
      selectedWorkspaces.map((workspace) => {
        // Only show plus menu if we're on the correct workspace and we want it to show
        let showMenu = plusMenuWorkspaceId === workspace.id && plusMenuShow;
        // Only show workspace projects if the specific workspace title was clicked
        let showProjects = activeWorkspaceId === workspace.id;
        return (
          <div className="sidebar-workspace-box" key={`workspace-${workspace.id}`}>
            <div className="workspace-title-wrapper">
              <Link to={`/workspaces/${workspace.id}`}
                className={`sidebar-workspace-title ${showProjects ? "selected-primary" : ""}`}
                onClick={this.showProjects(workspace.id)}
              >
                {workspace.name}
              </Link>
              <button className={`workspace-plus ${(showMenu) ? "rotated-plus" : ""}`}
                onClick={this.showPlusMenu(workspace.id)} type="button"
                tabIndex="0"
                onBlur={this.showPlusMenu()} />
              {/* Had to remove z-index on sidebar-workspace-projects to get this to show */}
            </div>
            <div className="sidebar-workspace-projects">
              {
                (showProjects) &&
                Object.values(projects).map((project) => {
                  return (
                    (project.workspaceId === workspace.id) &&
                    (
                      <div className="sidebar-workspace-project" key={`project-${project.id}`}>
                        <Link to={`/projects/${project.id}/list`} ><span></span>&nbsp;{project.name}</Link>
                        <button className={`workspace-plus`} type="button"
                          onClick={this.openProjDeleteModal(project.id)}
                        />
                      </div>
                    )
                  )
                })
              }
            </div>

            { showMenu && (
              <div className={`sidebar-workspace-plus-menu`}
                ref={this.sidebarDropdownRef}>

                {/* <Link to={`/workspaces/${workspace.id}/projects/new`} onClick={this.openProjCreateModal}>
                  Create New Project */}
                <button onClick={this.openProjCreateModal}>
                  Create New Project
                  </button>
                {/* </Link> */}

                {(currentUserId === workspace.creatorId) ? (
                  <button type="button" onClick={this.openWkspDeleteModal}>Delete Workspace</button>
                ) : (
                    <Link to={`/home`}>Leave Workspace</Link>
                  )}

              </div>
            )}
          </div>

        )
      }
      )
    )

    return (
      <>
        <div id="sidebar" className={`${sidebarCollapse ? "collapsed" : ""}`} >
          <div id="sidebar-top">
            <Link id="sidebar-logo" to="/home" > <img src={window.logoMainURL} /> </Link>
            <button onClick={toggleSidebar} className={`sidebar-menu-button chevron-left`} type="button" />
          </div>
          <div id="sidebar-links">
            <Link to="/home"><img className="sidebar-icon" src={window.homeIcon} alt="homeicon" />&nbsp; Home </Link>
            <Link to="/home"><img className="sidebar-icon" src={window.checkCircle} alt="taskicon" />&nbsp; My Tasks </Link>
          </div>
          <div id="sidebar-workspaces">
            <h1>My Workspaces</h1>
            {mappedWorkspaces(ownWorkspaces)}
          </div>
          <div id="sidebar-workspaces">
            <h1>Other Workspaces</h1>
            {mappedWorkspaces(otherWorkspaces)}
          </div>
          <div id="sidebar-bottom">
            {/* <p>Organize your projects here!</p> */}
            <Link to="/workspaces/new"><button type="button">Create New Workspace</button></Link>
          </div>
        </div >
      </>
    )
  }
}