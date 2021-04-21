import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plusMenuWorkspaceId: -1,
      plusMenuShow: false
    }
    this.plusMenuRef = React.createRef();

    this.togglePlusMenu = this.togglePlusMenu.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.blurPlusMenu = this.blurPlusMenu.bind(this);
    this.openWkspDeleteModal = this.openWkspDeleteModal.bind(this);
    this.openProjCreateModal = this.openProjCreateModal.bind(this);
    this.openProjDeleteModal = this.openProjDeleteModal.bind(this);
  }

  componentDidMount() {
    if (document.title !== "azena") { document.title = "azena" };
  }

  togglePlusMenu(workspaceId) {
    return (evt) => {
      if (this.state.plusMenuWorkspaceId === workspaceId) {
        this.setState({ plusMenuShow: false, plusMenuWorkspaceId: -1 });
      } else {
        this.setState({ plusMenuShow: true, plusMenuWorkspaceId: workspaceId });
      }
    }
  }

  blurPlusMenu(evt) {
    if (evt.relatedTarget === null
      || (
        this.plusMenuRef && this.plusMenuRef.current &&
        !this.plusMenuRef.current.contains(evt.relatedTarget)
      )
    ) {
      this.setState({ plusMenuShow: false, plusMenuWorkspaceId: -1 });
    }
  }

  openWkspDeleteModal(evt) {
    // Want to keep plusMenuWorkspaceId for deleting workspace or creating projects, but close the plus menu
    let items = Object.assign({}, this.props.currentItems, { workspaceId: this.state.plusMenuWorkspaceId });
    this.props.setCurrentItems(items);
    this.props.setModal("Workspace Delete");
    this.setState({ plusMenuShow: false, plusMenuWorkspaceId: -1 });
  }

  openProjCreateModal(evt) {
    let items = Object.assign({}, this.props.currentItems, { workspaceId: this.state.plusMenuWorkspaceId });
    this.props.setCurrentItems(items);
    this.props.setModal("Project Create");
    this.setState({ plusMenuShow: false, plusMenuWorkspaceId: -1 });
  }

  openProjDeleteModal(projectId) {
    return (evt) => {
      let project = this.props.projects[projectId];
      this.props.setCurrentItems({ workspaceId: project.workspaceId, projectId: projectId });
      this.props.setModal("Project Delete");
    }
  }

  handleKeyDown(evt) {
    if (evt.key === "Escape") {
      this.setState({ plusMenuShow: false, plusMenuWorkspaceId: -1 });
    }
  }

  render() {
    const { users, workspaces, projects, session } = this.props;

    const { plusMenuWorkspaceId, plusMenuShow } = this.state;

    let that = this;
    return (
      <div id="home">
        <div id="home-workspaces">
          <h1 style={{ fontSize: "18px" }}>My Workspaces</h1>
          {
            Object.values(workspaces).map((workspace) => {
              const showMenu = (plusMenuWorkspaceId === workspace.id) && plusMenuShow;

              return (

                <div className="home-workspace-box" key={`workspace-${workspace.id}`}>

                  <div className="workspace-title-wrapper">
                    <Link to={`/workspaces/${workspace.id}`} className="home-workspace-title">
                      {workspace.name}
                    </Link>
                  </div>

                  <div className="home-workspace-projects">
                    {
                      Object.values(projects).map((project) => {
                        return (
                          (project.workspaceId === workspace.id) &&
                          <div className="home-workspace-project-wrapper"
                            key={`project-${project.id}`}
                          >
                            <Link to={`/projects/${project.id}/list`}
                              className="home-workspace-project">
                              <span
                              // className={`icon-${project.icon[0]} icon-color-${project.icon[1]}`}
                              ></span> &nbsp;
                              {project.name}
                            </Link>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
    )
  }
}

// ! important changes: removed window.currentUser requirement for logout button after making it a protected route