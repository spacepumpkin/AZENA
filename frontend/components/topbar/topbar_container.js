import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopBar from "./topbar";

import { logout } from "../../actions/session_actions";
import { toggleSidebar } from "../../actions/ui_actions";

import { updateWorkspace } from '../../actions/workspace_actions';

// ! Not tested yet
import { updateProject } from '../../actions/project_actions';

function getTopBarInfo(entities, pathname, dispatch) {
  // ! Definitely can optimize later; use switch, ownProps.match.params?
  // if (workspaces !== undefined || workspaces.length !== 0) {
  // switch (ownProps.match.path) {
  //   case "/workspaces/:workspaceId":
  //     return entities.workspaces[ownProps.match.params.workspaceId].name;
  //   case "/projects/:projectId/board":
  //     return entities.projects[ownProps.match.params.projectId].name;
  //   default:
  //     return "Home";
  // }
  if (pathname.includes("workspaces") && !pathname.includes("new")) {
    // const workspace = entities.workspaces[pathname.slice("/workspaces/".length)];
    let workspaceId = pathname.replace(/\D/g, ''); // Only grab the number
    const workspace = entities.workspaces[workspaceId];
    if (workspace === undefined) {
      return {
        title: "This workspace does not exist",
        pageType: "Workspace",
        item: { id: null, name: null, description: null, creatorId: null },
        updateItem: () => console.log("Cannot update, workspace does not exist.")
      }
    } else {
      return {
        title: workspace.name,
        pageType: "Workspace",
        item: workspace,
        updateItem: (workspace) => dispatch(updateWorkspace(workspace))
      }
    }
  } else if (pathname.includes("projects") && !pathname.includes("new")) {
    let projectId = pathname.replace(/\D/g, ''); // Only grab the number
    const project = entities.projects[projectId];
    if (project === undefined) {
      return {
        title: "This project does not exist",
        pageType: "Project",
        item: { id: null, name: null, description: null, creatorId: null },
        updateItem: () => console.log("Cannot update, project does not exist.")
      }
    } else {
      return {
        title: project.name,
        pageType: "Project",
        item: project,
        updateItem: (project) => dispatch(updateProject(project))
      }
    }
  } else {
    return {
      title: "Home",
      pageType: "Home",
      item: { id: null, name: null, description: null, creatorId: null },
      updateItem: () => console.log("Cannot update, currently in Home page.")
    }
  }
}

// Pass down specific update method while keeping DRY -- 1st way (using window.location.pathname)
// -- DID NOT WORK (window.location.pathname gave "/" instead of something like "/workspaces/1")
// function updateItem (ownProps) {
//   const currentPath = window.location.pathname;
//   if (currentPath.includes("workspaces")) {
//     return updateWorkspace;
//   }
// }

const mSP = function ({ entities, ui, session }, ownProps) {
  // Get title, page type (home, workspace, project, etc.), and item that can be updated
  //  (workspace or project). Also check if current user is creator of item, else can't update
  const { title, pageType, item } = getTopBarInfo(entities, ownProps.location.pathname);
  return {
    sidebarCollapse: ui.sidebarCollapse,
    title: title,
    pageType: pageType,
    item: item,
    isCreator: (item.creatorId === session.id),
    user: entities.users[session.id]
  };
};

const mDP = function (dispatch, ownProps) {
  // const { updateItem } = getTopBarInfo(ownProps.entities, ownProps.location.pathname, dispatch)
  return {
    logout: () => dispatch(logout()),
    toggleSidebar: () => dispatch(toggleSidebar),
    // updateItem: updateItem
  };
};

// ! Pass down specific update method while keeping DRY -- 2nd way (mergeProps) -- IT WORKS
const mergeProps = function (stateProps, dispatchProps, ownProps) {

  switch (stateProps.pageType) {
    case "Workspace":
      dispatchProps["updateItem"] = (item) => dispatch(updateWorkspace(item));
      break;
    case "Project":
      dispatchProps["updateItem"] = (item) => dispatch(updateProject(item));
      break;
    default:
      dispatchProps["updateItem"] = () => console.log("updateItem didn't work");
      break;
  }
  return { ...stateProps, ...dispatchProps }
}
// ! 3rd way (pass down both methods)

export default withRouter(connect(mSP, mDP, mergeProps)(TopBar));
// export default withRouter(connect(mSP, mDP)(TopBar));